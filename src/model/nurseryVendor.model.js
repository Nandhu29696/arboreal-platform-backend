module.exports = (sequelize, DataTypes) => {

  const NurseryVendor = sequelize.define(
    'NurseryVendor',
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

      sapling_species_type: {
        type: DataTypes.STRING
      },

      species_category: {
        type: DataTypes.STRING
      },

      name_of_saplings: {
        type: DataTypes.STRING
      },

      size_of_saplings: {
        type: DataTypes.STRING
      },

      qty_available: {
        type: DataTypes.INTEGER
      },

      transport_option: {
        type: DataTypes.STRING
      },

      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: 'nursery_vendors',

      timestamps: true,

      createdAt: 'created_at',

      updatedAt: 'updated_at'
    }
  );

  return NurseryVendor;
};