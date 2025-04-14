// middleware/cspmiddleware.js
const csp = (req, res, next) => {
    res.setHeader("Content-Security-Policy",
        "default-src 'self'; " +
        "script-src 'self'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data:; " +
        "font-src 'self'; " +
        "connect-src 'self' https://api-inference.huggingface.co;"
    );
    next();
};

export default csp; // Change this line