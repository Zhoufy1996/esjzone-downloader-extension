import { useCallback, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { EditorChangeMessage, EditorGetMessage } from '../../types';

const Editor = () => {
  const [state, setState] = useState<string>('');

  const handleChange = useCallback((value:string) => {
    setState(value);
    chrome.runtime?.sendMessage<EditorChangeMessage>({ type: 'CHANGE_DATA', value: state }, (message:string) => {
      console.log(`【同步成功】 ${message}`);
    });
  }, [state]);

  useEffect(() => {
    chrome.runtime?.sendMessage<EditorGetMessage>({ type: 'GET_DATA' }, (message:string) => {
      setState(message);
    });
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
