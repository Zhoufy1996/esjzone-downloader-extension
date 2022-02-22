export const getCurrentActiveWindow = async () => {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tabs[0].id || null;
};

export const getPopUpView = () => chrome.extension.getViews({ type: 'popup' })[0];
