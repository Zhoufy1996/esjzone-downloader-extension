// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import ReactDom from 'react-dom';
import App from './app/App';
import './index.css';

const render = () => {
    ReactDom.render(<App />, document.getElementById('root'));
};

render();
