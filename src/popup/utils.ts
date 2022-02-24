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

export default {};
