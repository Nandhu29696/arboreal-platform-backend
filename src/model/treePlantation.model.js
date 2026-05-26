module.exports = (sequelize, DataTypes) => {

  const TreePlantation = sequelize.define(
    'TreePlantation',
    {
      project_id: DataTypes.INTEGER,

      plantation_location: DataTypes.STRING,

      species_name: DataTypes.STRING,

      girth_cm: DataTypes.FLOAT,

      qty: DataTypes.INTEGER,

      fencing_required: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },

      survival_rate: DataTypes.FLOAT,

      post_survey_details: DataTypes.TEXT,

      plantation_vendor_id: DataTypes.INTEGER,

      transport_vendor_id: DataTypes.INTEGER,

      water_supplier_id: DataTypes.INTEGER
    },
    {
      tableName: 'tree_plantation',

      timestamps: true,

      createdAt: 'created_at',

      updatedAt: 'updated_at'
    }
  );

  return TreePlantation;
};