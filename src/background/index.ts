import { BackgroundMessage } from '../types/backgroundMessage';
import Log from './log';

const log = new Log();

// 只保存最新一次的下载日志
chrome.runtime.onMessage.addListener((msg: BackgroundMessage, sender, sendResponse) => {
  if (msg.type === 'SEND_LOG_MESSAGE') {
    log.addLog(msg.message);
    sendResponse(true);
    return;
  }

  if (msg.type === 'GET_LOG_MESSAGE') {
    sendResponse(log.getLog());
    return;
  }

  if (msg.type === 'CLEAN_LOG_MESSAGE') {
    log.clean();
    sendResponse(true);
    return;
  }

  sendResponse(false);
});
