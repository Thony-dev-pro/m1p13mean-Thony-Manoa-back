const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Non authentifié' });
    }
    
    if (!allowedRoles.includes(req.user.type)) {
      return res.status(403).json({ error: 'Accès refusé' });
    }
    
    next();
  };
};

module.exports = checkRole;