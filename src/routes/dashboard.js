const router = require('express').Router();
const { query } = require('../config/db');

const safeInt = (val) => parseInt(val || 0);

router.get('/summary', async (req, res, next) => {
  try {
    const results = await Promise.all([
      query('SELECT COUNT(*) FROM projects'),
      query("SELECT COUNT(*) FROM employees WHERE is_active=TRUE"),
      query("SELECT COUNT(*) FROM vendors WHERE is_active=TRUE"),
      query("SELECT COUNT(*) FROM volunteers WHERE is_active=TRUE"),
      query('SELECT COALESCE(SUM(qty),0) as total FROM tree_census'),
      query('SELECT COALESCE(SUM(qty),0) as total FROM tree_transplantation'),
      query('SELECT COALESCE(SUM(qty),0) as total FROM tree_plantation'),
      query("SELECT status, COUNT(*) as count FROM projects GROUP BY status"),
      query("SELECT project_type, COUNT(*) as count FROM projects GROUP BY project_type"),
      query("SELECT project_name, project_type, status, created_at FROM projects ORDER BY created_at DESC LIMIT 5")
    ]);

    const [
      projects, employees, vendors, volunteers,
      censusQty, transplantQty, plantationQty,
      projectsByStatus, projectsByType, recentProjects
    ] = results;

    res.json({
      totals: {
        projects:     safeInt(projects.rows?.[0]?.count),
        employees:    safeInt(employees.rows?.[0]?.count),
        vendors:      safeInt(vendors.rows?.[0]?.count),
        volunteers:   safeInt(volunteers.rows?.[0]?.count),
        trees_censused:     safeInt(censusQty.rows?.[0]?.total),
        trees_transplanted: safeInt(transplantQty.rows?.[0]?.total),
        trees_planted:      safeInt(plantationQty.rows?.[0]?.total),
      },
      projects_by_status: projectsByStatus.rows || [],
      projects_by_type:   projectsByType.rows || [],
      recent_projects:    recentProjects.rows || []
    });

  } catch (e) {
    console.error("❌ Dashboard error:", e); // 👈 VERY IMPORTANT
    next(e); // let global error handler handle it
  }
});

module.exports = router;