const compressing = require("compressing");
const path = require("path");
const fs = require("fs")

const version = require('./package.json').version;

const fileName = `esjzone-downloder-v${version}.zip`;

const createFolder = () => {
    fs.mkdirSync("release", { recursive: true })
}

createFolder();

compressing.zip
.compressDir(path.join(__dirname, "dist/"), path.join(__dirname, "release", fileName))
.then(() => {
    console.log(`【压缩成功】: release/${fileName}`)
})
.catch(e => {
    console.log(`【压缩失败】`)
    console.log(`${e}`)
})