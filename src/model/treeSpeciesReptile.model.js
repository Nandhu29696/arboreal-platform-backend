module.exports = (sequelize, DataTypes) => {

  const TreeSpeciesReptile = sequelize.define(
    'TreeSpeciesReptile',
    {
      category: {
        type: DataTypes.STRING
      },

      species_name: {
        type: DataTypes.STRING
      },

      reptile_name: {
        type: DataTypes.STRING
      },

      surface_type: {
        type: DataTypes.STRING
      },

      environment: {
        type: DataTypes.STRING
      },

      soil_type: {
        type: DataTypes.STRING
      }
    },
    {
      tableName: 'tree_species_reptiles',

      timestamps: true,

      createdAt: 'created_at',

      updatedAt: 'updated_at'
    }
  );

  return TreeSpeciesReptile;
};