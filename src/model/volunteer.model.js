module.exports = (sequelize, DataTypes) => {

  const Volunteer = sequelize.define(
    'Volunteer',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      aadhar_id: {
        type: DataTypes.STRING
      },

      mobile_number: {
        type: DataTypes.STRING
      },

      email_id: {
        type: DataTypes.STRING
      },

      education_qualification: {
        type: DataTypes.STRING
      },

      employed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },

      specialization: {
        type: DataTypes.TEXT
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

      location: {
        type: DataTypes.STRING
      },

      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: 'volunteers',

      timestamps: true,

      createdAt: 'created_at',

      updatedAt: 'updated_at'
    }
  );

  return Volunteer;
};