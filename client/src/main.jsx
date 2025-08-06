import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateNote from './pages/CreateNote';
import NoteEditor from './pages/NoteEditor';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateNote />} />
        <Route path="/note/:id" element={<NoteEditor />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);