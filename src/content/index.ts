import { ContentMessage } from '../types/contentMessage';
import downloadNovel from './downloadNovel';

chrome.runtime.onMessage.addListener((msg: ContentMessage, sender, sendResponse) => {
  if (msg.type === 'DOWNLOAD_NOVEL') {
    downloadNovel().then((res) => {
      sendResponse(res);
    });
  }

  if (msg.type === 'URL_CHECK_VALID') {
    sendResponse(window.location.href.startsWith('https://www.esjzone.cc/detail'));
  }
});
