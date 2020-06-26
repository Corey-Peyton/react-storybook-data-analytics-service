import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css';
import AppRouter from './Router/AppRouter';

ReactDOM.render(<AppRouter />, document.getElementById('root'));


// ReactDOM.render(<Test />, document.getElementById('root'));
