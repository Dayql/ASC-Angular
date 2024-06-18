const { Sequelize, Op } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URI, {
  dialect: 'postgres',
  logging: false,
});


// Importer les modèles
const db = {};
db.sequelize = sequelize;

db.User = require('../models/userModel')(sequelize);
db.Product = require('../models/productModel')(sequelize);
db.Localisation = require('../models/localisationModel')(sequelize);
db.MouvementStock = require('../models/mouvementStockModel')(sequelize);

// Définir les associations
db.Product.hasMany(db.MouvementStock, { foreignKey: 'produit_id' });
db.MouvementStock.belongsTo(db.Product, { foreignKey: 'produit_id' });

db.sequelize.sync({ alter: true })
db.Op = Op;


module.exports = db;
