module.exports = (sequelize, DataTypes) => {

  const NGO = sequelize.define(
    'NGO',
    {
      ngo_name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      registration_number: {
        type: DataTypes.STRING
      },

      poc_name: {
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

      operating_zone: {
        type: DataTypes.STRING
      },

      employee_strength: {
        type: DataTypes.INTEGER
      },

      specialization: {
        type: DataTypes.TEXT
      },

      projects_handled: {
        type: DataTypes.TEXT
      },

      credit_period: {
        type: DataTypes.STRING
      },

      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: 'ngos',

      timestamps: true,

      createdAt: 'created_at',

      updatedAt: 'updated_at'
    }
  );

  return NGO;
};