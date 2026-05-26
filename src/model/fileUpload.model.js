module.exports = (sequelize, DataTypes) => {

  const FileUpload = sequelize.define(
    'FileUpload',
    {
      entity_type: DataTypes.STRING,

      entity_id: DataTypes.INTEGER,

      file_name: DataTypes.STRING,

      file_path: DataTypes.STRING,

      file_type: DataTypes.STRING
    },
    {
      tableName: 'file_uploads',

      timestamps: true,

      createdAt: 'created_at',

      updatedAt: 'updated_at'
    }
  );

  return FileUpload;
};