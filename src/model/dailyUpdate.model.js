module.exports = (sequelize, DataTypes) => {

  const DailyUpdate = sequelize.define(
    'DailyUpdate',
    {
      project_id: DataTypes.INTEGER,

      update_date: DataTypes.DATE,

      description: DataTypes.TEXT,

      photos: DataTypes.JSON,

      updated_by: DataTypes.INTEGER
    },
    {
      tableName: 'daily_updates',

      timestamps: true,

      createdAt: 'created_at',

      updatedAt: 'updated_at'
    }
  );

  return DailyUpdate;
};