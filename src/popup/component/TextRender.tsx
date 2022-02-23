import { useInterval } from 'ahooks';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { EditorGetMessage } from '../../types';

const TextRender = () => {
  const [state, setState] = useState<string>('');

  useInterval(() => {
    chrome.runtime.sendMessage<EditorGetMessage>({ type: 'GET_DATA' }, (message:string) => {
      console.log(`【获取成功】 ${message}`);
      setState(message);
    });
  }, 1000);

  return (
    <ReactQuill readOnly value={state} />
  );
};

export default TextRender;
