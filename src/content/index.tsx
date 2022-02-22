// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import ReactDom from 'react-dom';
import App from './app/App';
import './index.css';

const getContentParentDomOrCreate = () => {
  let parentDom = document.getElementById('extension-parent-node');
  if (!parentDom) {
    parentDom = document.createElement('div');
    parentDom.id = 'extension-parent-node';
    document.body.appendChild(parentDom);
  }
  return parentDom;
};

const render = () => {
  ReactDom.render(<App />, document.getElementById('extension-parent-node'));
};

getContentParentDomOrCreate();
render();
