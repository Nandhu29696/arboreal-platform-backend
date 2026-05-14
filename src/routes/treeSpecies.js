const router = require('express').Router();
const { crudFor } = require('../middleware/crud');

const flowers  = crudFor('tree_species_flowers',  ['category','flower_name','sapling_name','qty_available']);
const fruits   = crudFor('tree_species_fruits',   ['category','fruit_name','sapling_name','environment','soil_type']);
const birds    = crudFor('tree_species_birds',    ['category','species_name','bird_types','environment','soil_type']);
const reptiles = crudFor('tree_species_reptiles', ['category','species_name','reptile_name','surface_type','environment','soil_type']);

router.get('/flowers',       flowers.getAll).get('/flowers/:id',   flowers.getOne)
      .post('/flowers',      flowers.create).put('/flowers/:id',   flowers.update)
      .delete('/flowers/:id',flowers.remove);

router.get('/fruits',        fruits.getAll).get('/fruits/:id',     fruits.getOne)
      .post('/fruits',       fruits.create).put('/fruits/:id',     fruits.update)
      .delete('/fruits/:id', fruits.remove);

router.get('/birds',         birds.getAll).get('/birds/:id',       birds.getOne)
      .post('/birds',        birds.create).put('/birds/:id',       birds.update)
      .delete('/birds/:id',  birds.remove);

router.get('/reptiles',      reptiles.getAll).get('/reptiles/:id', reptiles.getOne)
      .post('/reptiles',     reptiles.create).put('/reptiles/:id', reptiles.update)
      .delete('/reptiles/:id',reptiles.remove);

module.exports = router;
