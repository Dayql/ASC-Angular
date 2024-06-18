const authService = require('../services/authService');


// Inscription de l'utilisateur
exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


// Connexion de l'utilisateur
exports.login = async (req, res) => {
  const { username, password, rememberMe } = req.body;

  try {
    const { token, user } = await authService.login({ username, password, rememberMe }); 
    res.json({
      success: true,
      token: `Bearer ${token}`,
      user
    });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

// Récupération du profil
exports.getProfile = (req, res) => {
  const { id, username, email, role } = req.user; // Récupération des informations de l'utilisateur connecté
  res.json({
    user: { id, username, email, role }
  });
};


// Récupérer tous les utilisateurs (admin seulement)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await authService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mise à jour du profil
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.id || req.user.id;
    const updatedUser = await authService.updateProfile(userId, req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Suppression du compte
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.params.id || req.user.id;
    await authService.deleteAccount(userId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUsersPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = 10; 

    const result = await authService.getUsersPaginated(page, limit);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};