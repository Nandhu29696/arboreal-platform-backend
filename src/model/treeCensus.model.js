module.exports = (sequelize, DataTypes) => {

  const TreeCensus = sequelize.define(
    'TreeCensus',
    {
      project_id: DataTypes.INTEGER,

      location: DataTypes.STRING,

      landowner_name: DataTypes.STRING,

      landowner_contact: DataTypes.STRING,

      survey_details: DataTypes.TEXT,

      qty: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      tableName: 'tree_census',

      timestamps: true,

      createdAt: 'created_at',

      updatedAt: 'updated_at'
    }
  );

  return TreeCensus;
};