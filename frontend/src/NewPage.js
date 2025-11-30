import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NewPage.css';
import psbLogo from './psb-logo.png';
import bookIcon from './bookwhite.png';
import penIcon from './penwhite.png';

const NewPage = () => {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="new-page-container">
      <div className="logo-container">
        <img
          src={psbLogo}
          alt="Логотип ПСБ"
          className="page-logo"
        />
      </div>

      <div className="cards-container" onMouseLeave={() => setActiveCard(null)}>
        {/* Карточка Теория */}
        <Link
          to="/theory"
          className={`option-card theory-card ${activeCard === 'theory' ? 'active' : ''}`}
          onMouseEnter={() => setActiveCard('theory')}
        >
          <span className="option-text">Теория</span>
          <img
            src={bookIcon}
            alt="Книга"
            className="card-icon"
          />
          <p className="card-description">
           В этом разделе обучающийся может ознакомиться с теоретическими материалами, которые предоставляет ПСБ Банк. В разделе доступны теоретические материалы не только в текстовом формате, но и в виде видеолекций для более глубокого усвоения материала! ПСБ Банк желает удачи и успешного развития в рамках платформы!
          </p>
        </Link>

        {/* Карточка Практика */}
        <Link
          to="/practice" // Путь к пустой странице практики
          className={`option-card practice-card ${activeCard === 'practice' ? 'active' : ''}`}
          onMouseEnter={() => setActiveCard('practice')}
        >
          <span className="option-text">Практика</span>
          <img
            src={penIcon}
            alt="Ручка"
            className="card-icon"
          />
          <p className="card-description">
           В этом разделе обучающийся может отточить свои навыки и проверить знания с помощью заданий, предоставляемых ПСБ Банком. Тут он может не только непосредственно выполнять предложенные задания, но и отправить их на проверку и получить оценку от преподавателя с комментариями! ПСБ Банк желает удачи и успешного развития в рамках платформы!
          </p>
        </Link>
      </div>
    </div>
  );
};

export default NewPage;
