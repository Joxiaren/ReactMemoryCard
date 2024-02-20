import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/Header/Header.jsx';
import Main from './components/Main/Main.jsx';
import './index.css';
import './reset.css';
import './colors.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <Main gameName={ "ds1" }/>   
  </React.StrictMode>,
)
