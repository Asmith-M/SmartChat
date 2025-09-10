import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';

import authRoutes from './routes/authRoutes.js';
import botRoutes from './routes/botRoutes.js';
// import userRoutes from './routes/userRoutes.js'; 

import authMiddleware from './middleware/authMiddleware.js';
import cspMiddleware from './middleware/cspmiddleware.js';
import { authRateLimiter } from './middleware/ratelimiter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cspMiddleware);
app.use(authRateLimiter);

const corsOptions = {
    origin: 'https://smartchat-seven.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('SmartChat API is running and healthy.');
});

app.use('/api/auth', authRoutes);
app.use('/api/bot', botRoutes);

// app.use('/api/user', authMiddleware, userRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'An unexpected server error occurred.', message: err.message });
});

const startServer = async () => {
    try {
        // await mongoose.connect(process.env.MONGO_URI);
        // console.log('✅ MongoDB connected successfully.');
        app.listen(PORT, () => console.log(`🚀 Server is listening on port ${PORT}`));
    } catch (err) {
        console.error('❌ Server start failed:', err.message);
        process.exit(1);
    }
};

startServer();

export default app;
