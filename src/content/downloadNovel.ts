import { saveAs } from 'file-saver';
import { SendLogMessage } from '../types/backgroundMessage';
import Scheduler from './scheduler';

// 获取小说标题
const getTitle = () => {
  return document.querySelector('.text-normal')?.textContent;
};

// 获取小说简介
const getIntro = () => {
  return document.querySelector('.bg-secondary')?.textContent;
};

interface Chapter {
  title: string;
  url?: string;
}

// 获取所有章节名和阅读链接
const getChapterList = () => {
  const chapterListNode = document.querySelector('#chapterList');
  const childNodes = chapterListNode?.children;
  if (childNodes) {
    const chapters: Chapter[] = Array.from(childNodes).map((node) => {
      if (node.tagName.toLowerCase() === 'a') {
        return {
          title: node.getAttribute('data-title') || '',
          url: (node as HTMLAnchorElement).href,
        };
      }

      if (node.tagName.toLowerCase() === 'p') {
        const text = node.querySelector('span')?.textContent;
        return {
          title: text || '',
          url: '',
        };
      }

      return {
        title: '',
      };
    });

    return chapters;
  }
  return [];
};

// get方法请求地址，将内容转换成document
const getDocument = async (url: string) => {
  const response = await fetch(url);
  const body = await response.text();

  const domparser = new DOMParser();

  const doc = domparser.parseFromString(body, 'text/html');
  return doc;
};

// 获取某章节的内容
const getDocumentNovelContent = (doc: Document) => {
  const content = (doc.querySelector('.forum-content') as HTMLElement)?.innerText;

  return content || '';
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
    const chapterList = getChapterList();

    chrome.runtime.sendMessage<SendLogMessage>({
      type: 'SEND_LOG_MESSAGE',
      message: '页面信息解析成功...',
    });

    chrome.runtime.sendMessage<SendLogMessage>({
      type: 'SEND_LOG_MESSAGE',
      message: '正在获取章节内容...',
    });

    const childChapterList = chapterList.filter((item) => item.url != null);
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

      const text = `${title}\n${intro}\n\n${contents
        .map((content, index) => {
          return `${chapterList[index].title}\n${content}`;
        })
        .join('\n\n')}`;

      fileSave(text, title as string);

      chrome.runtime.sendMessage<SendLogMessage>({
        type: 'SEND_LOG_MESSAGE',
        message: `下载结束`,
      });

      resolve({
        title,
        intro,
        chapterList,
        contents,
      });
    });
  });
};

export default downloadNovel;
