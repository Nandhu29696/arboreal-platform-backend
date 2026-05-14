const router = require('express').Router();
const { crudFor } = require('../middleware/crud');
const c = crudFor('hospitality_verticals', [
  'hospitality_type','name_of_place','poc_details','mobile_number','email_id',
  'facilities','specialization','location','address','pin_code','is_active'
]);
router.get('/', c.getAll).get('/:id', c.getOne).post('/', c.create).put('/:id', c.update).delete('/:id', c.remove);
module.exports = router;
