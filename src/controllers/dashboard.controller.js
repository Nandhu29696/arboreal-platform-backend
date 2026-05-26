const db = require('../model');

const {
  Project,
  Employee,
  Vendor,
  Volunteer,
  TreeCensus,
  TreeTransplantation,
  TreePlantation
} = db;

const { fn, col } = require('sequelize');

const safeInt = (val) =>
  parseInt(val || 0);

// ─────────────────────────────────────────────
// DASHBOARD SUMMARY
// ─────────────────────────────────────────────
exports.getSummary =
  async (req, res, next) => {

    try {

      const [
        totalProjects,
        totalEmployees,
        totalVendors,
        totalVolunteers,

        censusQty,
        transplantQty,
        plantationQty,

        projectsByStatus,
        projectsByType,

        recentProjects
      ] = await Promise.all([

        // TOTAL PROJECTS
        Project.count(),

        // ACTIVE EMPLOYEES
        Employee.count({
          where: {
            is_active: true
          }
        }),

        // ACTIVE VENDORS
        Vendor.count({
          where: {
            is_active: true
          }
        }),

        // ACTIVE VOLUNTEERS
        Volunteer.count({
          where: {
            is_active: true
          }
        }),

        // TREE CENSUS TOTAL
        TreeCensus.sum('qty'),

        // TREE TRANSPLANTATION TOTAL
        TreeTransplantation.sum('qty'),

        // TREE PLANTATION TOTAL
        TreePlantation.sum('qty'),

        // PROJECT STATUS
        Project.findAll({
          attributes: [
            'status',
            [
              fn('COUNT', col('status')),
              'count'
            ]
          ],
          group: ['status']
        }),

        // PROJECT TYPE
        Project.findAll({
          attributes: [
            'project_type',
            [
              fn(
                'COUNT',
                col('project_type')
              ),
              'count'
            ]
          ],
          group: ['project_type']
        }),

        // RECENT PROJECTS
        Project.findAll({
          attributes: [
            'project_name',
            'project_type',
            'status',
            'created_at'
          ],
          order: [
            ['created_at', 'DESC']
          ],
          limit: 5
        })

      ]);

      res.json({

        totals: {

          projects:
            safeInt(totalProjects),

          employees:
            safeInt(totalEmployees),

          vendors:
            safeInt(totalVendors),

          volunteers:
            safeInt(totalVolunteers),

          trees_censused:
            safeInt(censusQty),

          trees_transplanted:
            safeInt(transplantQty),

          trees_planted:
            safeInt(plantationQty)

        },

        projects_by_status:
          projectsByStatus,

        projects_by_type:
          projectsByType,

        recent_projects:
          recentProjects

      });

    } catch (error) {

      console.error(
        '❌ Dashboard Error:',
        error
      );

      next(error);

    }

  };