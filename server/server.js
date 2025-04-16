import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';

import botRoutes from './routes/botRoutes.js';
import authRoutes from './routes/authRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';
import cspMiddleware from './middleware/cspmiddleware.js';
import { authRateLimiter } from './middleware/ratelimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Security Middlewares (order matters)
app.use(helmet({ contentSecurityPolicy: false })); // We'll define custom CSP
app.use(cspMiddleware);
app.use(authRateLimiter);

// ✅ Core Middlewares
app.use(cors({
  origin: ['https://smartchat-o9o6sgyis-asmiths-projects-d78bfa96.vercel.app', 'https://smartchat-5nl6nxrjz-asmiths-projects-d78bfa96.vercel.app', 'https://smartchat-seven.vercel.app'], // Add the newest origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization',
}));
app.use(express.json());
app.use(morgan('dev')); // Logging

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', authMiddleware); // Protect /user routes
app.use('/api/bot', botRoutes); // Bot API

// ✅ Health Route
app.get('/', (req, res) => {
  res.send('SmartChat API is running');
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} without DB`));
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ✅ Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error', message: err.message });
});

export default app;
