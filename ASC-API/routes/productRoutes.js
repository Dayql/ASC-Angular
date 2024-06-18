const express = require('express');
const productController = require('../controllers/productController');
const authenticate = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');

const router = express.Router();

// Routes utilisateur


// Routes utilisateur
router.get('/search', authenticate, productController.searchProducts);
router.post('/', authenticate, checkRole('admin'), productController.addProduct);
router.get('/:id', authenticate, productController.getProductById);
router.put('/:id', authenticate, checkRole('admin'), productController.updateProduct);
router.delete('/:id', authenticate, checkRole('admin'), productController.deleteProduct);

router.get('/', authenticate, productController.getAllProducts);

module.exports = router;

