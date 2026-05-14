const router = require('express').Router();
const { crudFor } = require('../middleware/crud');
const c = crudFor('employees', [
  'employee_id','name','designation','education_qualification',
  'mobile_number','email_id','location','language_skills',
  'blood_group','emergency_contact','permanent_address','projects_handled','is_active'
]);
router.get('/', c.getAll).get('/:id', c.getOne).post('/', c.create).put('/:id', c.update).delete('/:id', c.remove);
module.exports = router;
