import jwt from 'jsonwebtoken';
export const authenticate = (req, res, next) => {
    let token;
    // Check Bearer token
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }
    // Or check cookie
    if (!token && req.cookies?.refreshToken) {
        token = req.cookies.refreshToken;
    }
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch (err) {
        console.error('JWT verification failed:', err);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
