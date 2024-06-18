const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const MouvementStock = sequelize.define('MouvementStock', {
    mouvement_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    produit_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'produit_id',
      },
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantite: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    raison: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
  });

  return MouvementStock;
};
