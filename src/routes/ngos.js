const router = require('express').Router();
const { crudFor } = require('../middleware/crud');
const c = crudFor('ngos', [
  'ngo_name','registration_number','poc_name','contact_number','mail_id',
  'communication_address','pin_code','operating_zone','employee_strength',
  'specialization','projects_handled','credit_period','is_active'
]);
router.get('/', c.getAll).get('/:id', c.getOne).post('/', c.create).put('/:id', c.update).delete('/:id', c.remove);
module.exports = router;
