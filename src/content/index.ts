import { ContentMessage } from '../types/contentMessage';
import { documentUrlPattern } from '../utils';
import downloadNovel from './downloadNovel';

chrome.runtime.onMessage.addListener((msg: ContentMessage, _sender, sendResponse) => {
  if (msg.type === 'DOWNLOAD_NOVEL') {
    downloadNovel().then((res) => {
      sendResponse(res);
    });
  }

  if (msg.type === 'URL_CHECK_VALID') {
    sendResponse(window.location.href.match(documentUrlPattern) != null);
  }
});
