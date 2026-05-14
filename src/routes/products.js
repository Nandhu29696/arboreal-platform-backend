// routes/products.js
const router = require('express').Router();
const { crudFor } = require('../middleware/crud');
const c = crudFor('products', ['product_type','name','description','specifications','is_active']);
router.get('/', c.getAll).get('/:id', c.getOne).post('/', c.create).put('/:id', c.update).delete('/:id', c.remove);
module.exports = router;
