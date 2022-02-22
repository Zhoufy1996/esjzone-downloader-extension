import { EditorMessage } from '../types';

console.log('it workds');

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
  msg: EditorMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: any) => void,
) => {
  if (msg.type === 'CHANGE_DATA') {
    store.setValue(msg.value);
    console.log(msg.value, store.getValue());
    sendResponse(store.getValue());
  }
};

chrome.runtime.onMessage.addListener(backgroundListener);

function getValue() {
  return store.getValue();
}
