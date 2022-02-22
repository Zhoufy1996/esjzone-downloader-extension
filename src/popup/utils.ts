// eslint-disable-next-line import/prefer-default-export
export const getBackground = async (): Promise<Window> => new Promise((resolve, reject) => {
  chrome.runtime.getBackgroundPage((backgroundPage) => {
    if (backgroundPage) {
      resolve(backgroundPage);
    } else {
      reject();
    }
  });
});
