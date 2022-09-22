// eslint-disable-next-line import/prefer-default-export
export const documentUrlPattern = 'https://www.esjzone.net/detail/*';

export const getCurrentActiveTabId = () => {
  return new Promise<number>((resolve) => {
    chrome.tabs.query(
      {
        currentWindow: true,
        active: true,
      },
      (tabs) => {
        resolve(tabs[0].id || 0);
      }
    );
  });
};

export const sendMessageToCurrentActiveContent = <T, U>(msg: T): Promise<U> => {
  return new Promise((resolve, reject) => {
    getCurrentActiveTabId()
      .then((tabId) => {
        chrome.tabs.sendMessage<T>(tabId, msg, (res: U) => {
          resolve(res);
        });
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
};
