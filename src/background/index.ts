/* eslint-disable @typescript-eslint/no-unused-vars */
const MessageReactAppListener = (
  msg: string,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: any) => void,
) => {
  console.log('msg: ', msg);
  sendResponse('return');
  return true;
};

chrome.runtime.onMessage.addListener(MessageReactAppListener);
