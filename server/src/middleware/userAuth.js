const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Authorization header missing or incorrect. Please log in.' });
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ error: 'Token has expired. Please log in again.' });
                }
                return res.status(401).json({ error: 'Invalid token' });
            }

            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error('Error in userAuth middleware:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = userAuth;