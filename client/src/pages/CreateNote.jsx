import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function CreateNote() {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const createNote = async () => {
    const res = await api.post('/api/notes', { title });
    navigate(`/note/${res.data._id}`);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter note title"
        className="border px-3 py-2 rounded w-full"
      />
      <button
        onClick={createNote}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Note
      </button>
    </div>
  );
}
