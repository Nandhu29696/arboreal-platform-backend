module.exports = (sequelize, DataTypes) => {

  const TreeSpeciesFruit = sequelize.define(
    'TreeSpeciesFruit',
    {
      category: {
        type: DataTypes.STRING
      },

      fruit_name: {
        type: DataTypes.STRING
      },

      sapling_name: {
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
      tableName: 'tree_species_fruits',

      timestamps: true,

      createdAt: 'created_at',

      updatedAt: 'updated_at'
    }
  );

  return TreeSpeciesFruit;
};