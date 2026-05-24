module.exports = (sequelize, DataTypes) => {

  const Vendor = sequelize.define(
    'Vendor',
    {
      vendor_type: {
        type: DataTypes.STRING
      },

      company_name: {
        type: DataTypes.STRING,
        allowNull: false
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

      gst_details: {
        type: DataTypes.STRING
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
      tableName: 'vendors',

      timestamps: true,

      createdAt: 'created_at',

      updatedAt: 'updated_at'
    }
  );

  return Vendor;
};