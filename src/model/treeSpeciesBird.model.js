module.exports = (sequelize, DataTypes) => {

  const TreeSpeciesBird = sequelize.define(
    'TreeSpeciesBird',
    {
      category: {
        type: DataTypes.STRING
      },

      species_name: {
        type: DataTypes.STRING
      },

      bird_types: {
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
      tableName: 'tree_species_birds',

      timestamps: true,

      createdAt: 'created_at',

      updatedAt: 'updated_at'
    }
  );

  return TreeSpeciesBird;
};