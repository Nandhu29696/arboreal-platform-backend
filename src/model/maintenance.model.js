module.exports = (sequelize, DataTypes) => {

  const Maintenance = sequelize.define(
    'Maintenance',
    {
      project_id: DataTypes.INTEGER,

      current_location: DataTypes.STRING,

      transplantation_plantation_location: DataTypes.STRING,

      species_name: DataTypes.STRING,

      girth_cm: DataTypes.FLOAT,

      qty: DataTypes.INTEGER,

      post_survey_details: DataTypes.TEXT,

      maintenance_period_months: DataTypes.INTEGER,

      components_of_maintenance: DataTypes.JSON
    },
    {
      tableName: 'maintenance',

      timestamps: true,

      createdAt: 'created_at',

      updatedAt: 'updated_at'
    }
  );

  return Maintenance;
};