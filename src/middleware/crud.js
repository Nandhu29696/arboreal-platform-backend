const { query } = require('../config/db');

/**
 * Factory: returns { getAll, getOne, create, update, remove }
 * for a given table with standard UUID pk.
 */
function crudFor(table, allowedFields) {
  const cols = allowedFields;

  return {
    async getAll(req, res) {
      try {
        const { page = 1, limit = 20, search, ...filters } = req.query;
        const offset = (parseInt(page) - 1) * parseInt(limit);
        let conds = ['is_active = TRUE'], vals = [];

        // Generic column filters (exact match)
        Object.entries(filters).forEach(([k, v]) => {
          if (cols.includes(k)) {
            vals.push(v);
            conds.push(`${k} = $${vals.length}`);
          }
        });

        const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
        const countRes = await query(`SELECT COUNT(*) FROM ${table} ${where}`, vals);
        vals.push(parseInt(limit), offset);
        const dataRes  = await query(
          `SELECT * FROM ${table} ${where} ORDER BY created_at DESC LIMIT $${vals.length - 1} OFFSET $${vals.length}`,
          vals
        );
        res.json({
          data: dataRes.rows,
          total: parseInt(countRes.rows[0].count),
          page: parseInt(page),
          limit: parseInt(limit)
        });
      } catch (e) { res.status(500).json({ error: e.message }); }
    },

    async getOne(req, res) {
      try {
        const r = await query(`SELECT * FROM ${table} WHERE id=$1 AND is_active=TRUE`, [req.params.id]);
        if (!r.rows.length) return res.status(404).json({ error: 'Not found' });
        res.json(r.rows[0]);
      } catch (e) { res.status(500).json({ error: e.message }); }
    },

    async create(req, res) {
      try {
        const body = req.body;
        const keys = Object.keys(body).filter(k => cols.includes(k));
        if (!keys.length) return res.status(400).json({ error: 'No valid fields' });
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
        const r = await query(
          `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`,
          keys.map(k => body[k])
        );
        res.status(201).json(r.rows[0]);
      } catch (e) { res.status(500).json({ error: e.message }); }
    },

    async update(req, res) {
      try {
        const body = req.body;
        const keys = Object.keys(body).filter(k => cols.includes(k));
        if (!keys.length) return res.status(400).json({ error: 'No valid fields' });
        const sets = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
        const r = await query(
          `UPDATE ${table} SET ${sets} WHERE id=$${keys.length + 1} AND is_active=TRUE RETURNING *`,
          [...keys.map(k => body[k]), req.params.id]
        );
        if (!r.rows.length) return res.status(404).json({ error: 'Not found' });
        res.json(r.rows[0]);
      } catch (e) { res.status(500).json({ error: e.message }); }
    },

    async remove(req, res) {
      try {
        const r = await query(
          `UPDATE ${table} SET is_active=FALSE WHERE id=$1 RETURNING id`,
          [req.params.id]
        );
        if (!r.rows.length) return res.status(404).json({ error: 'Not found' });
        res.json({ deleted: r.rows[0].id });
      } catch (e) { res.status(500).json({ error: e.message }); }
    }
  };
}

module.exports = { crudFor };
