const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.replace('Bearer ', ''); // Assuming the token is in the format "Bearer <token>"
    const decoded = jwt.verify(token, 'your_jwt_secret'); // replace 'your_jwt_secret' with your actual secret key

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    req.token = token;
    req.id = decoded.userId;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Invalid token or user not found' });
  }
};

module.exports = auth;
