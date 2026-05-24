module.exports = (sequelize, DataTypes) => {

  const HospitalityVertical = sequelize.define(
    'HospitalityVertical',
    {
      hospitality_type: {
        type: DataTypes.STRING
      },

      name_of_place: {
        type: DataTypes.STRING,
        allowNull: false
      },

      poc_details: {
        type: DataTypes.STRING
      },

      mobile_number: {
        type: DataTypes.STRING
      },

      email_id: {
        type: DataTypes.STRING
      },

      facilities: {
        type: DataTypes.TEXT
      },

      specialization: {
        type: DataTypes.TEXT
      },

      location: {
        type: DataTypes.STRING
      },

      address: {
        type: DataTypes.TEXT
      },

      pin_code: {
        type: DataTypes.STRING
      },

      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: 'hospitality_verticals',

      timestamps: true,

      createdAt: 'created_at',

      updatedAt: 'updated_at'
    }
  );

  return HospitalityVertical;
};