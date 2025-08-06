import express from 'express';
import cors from 'cors';
import noteRoutes from './routes/notes.js';

const app = express();

// 🔧 Configure CORS to allow frontend domains and credentials
app.use(cors({
  origin: 'https://test2-mauve-kappa.vercel.app',
  credentials: true,
}));

app.use(express.json());

// API routes
app.use('/api/notes', noteRoutes);

export default app;
