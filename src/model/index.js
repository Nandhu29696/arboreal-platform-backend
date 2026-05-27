const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,

    dialect: process.env.DB_TYPE, // postgres or mysql

    logging: false,

    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};

// MODELS
db.BusinessAssociate = require('./businessAssociate.model')(sequelize, DataTypes);
db.TreeSpeciesFruit = require('./treeSpeciesFruit.model')(sequelize, DataTypes);
db.TreeSpeciesBird = require('./treeSpeciesBird.model')(sequelize, DataTypes);
db.TreeSpeciesReptile = require('./treeSpeciesReptile.model')(sequelize, DataTypes);
db.TreeSpeciesFlower = require('./treeSpeciesFlower.model')(sequelize, DataTypes);
db.TechnicalConsultant = require('./technicalConsultant.model')(sequelize, DataTypes);
db.Employee = require('./employee.model')(sequelize, DataTypes);
db.HospitalityVertical = require('./hospitalityVertical.model')(sequelize, DataTypes);
db.LandResource = require('./landResource.model')(sequelize, DataTypes);
db.Ngo = require('./ngo.model')(sequelize, DataTypes);
db.NurseryVendor = require('./nurseryVendor.model')(sequelize, DataTypes);
db.Vendor = require('./vendor.model')(sequelize, DataTypes);
db.Volunteer = require('./volunteer.model')(sequelize, DataTypes);
db.Product = require('./product.model')(sequelize, DataTypes);
// MODELS
db.Project =
  require('./project.model')(sequelize, DataTypes);

db.TreeCensus =
  require('./treeCensus.model')(sequelize, DataTypes);

db.TreePlantation =
  require('./treePlantation.model')(sequelize, DataTypes);

db.TreeTransplantation =
  require('./treeTransplantation.model')(sequelize, DataTypes);

db.Maintenance =
  require('./maintenance.model')(sequelize, DataTypes);

db.DailyUpdate =
  require('./dailyUpdate.model')(sequelize, DataTypes);

db.FileUpload =
  require('./fileUpload.model')(sequelize, DataTypes);

db.ProjectVolunteer =
  require('./projectVolunteer.model')(sequelize, DataTypes);

db.Volunteer =
  require('./volunteer.model')(sequelize, DataTypes);

// ASSOCIATIONS

// PROJECT → CENSUS
db.Project.hasOne(db.TreeCensus, {
  foreignKey: 'project_id'
});

db.TreeCensus.belongsTo(db.Project, {
  foreignKey: 'project_id'
});

// PROJECT → TRANSPLANTATION
db.Project.hasOne(db.TreeTransplantation, {
  foreignKey: 'project_id'
});

db.TreeTransplantation.belongsTo(db.Project, {
  foreignKey: 'project_id'
});

// PROJECT → PLANTATION
db.Project.hasOne(db.TreePlantation, {
  foreignKey: 'project_id'
});

db.TreePlantation.belongsTo(db.Project, {
  foreignKey: 'project_id'
});

// PROJECT → MAINTENANCE
db.Project.hasOne(db.Maintenance, {
  foreignKey: 'project_id'
});

db.Maintenance.belongsTo(db.Project, {
  foreignKey: 'project_id'
});

// PROJECT → DAILY UPDATES
db.Project.hasMany(db.DailyUpdate, {
  foreignKey: 'project_id',
  as: 'recent_updates'
});

db.DailyUpdate.belongsTo(db.Project, {
  foreignKey: 'project_id',
  as: 'project'
});

// PROJECT ↔ VOLUNTEERS
db.Project.belongsToMany(
  db.Volunteer,
  {
    through: db.ProjectVolunteer,
    foreignKey: 'project_id',
    otherKey: 'volunteer_id',
    as: 'volunteers'
  }
);

db.Volunteer.belongsToMany(
  db.Project,
  {
    through: db.ProjectVolunteer,
    foreignKey: 'volunteer_id',
    otherKey: 'project_id',
    as: 'projects'
  }
);

db.Project.hasMany(db.FileUpload, {
  foreignKey: 'entity_id',
  as: 'files',
  scope: {
    entity_type: 'project'
  }
});

db.FileUpload.belongsTo(db.Project, {
  foreignKey: 'entity_id',
  as: 'project'
});


// SEQUELIZE
db.sequelize = sequelize;

db.Sequelize = Sequelize;


module.exports = db;