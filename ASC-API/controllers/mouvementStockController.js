const mouvementStockService = require('../services/mouvementStockService');

exports.addMouvementStock = async (req, res) => {
  try {
    const newMouvement = await mouvementStockService.addMouvementStock(req.body);
    res.status(201).json(newMouvement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getMouvementStockById = async (req, res) => {
  try {
    const mouvement = await mouvementStockService.getMouvementStockById(req.params.id);
    res.json(mouvement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllMouvementStock = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const result = await mouvementStockService.getAllMouvementStock(page, pageSize);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMouvementStock = async (req, res) => {
  try {
    const updatedMouvement = await mouvementStockService.updateMouvementStock(req.params.id, req.body);
    res.json(updatedMouvement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMouvementStock = async (req, res) => {
  try {
    await mouvementStockService.deleteMouvementStock(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMovementsByProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      const { page = 1, limit = 10 } = req.query;
  
      const movements = await mouvementStockService.getMovementsByProduct(productId, page, limit);
      res.json(movements);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


