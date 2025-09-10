// middleware/cspmiddleware.js
const csp = (req, res, next) => {
    res.setHeader("Content-Security-Policy",
        "default-src 'self'; " +
        "script-src 'self'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data:; " +
        "font-src 'self'; " +
        "connect-src 'self' https://openrouter.ai;" // <-- UPDATED for OpenRouter
    );
    next();
};

export default csp;