module.exports = (sequelize, DataTypes) => {

  const TreeTransplantation = sequelize.define(
    'TreeTransplantation',
    {
      project_id: DataTypes.INTEGER,

      current_location: DataTypes.STRING,

      transplantation_location: DataTypes.STRING,

      distance_km: DataTypes.FLOAT,

      species_name: DataTypes.STRING,

      girth_cm: DataTypes.FLOAT,

      qty: DataTypes.INTEGER,

      survival_rate: DataTypes.FLOAT,

      pre_survey_details: DataTypes.TEXT,

      post_survey_details: DataTypes.TEXT,

      transplantation_vendor_id: DataTypes.INTEGER,

      transport_vendor_id: DataTypes.INTEGER,

      water_supplier_id: DataTypes.INTEGER
    },
    {
      tableName: 'tree_transplantation',

      timestamps: true,

      createdAt: 'created_at',

      updatedAt: 'updated_at'
    }
  );

  return TreeTransplantation;
};