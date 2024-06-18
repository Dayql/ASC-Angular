const db = require('../config/database');
const MouvementStock = db.MouvementStock;

exports.addMouvementStock = async (data) => {
  try {
    const { produit_id, type, quantite, raison, date } = data;

    // Vérifiez que tous les champs sont fournis
    if (!produit_id || !type || !quantite || !raison || !date) {
      throw new Error('Tous les champs sont requis');
    }

    // Vérifiez que la quantité est un nombre positif
    if (isNaN(quantite) || parseFloat(quantite) <= 0) {
      throw new Error('La quantité doit être un nombre positif.');
    }

    const newMouvement = await MouvementStock.create({ 
      produit_id, 
      type, 
      quantite, 
      raison, 
      date 
    });
    return newMouvement;
  } catch (error) {
    throw error;
  }
};

exports.getMouvementStockById = async (id) => {
  try {
    const mouvement = await MouvementStock.findByPk(id);
    return mouvement;
  } catch (error) {
    throw error;
  }
};

exports.getAllMouvementStock = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;

    const { count, rows } = await MouvementStock.findAndCountAll({
      limit: pageSize,
      offset: offset,
      order: [['date', 'DESC']]
    });

    return {
      movements: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page
    };
  } catch (error) {
    throw error;
  }
};

exports.updateMouvementStock = async (id, updateData) => {
  try {
    const updatedMouvement = await MouvementStock.update(updateData, {
      where: { mouvement_id: id },
      returning: true,
      plain: true,
    });
    return updatedMouvement[1];
  } catch (error) {
    throw error;
  }
};

exports.deleteMouvementStock = async (id) => {
  try {
    await MouvementStock.destroy({ where: { mouvement_id: id } });
  } catch (error) {
    throw error;
  }
};

exports.getMovementsByProduct = async (productId, page, limit) => {
    try {
      const offset = (page - 1) * limit;
      const { count, rows } = await MouvementStock.findAndCountAll({
        where: { produit_id: productId },
        limit: limit,
        offset: offset,
        order: [['date', 'DESC']]
      });
  
      return {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        movements: rows
      };
    } catch (error) {
      throw error;
    }
  };

// Fonction pour vérifier le format de l'email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};  
