const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Localisation = sequelize.define('Localisation', {
    localisation_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  return Localisation;
};
