const router = require('express').Router();
const { crudFor } = require('../middleware/crud');
const c = crudFor('volunteers', [
  'name','aadhar_id','mobile_number','email_id','education_qualification',
  'employed','specialization','language_skills','blood_group',
  'emergency_contact','permanent_address','location','is_active'
]);
router.get('/', c.getAll).get('/:id', c.getOne).post('/', c.create).put('/:id', c.update).delete('/:id', c.remove);
module.exports = router;
