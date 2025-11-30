import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import psbLogo from './psb-logo.png';


const App = () => {
  const navigate = useNavigate();


  const handleStartClick = () => {
    navigate('/new-page');
  };

  return (
    <div className="app-container">
      <div className="training-label">ОБУЧЕНИЕ</div>
      <div className="gradient-line"></div>

      <div className="content-container">
        <div className="logo-container">
          <img
            src={psbLogo}
            alt="Логотип ПСБ"
            className="psb-logo-img"
          />
        </div>

        <button
          className="start-button"
          onClick={handleStartClick}
        >
          Начать
        </button>
      </div>
    </div>
  );
};

export default App;
