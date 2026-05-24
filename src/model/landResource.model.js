module.exports = (sequelize, DataTypes) => {

  const LandResource = sequelize.define(
    'LandResource',
    {
      land_type: {
        type: DataTypes.STRING
      },

      location: {
        type: DataTypes.STRING
      },

      owner_type: {
        type: DataTypes.STRING
      },

      owner_poc_name: {
        type: DataTypes.STRING
      },

      contact_number: {
        type: DataTypes.STRING
      },

      mail_id: {
        type: DataTypes.STRING
      },

      communication_address: {
        type: DataTypes.TEXT
      },

      pin_code: {
        type: DataTypes.STRING
      },

      land_size_acres: {
        type: DataTypes.FLOAT
      },

      water_resource: {
        type: DataTypes.STRING
      },

      soil_test_status: {
        type: DataTypes.STRING
      },

      suggested_plantations: {
        type: DataTypes.TEXT
      },

      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: 'land_resources',

      timestamps: true,

      createdAt: 'created_at',

      updatedAt: 'updated_at'
    }
  );

  return LandResource;
};