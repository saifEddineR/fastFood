const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    console.log('before');
    const token = req.header('token');
    if (!token) return res.status(401).json({ msg: 'You are not authorized.' });
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verifyToken.sub;
    next();
  } catch (error) {
    res.status(500).json({ msg: 'unvalid token' });
  }
};
module.exports = authMiddleware;
