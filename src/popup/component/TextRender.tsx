import { useInterval } from 'ahooks';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getBackground } from '../utils';

const TextRender = () => {
  const [state, setState] = useState<string>('');

  useInterval(() => {
    getBackground().then((bg) => {
      setState(bg.getValue());
    });
  }, 1000);

  return (
    <ReactQuill readOnly value={state} />
  );
};

export default TextRender;
