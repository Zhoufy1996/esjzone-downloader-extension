import { saveAs } from 'file-saver';
import { SendLogMessage } from '../types/backgroundMessage';
import Scheduler from './scheduler';
import Convert from './convert';

const convert = new Convert();

// 获取小说标题
const getTitle = (): any => {
  return document.querySelector('h2')?.textContent;
};

// 获取小说简介
const getIntro = (): any => {
  return document.querySelector('#details')?.textContent;
};

// 获取小说元数据
const getMeta = (): string => {
  const metalist: string[] = [];

  document.querySelectorAll('.list-unstyled li:not(.hidden-md-up)').forEach((node) => {
    metalist.push(node.textContent || '');
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
  if (childNodes) {
    const chapters: Chapter[] = Array.from(childNodes).map((node: Element) => {
      if (node.tagName.toLowerCase() === 'a') {
        return {
          title: node.getAttribute('data-title') || '',
          url: (node as HTMLAnchorElement).href,
        };
      }

      if (node.tagName.toLowerCase() === 'p') {
        return {
          title: node.querySelector('span')?.textContent || '',
          url: '',
        };
      }

      if (node.tagName.toLowerCase() === 'details') {
        Array.from(node.children).map((item: Element) => {
          if (item.tagName.toLowerCase() === 'a') {
            return {
              title: item.getAttribute('data-title') || '',
              url: (item as HTMLAnchorElement).href,
            };
          }

          if (item.tagName.toLowerCase() === 'p') {
            return {
              title: item.querySelector('span')?.textContent || '',
              url: '',
            };
          }

          if (item.tagName.toLowerCase() === 'summary') {
            return {
              title: item.textContent || '',
              url: '',
            };
          }

          return {
            title: '',
          };
        });
      }

      return {
        title: '',
      };
    });

    return chapters;
  }
  return [];
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
const fileSave = (text: string, title: string) => {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, `${title}.txt`);
};

const downloadNovel = () => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage<SendLogMessage>({
      type: 'SEND_LOG_MESSAGE',
      message: '正在解析页面信息...',
    });

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

    const childChapterList = chapterList.filter((item: any) => item.url != null);
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

      fileSave(text, title as string);

      chrome.runtime.sendMessage<SendLogMessage>({
        type: 'SEND_LOG_MESSAGE',
        message: `下载结束`,
      });

      resolve({
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
