const router = require('express').Router();
const { crudFor } = require('../middleware/crud');
const c = crudFor('nursery_vendors', [
  'vendor_type','company_name','poc_name','contact_number','mail_id',
  'communication_address','pin_code','operating_zone','sapling_species_type',
  'species_category','name_of_saplings','size_of_saplings','qty_available',
  'transport_option','is_active'
]);
router.get('/', c.getAll).get('/:id', c.getOne).post('/', c.create).put('/:id', c.update).delete('/:id', c.remove);
module.exports = router;
