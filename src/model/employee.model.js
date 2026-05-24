module.exports = (sequelize, DataTypes) => {

  const Employee = sequelize.define(
    'Employee',
    {
      employee_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      designation: {
        type: DataTypes.STRING
      },

      education_qualification: {
        type: DataTypes.STRING
      },

      mobile_number: {
        type: DataTypes.STRING
      },

      email_id: {
        type: DataTypes.STRING
      },

      location: {
        type: DataTypes.STRING
      },

      language_skills: {
        type: DataTypes.TEXT
      },

      blood_group: {
        type: DataTypes.STRING
      },

      emergency_contact: {
        type: DataTypes.STRING
      },

      permanent_address: {
        type: DataTypes.TEXT
      },

      projects_handled: {
        type: DataTypes.TEXT
      },

      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: 'employees',

      timestamps: true,

      createdAt: 'created_at',

      updatedAt: 'updated_at'
    }
  );

  return Employee;
};