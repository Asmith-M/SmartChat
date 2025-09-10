/**
 * =================================================================
 * | Main Server File (server.js)                                  |
 * =================================================================
 * | Initializes the Express application, sets up middleware,      |
 * | connects to the database, and starts the server.              |
 * =================================================================
 */

// Core Node Modules & Libraries
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import botRoutes from './routes/botRoutes.js';
// ❗ ACTION NEEDED: Create and import a userRoutes.js file for user-specific endpoints.
// import userRoutes from './routes/userRoutes.js'; 

// Middleware Imports
import authMiddleware from './middleware/authMiddleware.js';
import cspMiddleware from './middleware/cspmiddleware.js';
import { authRateLimiter } from './middleware/ratelimiter.js';

// --- Application Setup ---
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// --- Security Middleware ---
app.use(helmet({ contentSecurityPolicy: false })); // Use custom CSP
app.use(cspMiddleware);
app.use(authRateLimiter);

// --- Core Middleware ---
const corsOptions = {
    origin: 'https://smartchat-seven.vercel.app', // Allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight requests for all routes
app.use(express.json()); // Body parser for JSON
app.use(morgan('dev')); // HTTP request logger

// --- API Routes ---

// ✅ Health Check Route (Public)
app.get('/', (req, res) => {
    res.send('SmartChat API is running and healthy.');
});

/*
 * 🔍 DIAGNOSTIC LOGGING: The console.log statements below are added to pinpoint
 * which router is causing the "Missing parameter name" error on startup.
 * The last message logged before the crash indicates the faulty file.
 */
console.log("✅ [Diagnostic] Registering router: authRoutes");
app.use('/api/auth', authRoutes);

console.log("✅ [Diagnostic] Registering router: botRoutes");
app.use('/api/bot', botRoutes);

/*
 * ❗ LOGIC FIX: The line below was corrected.
 * Middleware should protect a router, not be mounted as a standalone route.
 * You need to create a `userRoutes.js` file that exports an Express router
 * for endpoints like `/profile`, `/settings`, etc. The authMiddleware will
 * protect all routes defined within `userRoutes`.
 *
 * To use this, uncomment the import for userRoutes at the top of the file
 * and uncomment the line below.
 */
// console.log("✅ [Diagnostic] Registering protected router: userRoutes");
// app.use('/api/user', authMiddleware, userRoutes);


// --- Error Handling Middleware ---

// 404 Handler (Runs if no other route matches)
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler (Catches errors from any route)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'An unexpected server error occurred.', message: err.message });
});

// --- Server & Database Initialization ---
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected successfully.');
        app.listen(PORT, () => console.log(`🚀 Server is listening on port ${PORT}`));
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1); // Exit process with failure code
    }
};

startServer();

export default app;
