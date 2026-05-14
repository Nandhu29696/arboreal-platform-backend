const router = require('express').Router();
const { crudFor } = require('../middleware/crud');
const c = crudFor('land_resources', [
  'land_type','location','owner_type','owner_poc_name','contact_number','mail_id',
  'communication_address','pin_code','land_size_acres','water_resource',
  'soil_test_status','suggested_plantations','is_active'
]);
router.get('/', c.getAll).get('/:id', c.getOne).post('/', c.create).put('/:id', c.update).delete('/:id', c.remove);
module.exports = router;
