import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/Header/Header.jsx';
import MainMenu from './components/MainMenu/MainMenu.jsx';
import './index.css';
import './reset.css';
import './colors.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <MainMenu/>   
  </React.StrictMode>,
)
