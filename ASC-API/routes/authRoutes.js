const express = require('express');
const authController = require('../controllers/authController');
const authenticate = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

// Routes utilisateur
router.get('/profile', authenticate, authController.getProfile);
router.put('/profile', authenticate, authController.updateProfile);
router.delete('/profile', authenticate, authController.deleteAccount);

// Routes protégées par le rôle admin
router.get('/users', authenticate, checkRole('admin'), authController.getAllUsers);
router.put('/users/:id', authenticate, checkRole('admin'), authController.updateProfile);
router.delete('/users/:id', authenticate, checkRole('admin'), authController.deleteAccount);
router.get('/users/paginated', authenticate, checkRole('admin'), authController.getUsersPaginated);



module.exports = router;
