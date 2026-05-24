module.exports = (sequelize, DataTypes) => {

  const Product = sequelize.define(
    'Product',
    {
      product_type: {
        type: DataTypes.STRING
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      description: {
        type: DataTypes.TEXT
      },

      specifications: {
        type: DataTypes.TEXT
      },

      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: 'products',

      timestamps: true,

      createdAt: 'created_at',

      updatedAt: 'updated_at'
    }
  );

  return Product;
};