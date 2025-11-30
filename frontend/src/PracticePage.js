import React, { useState, useEffect } from 'react';
import './PracticePage.css';
import psbLogo from './psb-logo.png';

const PracticePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success' | 'error' | null

  // Автоматически скрываем уведомление через 3 секунды
  useEffect(() => {
    if (uploadStatus === 'success' || uploadStatus === 'error') {
      const timer = setTimeout(() => {
        setUploadStatus(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [uploadStatus]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (!file) return;

    // Здесь можно добавить проверку размера/типа файла
    // Например: if (file.size > 10 * 1024 * 1024) { ... }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('success');
      } else {
        setUploadStatus('error');
      }
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      setUploadStatus('error');
    }
  };

  return (
    <div className="practice-page">
      <div className="header-container">
        <div className="logo-container">
          <img
            src={psbLogo}
            alt="Логотип"
            className="page-logo"
          />
        </div>
        <div className="title-container">
          <h1>Практические материалы</h1>
        </div>
      </div>

      <div className="content-wrapper">
        <aside className="sidebar">
          <div className="sidebar-content">
            <h2>Алгоритмы и структуры данных</h2>

            {/* Ссылка для скачивания шаблона */}
            <div className="download-section">
              <a
                href="/files/практика_1.docx"
                download="Практика_1.docx"
                className="download-link"
              >
                <p>Практика 1</p>
              </a>
              <span className="download-hint">(скачать шаблон)</span>
            </div>

            {/* Поле загрузки файла */}
            <div className="upload-container">
              <p>Загрузите своё решение:</p>
              <label className="file-upload-label">
                Выбрать файл
                <input
                  type="file"
                  className="file-upload-input"
                  onChange={handleFileChange}
                  accept=".docx,.pdf,.txt,.xls,.xlsx,.ppt,.pptx,.zip,.rar"
                />
              </label>

              {selectedFile && (
                <span className="file-info">
                  Выбран: {selectedFile.name} ({selectedFile.size} байт)
                </span>
              )}

              {/* Уведомление о статусе загрузки */}
              {uploadStatus && (
                <div
                  className={`upload-notification ${uploadStatus} show`}
                >
                  {uploadStatus === 'success'
                    ? 'Файл успешно загружен!'
                    : 'Ошибка загрузки файла. Попробуйте ещё раз.'}
                </div>
              )}
            </div>
          </div>
        </aside>
        <main className="main-content">
          {/* Основной контент */}
        </main>
      </div>
    </div>
  );
};

export default PracticePage;
