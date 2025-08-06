import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Untitled',
  },
  content: {
    type: String,
    default: '',
  },
}, {
  timestamps: true
});


const Note = mongoose.model('Note', noteSchema);
export default Note;
