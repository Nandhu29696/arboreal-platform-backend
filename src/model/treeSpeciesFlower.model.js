// src/model/treeSpeciesFlower.model.js

module.exports = (sequelize, DataTypes) => {

  const TreeSpeciesFlower = sequelize.define(
    'TreeSpeciesFlower',
    {

      flower_name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      category: {
        type: DataTypes.STRING
      },

      sapling_name: {
        type: DataTypes.STRING
      },

      qty_available: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },

      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }

    },
    {
      tableName: 'tree_species_flowers',

      timestamps: true,

      createdAt: 'created_at',

      updatedAt: 'updated_at'
    }
  );

  return TreeSpeciesFlower;

};