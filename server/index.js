// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import botRoutes from './routes/botRoutes.js'; // ✅ Correct import

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ THIS is what enables /api/bot/chat
app.use('/api/bot', botRoutes);

app.get('/', (req, res) => {
  res.send('SmartChat backend running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
