import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import './TheoryPage.css';
import psbLogo from './psb-logo.png';


const TheoryFilesList = ({ theoryId }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        axios.get(`/api/theory-files-list/${theoryId}`).then(response => {
            setFiles(response.data);
        }).catch(error => {
            console.error('Ошибка загрузки файлов:', error);
        });
    }, [theoryId]);

    return (
        <ul className="file-list">
            {files.map(file => (
                <li key={file.id}>
                    <a
                        href={`/api/get-theory-material/${file.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="download-link"
                    >
                        {file.title}
                    </a>
                </li>
            ))}
        </ul>
    );
};

// Главный компонент страницы теории
const LessonPage = () => {
    return (
        <div className="theory-page">
            <div className="header-container">
                <div className="logo-container">
                    <img
                        src={psbLogo}
                        alt="Логотип"
                        className="page-logo"
                    />
                </div>
                <div className="title-container">
                    <h1>Теоретические материалы</h1>
                </div>
            </div>

            <div className="content-wrapper">
                <aside className="sidebar">
                    <div className="sidebar-content">
                        <h2>Материалы урока</h2>
                        <TheoryFilesList theoryId={1} /> {/* Передаёшь сюда id теории */}
                    </div>
                </aside>
                <main className="main-content">
                    {/* Основной контент */}
                </main>
            </div>
        </div>
    );
};

export default LessonPage;