module.exports = (sequelize, DataTypes) => {

  const BusinessAssociate = sequelize.define(
    'BusinessAssociate',
    {
      business_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      poc_name: DataTypes.STRING,

      contact_number: DataTypes.STRING,

      mail_id: DataTypes.STRING,

      communication_address: DataTypes.TEXT,

      pin_code: DataTypes.STRING,

      operating_zone: DataTypes.STRING,

      employee_strength: DataTypes.INTEGER,

      gst_details: DataTypes.STRING,

      projects_handled: DataTypes.TEXT,

      credit_period: DataTypes.STRING,

      specialization: DataTypes.TEXT,

      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    },
    {
      tableName: 'business_associates',

      timestamps: true
    }
  );

  return BusinessAssociate;
};