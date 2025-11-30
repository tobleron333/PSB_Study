// Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import NewPage from './NewPage';
import TheoryPage from './TheoryPage';
import Practice from './PracticePage'; // Добавляем импорт Practice

// Используем функциональный компонент вместо классового
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/new-page" element={<NewPage />} />
      <Route path="/theory" element={<TheoryPage />} />
      <Route path="/practice" element={<Practice />} />
    </Routes>
  );
};

export default AppRoutes;
