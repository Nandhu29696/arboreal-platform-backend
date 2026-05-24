const router = require('express').Router();
const { query } = require('../config/db');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename: (req, file, cb) => cb(null, `${uuidv4()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// ── LIST / CREATE projects ────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, project_type, status, organization_name } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const conds = [], vals = [];

    if (project_type) { vals.push(project_type); conds.push(`project_type = $${vals.length}`); }
    if (status) { vals.push(status); conds.push(`status = $${vals.length}`); }
    if (organization_name) { vals.push(`%${organization_name}%`); conds.push(`organization_name ILIKE $${vals.length}`); }

    const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
    const countR = await query(`SELECT COUNT(*) FROM projects ${where}`, vals);
    vals.push(parseInt(limit), offset);
    const dataR = await query(
      `SELECT * FROM projects ${where} ORDER BY created_at DESC LIMIT $${vals.length - 1} OFFSET $${vals.length}`,
      vals
    );
    res.json({ data: dataR.rows, total: parseInt(countR.rows[0].count), page: parseInt(page), limit: parseInt(limit) });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/', async (req, res) => {
  try {
    const {
      project_name, project_type, organization_name, address_details,
      poc_name, contact_number, status, estimated_completion,
      industrial_vertical, created_by
    } = req.body;

    const r = await query(
      `INSERT INTO projects
        (project_name, project_type, organization_name, address_details,
         poc_name, contact_number, status, estimated_completion,
         industrial_vertical, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [project_name, project_type, organization_name, address_details,
        poc_name, contact_number, status || 'Draft', estimated_completion,
        industrial_vertical, created_by || null]
    );
    res.status(201).json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── GET / UPDATE / DELETE single project ─────────────────────
router.get('/:id', async (req, res) => {
  try {
    const proj = await query('SELECT * FROM projects WHERE id=$1', [req.params.id]);
    if (!proj.rows.length) return res.status(404).json({ error: 'Not found' });

    const p = proj.rows[0];
    let detail = {};

    if (p.project_type === 'census') {
      const r = await query('SELECT * FROM tree_census WHERE project_id=$1', [p.id]);
      detail = r.rows[0] || {};
    } else if (p.project_type === 'transplantation') {
      const r = await query('SELECT * FROM tree_transplantation WHERE project_id=$1', [p.id]);
      detail = r.rows[0] || {};
    } else if (p.project_type === 'plantation') {
      const r = await query('SELECT * FROM tree_plantation WHERE project_id=$1', [p.id]);
      detail = r.rows[0] || {};
    } else if (p.project_type === 'maintenance') {
      const r = await query('SELECT * FROM maintenance WHERE project_id=$1', [p.id]);
      detail = r.rows[0] || {};
    }

    const vols = await query(
      `SELECT v.*, pv.role FROM volunteers v
       JOIN project_volunteers pv ON v.id = pv.volunteer_id
       WHERE pv.project_id=$1`, [p.id]
    );
    const updates = await query(
      'SELECT * FROM daily_updates WHERE project_id=$1 ORDER BY update_date DESC LIMIT 10',
      [p.id]
    );

    res.json({ ...p, detail, volunteers: vols.rows, recent_updates: updates.rows });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const allowed = ['project_name', 'organization_name', 'address_details', 'poc_name',
      'contact_number', 'status', 'estimated_completion', 'industrial_vertical'];
    const keys = Object.keys(req.body).filter(k => allowed.includes(k));
    if (!keys.length) return res.status(400).json({ error: 'No valid fields' });
    const sets = keys.map((k, i) => `${k}=$${i + 1}`).join(', ');
    const r = await query(
      `UPDATE projects SET ${sets} WHERE id=$${keys.length + 1} RETURNING *`,
      [...keys.map(k => req.body[k]), req.params.id]
    );
    if (!r.rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await query("UPDATE projects SET status='Cancelled' WHERE id=$1", [req.params.id]);
    res.json({ cancelled: req.params.id });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── CENSUS detail ─────────────────────────────────────────────
router.post('/:id/census', async (req, res) => {
  try {
    const { location, landowner_name, landowner_contact, survey_details, qty } = req.body;
    const r = await query(
      `INSERT INTO tree_census (project_id, location, landowner_name, landowner_contact, survey_details, qty)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [req.params.id, location, landowner_name, landowner_contact, survey_details, qty || 0]
    );
    res.status(201).json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── TRANSPLANTATION detail ────────────────────────────────────
router.post('/:id/transplantation', async (req, res) => {
  try {
    const {
      current_location, transplantation_location, distance_km, species_name,
      girth_cm, qty, survival_rate, pre_survey_details, post_survey_details,
      transplantation_vendor_id, transport_vendor_id, water_supplier_id
    } = req.body;
    const r = await query(
      `INSERT INTO tree_transplantation
        (project_id, current_location, transplantation_location, distance_km,
         species_name, girth_cm, qty, survival_rate, pre_survey_details,
         post_survey_details, transplantation_vendor_id, transport_vendor_id, water_supplier_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [req.params.id, current_location, transplantation_location, distance_km,
        species_name, girth_cm, qty || 0, survival_rate,
        pre_survey_details, post_survey_details,
      transplantation_vendor_id || null, transport_vendor_id || null, water_supplier_id || null]
    );
    res.status(201).json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── PLANTATION detail ─────────────────────────────────────────
router.post('/:id/plantation', async (req, res) => {
  try {
    const {
      plantation_location, species_name, girth_cm, qty,
      fencing_required, survival_rate, post_survey_details,
      plantation_vendor_id, transport_vendor_id, water_supplier_id
    } = req.body;
    const r = await query(
      `INSERT INTO tree_plantation
        (project_id, plantation_location, species_name, girth_cm, qty,
         fencing_required, survival_rate, post_survey_details,
         plantation_vendor_id, transport_vendor_id, water_supplier_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [req.params.id, plantation_location, species_name, girth_cm, qty || 0,
      fencing_required || false, survival_rate, post_survey_details,
      plantation_vendor_id || null, transport_vendor_id || null, water_supplier_id || null]
    );
    res.status(201).json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── MAINTENANCE detail ────────────────────────────────────────
router.post('/:id/maintenance', async (req, res) => {
  try {
    const {
      current_location, transplantation_plantation_location, species_name,
      girth_cm, qty, post_survey_details, maintenance_period_months,
      components_of_maintenance
    } = req.body;
    const r = await query(
      `INSERT INTO maintenance
        (project_id, current_location, transplantation_plantation_location,
         species_name, girth_cm, qty, post_survey_details,
         maintenance_period_months, components_of_maintenance)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [req.params.id, current_location, transplantation_plantation_location,
        species_name, girth_cm, qty || 0, post_survey_details,
        maintenance_period_months, components_of_maintenance || []]
    );
    res.status(201).json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── DAILY UPDATES ─────────────────────────────────────────────
router.get('/:id/updates', async (req, res) => {
  try {
    const r = await query(
      'SELECT * FROM daily_updates WHERE project_id=$1 ORDER BY update_date DESC',
      [req.params.id]
    );
    res.json(r.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/:id/updates', upload.array('photos', 10), async (req, res) => {
  try {
    const { description, update_date, updated_by } = req.body;
    const photos = (req.files || []).map(f => `/uploads/${f.filename}`);
    const r = await query(
      `INSERT INTO daily_updates (project_id, update_date, description, photos, updated_by)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [req.params.id, update_date || new Date(), description, photos, updated_by || null]
    );
    res.status(201).json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── FILE UPLOAD ───────────────────────────────────────────────
router.post('/:id/files', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const r = await query(
      `INSERT INTO file_uploads (entity_type, entity_id, file_name, file_path, file_type)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      ['project', req.params.id, req.file.originalname,
        `/uploads/${req.file.filename}`, req.file.mimetype]
    );
    res.status(201).json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── VOLUNTEERS ────────────────────────────────────────────────
router.post('/:id/volunteers', async (req, res) => {
  try {
    const { volunteer_id, role } = req.body;
    const r = await query(
      `INSERT INTO project_volunteers (project_id, volunteer_id, role)
       VALUES ($1,$2,$3) ON CONFLICT DO NOTHING RETURNING *`,
      [req.params.id, volunteer_id, role || null]
    );
    res.status(201).json(r.rows[0] || { message: 'Already assigned' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
