module.exports = (sequelize, DataTypes) => {

  const ProjectVolunteer = sequelize.define(
    'ProjectVolunteer',
    {
      project_id: DataTypes.INTEGER,

      volunteer_id: DataTypes.INTEGER,

      role: DataTypes.STRING
    },
    {
      tableName: 'project_volunteers',

      timestamps: false
    }
  );

  return ProjectVolunteer;
};