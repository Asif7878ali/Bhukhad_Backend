const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log('tokeeeeeen', token)
    const decoded = jwt.verify(token, 'My_Secret_is_Private');
    console.log(decoded)
    console.log(decoded.userID)

    req.userId = decoded.userID;
    next();
  } catch (error) {
    console.log(error) 
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = authenticateUser;
