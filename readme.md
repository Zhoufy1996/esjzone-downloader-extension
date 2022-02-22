```javascript
npm run start


npm run build // chrome扩展"加载已解压的扩展程序"

```

backgroundchromeService

popup

content

extensionPanel

通信

- content 与 background

```javascript
// background => content
chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
	chrome.tabs.sendMessage(tabs[0].id || 0, message, responseCallback)
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	// do something
})

// content => background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	// do something
})

chrome.runtime.sendMessage(message, function () {
  	// do something
});

```

- popup 与 background

  ```
  // 两者运行在同一上下文中，因此之啊哟得到对方的window对象，即可随意调用

  const getPopUpView = () => chrome.extension.getViews({ type: 'popup' })[0];

  export const getBackground = () => chrome.extension.getBackgroundPage();

  ```
- web页面与content-script

类型

1. action
2. content
3. devtools
4. contextMenus
5. options
6. notifications
