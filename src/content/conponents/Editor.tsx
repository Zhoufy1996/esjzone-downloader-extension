import { useCallback, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { EditorMessage } from '../../types';

const Editor = () => {
  const [state, setState] = useState<string>('');

  const handleChange = useCallback((value:string) => {
    setState(value);
    chrome.runtime.sendMessage<EditorMessage>({ type: 'CHANGE_DATA', value: state }, (message:string) => {
      console.log(`【同步成功】 ${message}`);
    });
  }, [state]);

  useEffect(() => {
    if (chrome.runtime) {
      const listener = (
        msg: EditorMessage,
      ) => {
        if (msg.type === 'CHANGE_DATA') {
          setState(msg.value);
        }
      };
      chrome.runtime.onMessage.addListener(listener);
      return chrome.runtime.onMessage.removeListener(listener);
    }
    return () => {};
  }, []);

  return (
    <ReactQuill
      style={{
        width: 400,
        height: 300,
      }}
      theme="snow"
      value={state}
      onChange={handleChange}
    />
  );
};

export default Editor;
