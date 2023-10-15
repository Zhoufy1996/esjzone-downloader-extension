import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { SendLogMessage } from '../types/backgroundMessage';
import Scheduler from './scheduler';
import Convert from './convert';

const convert = new Convert();

// 获取小说封面
interface Cover {
  url: string;
  type: string;
}

const getCover = (): Cover => {
  const coverNode = document.querySelector('.product-gallery')?.children[0];
  if (coverNode?.tagName.toLowerCase() === 'a') {
    return {
      url: coverNode.getAttribute('href') || '',
      type: coverNode.getAttribute('href')?.split('.').pop() as string,
    };
  }
  return {
    url: '',
    type: '',
  };
};

// const downloadCover = async (cover: Cover) => {
//   if (cover.url) {
//     const response = await fetch(cover.url);
//     const blob = await response.blob();
//     saveAs(blob, `cover.${cover.type}`);
//   }
// };

// 获取小说标题
const getTitle = (): string => {
  return (document.querySelector('h2') as HTMLElement)?.innerText || '';
};

// 获取小说简介
const getIntro = (): string => {
  return (document.querySelector('#details') as HTMLElement)?.innerText || '';
};

// 获取小说元数据
const getMeta = (): string => {
  const metalist: string[] = [];

  document.querySelectorAll('.list-unstyled li:not(.hidden-md-up)').forEach((node) => {
    metalist.push((node as HTMLElement)?.innerText || '');
  });
  return metalist.join('\n');
};

interface Chapter {
  title: string;
  url?: string;
}

// 获取所有章节名和阅读链接
const getChapterList = (): Chapter[] => {
  const chapterListNode = document.querySelector('#chapterList');
  const childNodes = chapterListNode?.children;
  const chapters: Chapter[] = [];
  if (childNodes) {
    Array.from(childNodes).forEach((node: Element) => {
      if (node.tagName.toLowerCase() === 'a') {
        chapters.push({
          title: node.getAttribute('data-title') || '',
          url: (node as HTMLAnchorElement).href,
        });
      }

      if (node.tagName.toLowerCase() === 'p') {
        chapters.push({
          title: node.querySelector('span')?.textContent || '',
          url: '',
        });
      }

      if (node.tagName.toLowerCase() === 'details') {
        Array.from(node?.children).forEach((item: Element) => {
          if (item.tagName.toLowerCase() === 'summary') {
            chapters.push({
              title: item.textContent || '',
              url: '',
            });
          }

          if (item.tagName.toLowerCase() === 'a') {
            chapters.push({
              title: item.getAttribute('data-title') || '',
              url: (item as HTMLAnchorElement).href,
            });
          }

          if (item.tagName.toLowerCase() === 'p') {
            chapters.push({
              title: item.querySelector('span')?.textContent || '',
              url: '',
            });
          }
        });
      }
    });
  }
  return chapters;
};

// get 方法请求地址，将内容转换成 document
const getDocument = async (url: string) => {
  const response = await fetch(url);
  const body = await response.text();

  const domParser = new DOMParser();

  const doc = domParser.parseFromString(body, 'text/html');
  return doc;
};

// 获取某章节的内容
const getDocumentNovelContent = (doc: Document) => {
  const content = (doc.querySelector('.forum-content') as HTMLElement)?.innerText;
  if (content) {
    return convert.convert(content);
  }
  return '';
};

// 根据章节链接获取内容
const getNovelContentByUrl = async (url: string) => {
  if (url === '') {
    return '';
  }
  const doc = await getDocument(url);
  const content = getDocumentNovelContent(doc);

  return content;
};

// txt下载
const zipSave = async (text: string, title: string, cover: Cover) => {
  const zip = new JSZip();
  const folder = zip.folder(title);

  if (cover.url) {
    const response = await fetch(cover?.url);
    const blob = await response.blob();

    folder?.file(`cover.${cover.type}`, blob);
  }

  folder?.file(`${title}.txt`, text);
  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, `${title}.zip`);
  });
};

// const fileSave = (text: string, title: string) => {
//   const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
//   saveAs(blob, `${title}.txt`);
// };

const downloadNovel = () => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage<SendLogMessage>({
      type: 'SEND_LOG_MESSAGE',
      message: '正在解析页面信息...',
    });

    const cover = getCover();
    const title = getTitle();
    const intro = getIntro();
    const meta = getMeta();
    const chapterList = getChapterList();

    chrome.runtime.sendMessage<SendLogMessage>({
      type: 'SEND_LOG_MESSAGE',
      message: '页面信息解析成功...',
    });

    chrome.runtime.sendMessage<SendLogMessage>({
      type: 'SEND_LOG_MESSAGE',
      message: '正在获取章节内容...',
    });

    const childChapterList = chapterList.filter((item: Chapter) => item.url !== '');
    const scheduler = new Scheduler(
      childChapterList.map((item) => {
        return () => getNovelContentByUrl((item.url as string) || '');
      }),
      {
        maxCount: 5,
        maxTryCount: 1,
      }
    );

    const timerId = setInterval(() => {
      chrome.runtime.sendMessage<SendLogMessage>({
        type: 'SEND_LOG_MESSAGE',
        message: `进度：【${scheduler.getResult().length}/${childChapterList.length}】`,
      });
    }, 2000);

    scheduler.execute().then((contents) => {
      clearInterval(timerId);

      const text = `# ${title}\n\n${meta}\n${intro}\n\n${contents
        .map((content, index) => {
          return `## ${chapterList[index].title}\n${content}`;
        })
        .join('\n\n')}`;

      // fileSave(text, title as string);

      zipSave(text, title as string, cover);

      chrome.runtime.sendMessage<SendLogMessage>({
        type: 'SEND_LOG_MESSAGE',
        message: `下载结束`,
      });

      resolve({
        cover,
        title,
        meta,
        intro,
        chapterList,
        contents,
      });
    });
  });
};

export default downloadNovel;
