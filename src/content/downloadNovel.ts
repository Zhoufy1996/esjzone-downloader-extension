import { SendLogMessage } from '../types/backgroundMessage';
import Scheduler from './scheduler';
import { getChapterList, getIntro, getTitle, getNovelContentByUrl, fileSave } from './utils';

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
        return () => getNovelContentByUrl(item.url as string);
      }),
      {
        maxCount: 50,
        tryCount: 1,
      }
    );

    const timerId = setInterval(() => {
      chrome.runtime.sendMessage<SendLogMessage>({
        type: 'SEND_LOG_MESSAGE',
        message: `进度：【${scheduler.getResult().length}/${childChapterList.length}】`,
      });
    }, 1000);

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
