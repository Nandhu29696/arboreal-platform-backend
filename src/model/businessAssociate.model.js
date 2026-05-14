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
      poc_name: {
        type: DataTypes.STRING,
      },
      contact_number: {
        type: DataTypes.STRING,
      },
      mail_id: {
        type: DataTypes.STRING,
      },
      communication_address: {
        type: DataTypes.TEXT,
      },
      pin_code: {
        type: DataTypes.STRING,
      },
      operating_zone: {
        type: DataTypes.STRING,
      },
      employee_strength: {
        type: DataTypes.INTEGER,
      },
      gst_details: {
        type: DataTypes.STRING,
      },
      projects_handled: {
        type: DataTypes.TEXT,
      },
      credit_period: {
        type: DataTypes.STRING,
      },
      specialization: {
        type: DataTypes.TEXT,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'business_associates',
      timestamps: true,
    }
  );

  return BusinessAssociate;
};