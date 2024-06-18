const jwt = require('jsonwebtoken');

module.exports = function(role) {
  return function(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé' });
    }
    
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (decodedToken.role !== role) {
        return res.status(403).json({ message: 'Accès interdit' });
      }
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token invalide' });
    }
  }
};