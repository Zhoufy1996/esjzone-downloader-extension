import { saveAs } from 'file-saver';

export const getTitle = () => {
  return document.querySelector('.text-normal')?.textContent;
};

export const getIntro = () => {
  return document.querySelector('.bg-secondary')?.textContent;
};

interface Chapter {
  title: string;
  url?: string;
}

export const getChapterList = () => {
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

const getDocument = async (url: string) => {
  const response = await fetch(url);
  const body = await response.text();

  const domparser = new DOMParser();

  const doc = domparser.parseFromString(body, 'text/html');
  return doc;
};

const getDocumentNovelContent = (doc: Document) => {
  const content = (doc.querySelector('.forum-content') as HTMLElement)?.innerText;

  return content || '';
};

export const getNovelContentByUrl = async (url: string) => {
  if (url === '') {
    return '';
  }
  const doc = await getDocument(url);
  const content = getDocumentNovelContent(doc);

  return content;
};

export const fileSave = (text: string, title: string) => {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, `${title}.txt`);
};
