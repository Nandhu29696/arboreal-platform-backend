const router = require('express').Router();

const controller =
    require('../controllers/treeSpecies.controller');

// FLOWERS
router.get('/flowers', controller.flowers.getAll);
router.get('/flowers/:id', controller.flowers.getOne);
router.post('/flowers', controller.flowers.create);

router.put(
    '/flowers/:id',
    controller.flowers.update
);

router.delete(
    '/flowers/:id',
    controller.flowers.remove
);

// FRUITS
router.get(
    '/fruits',
    controller.fruits.getAll
);

router.get(
    '/fruits/:id',
    controller.fruits.getOne
);

router.post(
    '/fruits',
    controller.fruits.create
);

router.put(
    '/fruits/:id',
    controller.fruits.update
);

router.delete(
    '/fruits/:id',
    controller.fruits.remove
);

// BIRDS
router.get(
    '/birds',
    controller.birds.getAll
);

router.get(
    '/birds/:id',
    controller.birds.getOne
);

router.post(
    '/birds',
    controller.birds.create
);

router.put(
    '/birds/:id',
    controller.birds.update
);

router.delete(
    '/birds/:id',
    controller.birds.remove
);

// REPTILES
router.get(
    '/reptiles',
    controller.reptiles.getAll
);

router.get(
    '/reptiles/:id',
    controller.reptiles.getOne
);

router.post(
    '/reptiles',
    controller.reptiles.create
);

router.put(
    '/reptiles/:id',
    controller.reptiles.update
);

router.delete(
    '/reptiles/:id',
    controller.reptiles.remove
);

module.exports = router;