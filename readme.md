# esjzone-downloader-extension

## 下载逻辑

1. 获取目录页小说标题、简介、章节名及链接
2. 根据链接发送网络请求获取章节内容
3. 内容整合生成 txt 文件并下载

## 使用方式

1. 在 release 界面下载 zip 文件并解压
2. chrome/Edge 扩展加载已解压的扩展程序
3. 在小说目录网页点击扩展的下载按钮

## 注意

1. 该扩展会在访问 esjzone 时添加内容脚本，可能会导致页面加载变慢
2. 下载的逻辑类似于爬虫，希望不要频繁使用，浪费 esjzone 服务器资源
3. 该扩展仅供学习交流使用，不得用于商业用途，由使用本插件产生的一切后果与插件作者无关

---

## 自行构建

环境要求：node>=10.5.0，请在克隆此项目前确保已安装适配版本的 node (执行 `node -v` 检查版本)

在终端运行 `git clone git@github.com:Zhoufy1996/esjzone-downloader-extension.git` 克隆此项目

切换到项目文件夹 `cd esjzone-downloader-extension`

> 使用 `yarn` or `pnpm` 需要已安装对应的包管理器

安装所需依赖 `npm install` or `yarn install` or `pnpm install`

调试项目，`npm run start` or `yarn start` or `pnpm start`，然后即可在 `http://localhost:5000/` 上查看

构建项目，`npm run build` or `yarn build` or `pnpm build`

构建完成后，项目文件夹下会生成 `dist` 文件夹，将其加载到 chrome/Edge 扩展即可使用

发放压缩包，`npm run zip` or `yarn zip` or `pnpm zip`

压缩完成后，项目文件夹的 `release` 文件夹下会生成 `esjzone-downloader-extension-version.zip` 文件
