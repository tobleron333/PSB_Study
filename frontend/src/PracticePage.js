import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PracticePage.css';
import psbLogo from './psb-logo.png';

const HomeworkFilesList = ({ theoryId }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        axios.get(`/api/homework-files-list/${theoryId}`).then(response => {
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
                        href={`/api/get-homework-file/${file.id}`}
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

const PublicFilesList = () => {
    const staticFiles = [
        { id: 1, title: 'ДЗ Алгоритмы 1.docx', link: '/static/ДЗ Алгоритмы 1.docx' },
        { id: 2, title: 'ДЗ Алгоритмы 2.docx', link: '/static/ДЗ Алгоритмы 2.docx' },
        { id: 3, title: 'ДЗ Алгоритмы 3.docx', link: '/static/ДЗ Алгоритмы 3.docx' },
        { id: 4, title: 'ДЗ Алгоритмы 4.docx', link: '/static/ДЗ Алгоритмы 4.docx' },
        { id: 5, title: 'ДЗ Алгоритмы 5.docx', link: '/static/ДЗ Алгоритмы 5.docx' },
 
    ];

    return (
        <ul className="file-list">
            {staticFiles.map(file => (
                <li key={file.id}>
                    <a
                        href={file.link}
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

const UploadForm = ({ onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('homework_id', '1');

        try {
            const response = await fetch('/api/upload-student-solution', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                setUploadStatus('success');
                onUploadSuccess();
            } else {
                setUploadStatus('error');
            }
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            setUploadStatus('error');
        }
    };

    return (
        <div className="upload-form">
            <input
                type="file"
                onChange={handleFileChange}
                accept=".docx,.pdf,.txt,.xls,.xlsx,.ppt,.pptx,.zip,.rar"
            />
            {uploadStatus && (
                <div className={`upload-status ${uploadStatus}`}>{uploadStatus === 'success' ? 'Файл успешно загружен!' : 'Ошибка загрузки файла.'}</div>
            )}
        </div>
    );
};

const PracticePage = () => {
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
                        <h2>Задания по практике</h2>
                        <HomeworkFilesList theoryId={1} />
                        <PublicFilesList />

                        <hr />

                        <h2>Ваше решение</h2>
                        <UploadForm onUploadSuccess={() => console.log('Файл отправлен')} />
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
