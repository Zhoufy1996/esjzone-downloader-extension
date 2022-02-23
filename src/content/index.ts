import { saveAs } from 'file-saver';
import { getChapterList, getIntro, getTitle } from './utils';

const getDocument = async (url: string) => {
    const response = await fetch(url);
    const body = await response.text();

    const domparser = new DOMParser();

    const doc = domparser.parseFromString(body, 'text/html');
    return doc;
};

const getDocumentNovelContent = (doc: Document) => {
    const content = (doc.querySelector('.forum-content') as HTMLElement)?.innerText;
    // console.log(parentNode);
    // if (parentNode?.children) {
    //     const content = Array.from(parentNode.children)
    //         .map((node) => {
    //             const text = Array.from(node.querySelectorAll('span'))
    //                 .map((childNode) => childNode.textContent)
    //                 .join('');
    //             return text;
    //         })
    //         .join('');
    //     return content;
    // }

    return content || '';
};

const getNovelContentByUrl = async (url: string) => {
    if (url === '') {
        return '';
    }
    const doc = await getDocument(url);
    const content = getDocumentNovelContent(doc);

    return content;
};

const fileSave = (text: string, title: string) => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${title}.txt`);
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const title = getTitle();
    const intro = getIntro();
    const chapterList = getChapterList();
    const getContent = async () => {
        const contents = await Promise.all(
            chapterList.map((item) => {
                return getNovelContentByUrl(item.url || '');
            })
        );
        const text = `${title}\n${intro}\n\n${contents
            .map((content, index) => {
                return `${chapterList[index].title}\n${content}`;
            })
            .join('\n\n')}`;
        fileSave(text, title as string);
        sendResponse({
            title,
            intro,
            chapterList,
            contents,
        });
    };
    getContent();
});
