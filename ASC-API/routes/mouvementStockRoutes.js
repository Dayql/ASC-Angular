const express = require('express');
const mouvementStockController = require('../controllers/mouvementStockController');
const authenticate = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');

const router = express.Router();



router.post('/product/:productId', authenticate, mouvementStockController.addMouvementStock);
router.put('/:id', authenticate, mouvementStockController.updateMouvementStock);
router.delete('/:id', authenticate, checkRole('admin'), mouvementStockController.deleteMouvementStock);



router.get('/:id', authenticate, mouvementStockController.getMouvementStockById);
router.get('/', authenticate, mouvementStockController.getAllMouvementStock);
router.get('/product/:productId', authenticate, mouvementStockController.getMovementsByProduct);

module.exports = router;
