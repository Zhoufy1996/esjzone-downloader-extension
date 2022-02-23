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
  // v3中无法使用 可以使用与content/background相同的方式通信
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

问题

1. 打包的时候 background会被打包到一个立即执行函数里，导致chrome.runtime.getBackgroundPage获取不到background的全局对象
