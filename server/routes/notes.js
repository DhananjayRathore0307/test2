import express from 'express';
import mongoose from 'mongoose';
import Note from '../models/Note.js';

const router = express.Router();

// Create note
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ message: 'Invalid title' });
    }

    const note = await Note.create({ title, content: '' });
    res.status(201).json(note);
  } catch (err) {
    console.error('POST error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get note by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    console.error('GET error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update note by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  if (typeof content !== 'string') {
    return res.status(400).json({ message: 'Invalid content' });
  }

  try {
    const note = await Note.findByIdAndUpdate(
      id,
      { content, updatedAt: new Date() },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    console.error('PUT error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
