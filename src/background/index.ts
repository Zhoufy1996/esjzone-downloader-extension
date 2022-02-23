import { Message } from '../types';

const store = {
  value: '',
  getValue() {
    return store.value;
  },
  setValue(value:string) {
    store.value = value;
  },
};

/* eslint-disable @typescript-eslint/no-unused-vars */
const backgroundListener = (
  msg: Message,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: any) => void,
) => {
  if (msg.type === 'CHANGE_DATA') {
    store.setValue(msg.value);
    sendResponse(store.getValue());
  }

  if (msg.type === 'GET_DATA') {
    sendResponse(store.getValue());
  }
};

chrome.runtime.onMessage.addListener(backgroundListener);
