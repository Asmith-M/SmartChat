# SmartChat

[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=for-the-badge)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white&style=for-the-badge)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-FF3E00?logo=render&logoColor=white&style=for-the-badge)](https://render.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

SmartChat is a full-stack conversational AI chatbot application designed with a modern, responsive UI and a powerful backend. It offers a seamless chat experience with dual AI personalities, secure user authentication, and real-time conversation capabilities, making it an impressive tool for both users and developers.

## Live Demo
[**Experience SmartChat Live!**](https://smartchat-seven.vercel.app/)

## Screenshots
*A snapshot of the clean, modern interface in both light and dark modes.*  
![SmartChat UI Preview](<YOUR_SCREENSHOT_URL_HERE>)

##  Key Features
-  **Dual AI Personalities:** Switch between a professional, formal assistant and a witty, sassy companion.  
-  **Secure User Authentication:** JWT-based authentication for secure login and registration.  
-  **Stunning Modern UI:** A full-screen, responsive interface inspired by leading AI platforms, complete with light and dark modes.  
-  **Real-Time Conversation:** Enjoy a seamless chat experience with typing indicators and persistent conversation history.  
-  **Secure & Robust Backend:** Built with Node.js and Express, featuring rate limiting and security headers for protection.  
-  **Local Storage Persistence:** Session and chat history are saved locally for continuity.  
-  **Smooth UX:** Collapsible sidebar, light/dark mode toggle, and typing animations enhance user experience.

##  Technology Stack

| Layer          | Technologies & Tools                      |
|----------------|-----------------------------------------|
| Frontend       | React, React Router, Axios, DOMPurify, CSS3 |
| Backend        | Node.js, Express.js, Mongoose, JWT Authentication |
| Database       | MongoDB                                 |
| AI Integration | OpenRouter API                          |
| Deployment     | Vercel (Frontend), Render (Backend)     |

##  Getting Started: Local Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB (local or cloud instance)

### Backend Setup
```bash
cd server
npm install
cd ../server
```
Create a `.env` file in the `server` directory and add the environment variables listed below.
```bash
npm start
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

##  Environment Variables

Create a `.env` file in the `server` directory with the following variables:

 Create .env in /server
```env
# Server Configuration
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
HUGGINGFACE_API_KEY=your_hf_api_key

▶ Run the App
cd server
npm start
cd client
npm run dev
# MongoDB Connection
MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>

# JWT Authentication
JWT_SECRET=<YOUR_JWT_SECRET_KEY>

# OpenRouter API
OPENROUTER_API_KEY=<YOUR_OPENROUTER_API_KEY>
```

##  Project Journey & Challenges

 Chatbot Modes
 Formal – Polite, professional, respectful responses
 Sassy – Witty, Gen-Z, flirty, and sarcastic replies
Toggle using the switch in the Chat!
Building SmartChat was an exciting journey filled with learning and problem-solving. Early on, we encountered complex issues such as the infamous `path-to-regexp` error that required deep debugging to resolve routing conflicts. Additionally, CORS blockades posed challenges in secure API communication between the frontend and backend. Overcoming these hurdles was crucial in creating a robust, secure, and seamless full-stack application. These experiences strengthened the architecture and improved the overall user experience.

 Deployment
Frontend: Deployed to Vercel (output dir: /dist)
Backend: Deployed to Render (start script: node server.js)
##  Contact the Author

 License
MIT © Asmith-M (https://github.com/Asmith-M)
**Asmith M.**  
GitHub: [Asmith-M](https://github.com/Asmith-M)

 Future Enhancements:
 Contextual Memory for Chatbot
 PDF Upload & Summarization
 Multi-language Support
 Progressive Web App (PWA)
##  License

> Made with 💙 by Asmith-M
This project is licensed under the MIT License.
