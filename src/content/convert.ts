/* eslint-disable prettier/prettier */
// 转换字库来自 https://github.com/foru17/chinese-s2t, 位于 `src/content/json/convert.json`

import FlashText from "flashtext2js";
import TS from "./json/convert.json";

class Convert {
  ft = new FlashText();

  convert(text:string, options?: "t2s"|"s2t") {
    /**
     * @t2s 繁体转简体
     * @s2t 简体转繁体
     */
    const { ft } = this;

    switch (options) {
      case "t2s":
        Object.entries(TS).forEach(([key, value]) => {
          ft.addKeyWord(key, value);
        });
        return ft.replaceKeyWords(text);
      case "s2t":
        Object.entries(TS).forEach(([key, value]) => {
          ft.addKeyWord(value, key);
        });
        return ft.replaceKeyWords(text);
      default :
        Object.entries(TS).forEach(([key, value]) => {
          ft.addKeyWord(key, value);
        });
        return ft.replaceKeyWords(text);
    }
  }
};

export default Convert;
