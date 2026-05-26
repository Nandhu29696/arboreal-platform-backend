module.exports = (sequelize, DataTypes) => {

    const Project = sequelize.define(
        'Project',
        {
            project_name: DataTypes.STRING,

            project_type: DataTypes.STRING,

            organization_name: DataTypes.STRING,

            address_details: DataTypes.TEXT,

            poc_name: DataTypes.STRING,

            contact_number: DataTypes.STRING,

            status: {
                type: DataTypes.STRING,
                defaultValue: 'Draft'
            },

            estimated_completion: DataTypes.DATE,

            industrial_vertical: DataTypes.STRING,

            created_by: DataTypes.INTEGER
        },
        {
            tableName: 'projects',

            timestamps: true,

            createdAt: 'created_at',

            updatedAt: 'updated_at'
        }
    );

    return Project;
};