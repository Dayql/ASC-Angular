const db = require('../config/database');
const { Op } = require('sequelize');
const Product = db.Product;
const MouvementStock = db.MouvementStock;

// Fonction pour vérifier le format du nom
const isValidName = (name) => {
  return typeof name === 'string' && name.length >= 3;
};

// Fonction pour vérifier le format de la référence
const isValidReference = (reference) => {
  return typeof reference === 'string' && reference.length >= 3;
};

// Fonction pour vérifier le format du prix
const isValidPrice = (price) => {
  return !isNaN(price) && parseFloat(price) > 0;
};

exports.addProduct = async (productData) => {
  try {
    const { nom, reference, prix } = productData;

    // Vérification des prérequis pour les champs
    if (!isValidName(nom)) {
      throw new Error('Le nom doit comporter au moins 3 caractères.');
    }

    if (!isValidReference(reference)) {
      throw new Error('La référence doit comporter au moins 3 caractères.');
    }

    if (!isValidPrice(prix)) {
      throw new Error('Le prix doit être un nombre positif.');
    }

    const newProduct = await Product.create(productData);
    return newProduct;
  } catch (error) {
    throw error;
  }
};

exports.getProductById = async (productId) => {
  try {
    const product = await Product.findByPk(productId, {
      include: [{ model: MouvementStock }]
    });
    return product;
  } catch (error) {
    throw error;
  }
};

exports.updateProduct = async (productId, updateData) => {
  try {
    const { nom, reference, prix } = updateData;

    // Vérifie les champs obligatoires
    if (nom === undefined && reference === undefined && prix === undefined) {
      throw new Error('Tous les champs sont requis');
    }

    // Vérification des prérequis pour les champs
    if (nom !== undefined && !isValidName(nom)) {
      throw new Error('Le nom doit comporter au moins 3 caractères');
    }

    if (reference !== undefined && !isValidReference(reference)) {
      throw new Error('La référence doit comporter au moins 3 caractères');
    }

    if (prix !== undefined && !isValidPrice(prix)) {
      throw new Error('Le prix doit être un nombre positif.');
    }

    // Récupère le produit actuel pour comparer les champs
    const currentProduct = await Product.findByPk(productId);

    if (!currentProduct) {
      throw new Error('Produit non trouvé');
    }

    // Vérifie si le produit essaie de réutiliser sa propre référence ou nom
    const noChanges = 
      (nom === undefined || nom === currentProduct.nom) &&
      (reference === undefined || reference === currentProduct.reference) &&
      (prix === undefined || prix === currentProduct.prix);

    if (noChanges) {
      throw new Error('Aucune modification détectée');
    }

    // Vérifie si la référence ou le nom sont fournis et existent déjà dans la bdd pour d'autres produits
    const existingProduct = await Product.findOne({
      where: {
        [Op.or]: [
          nom && nom !== currentProduct.nom ? { nom: nom, produit_id: { [Op.ne]: productId } } : null,
          reference && reference !== currentProduct.reference ? { reference: reference, produit_id: { [Op.ne]: productId } } : null
        ].filter(Boolean)  // Filtre les nulls
      }
    });

    if (existingProduct) {
      const duplicateField = existingProduct.reference === reference ? 'Référence' : 'Nom';
      throw new Error(`${duplicateField} existe déjà`);
    }

    // Supprime les champs inchangés pour éviter les mises à jour inutiles
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === currentProduct[key]) {
        delete updateData[key];
      }
    });

    if (Object.keys(updateData).length === 0) {
      throw new Error('Aucune modification détectée');
    }

    await Product.update(updateData, {
      where: { produit_id: productId }, // Correction de l'utilisation de l'identifiant
      returning: true,
      plain: true,
    });

    const updatedProduct = await Product.findByPk(productId);
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

exports.deleteProduct = async (productId) => {
  try {
    await Product.destroy({ where: { produit_id: productId } }); // Correction de l'utilisation de l'identifiant
  } catch (error) {
    throw error;
  }
};

exports.getAllProducts = async () => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    throw error;
  }
};

exports.searchProducts = async (query) => {
  try {
    if (!query || query.trim() === '') {
      throw new Error('La requête de recherche ne peut pas être vide.');
    }

    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { reference: { [Op.iLike]: `%${query}%` } },
          { nom: { [Op.iLike]: `%${query}%` } }
        ]
      },
      include: [{ model: MouvementStock }]
    });
    return products;
  } catch (error) {
    throw error;
  }
};
