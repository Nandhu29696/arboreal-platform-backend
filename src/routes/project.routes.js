const router = require('express').Router();

const controller =
    require('../controllers/project.controller');

const upload =
    require('../middleware/upload');
const multer = require('multer');

const path = require('path');

const { v4: uuidv4 } = require('uuid');


// CRUD
router.get(
    '/',
    controller.getAll
);

router.get(
    '/:id',
    controller.getOne
);

router.post(
    '/',
    controller.create
);

router.put(
    '/:id',
    controller.update
);

router.delete(
    '/:id',
    controller.remove
);

// DETAILS
router.post(
    '/:id/census',
    controller.addCensus
);

router.post(
    '/:id/transplantation',
    controller.addTransplantation
);

router.post(
    '/:id/plantation',
    controller.addPlantation
);

router.post(
    '/:id/maintenance',
    controller.addMaintenance
);

// DAILY UPDATES
router.get(
    '/:id/updates',
    controller.getUpdates
);

router.post(
    '/:id/updates',
    upload.array('photos', 10),
    controller.addUpdate
);

// FILES
router.post(
    '/:id/files',
    upload.single('file'),
    controller.uploadFile
);

// VOLUNTEERS
router.post(
    '/:id/volunteers',
    controller.assignVolunteer
);

router.get(
    '/:id/volunteers',
    controller.getAssignedVolunteers
);
router.get(
    '/:id/plantation',
    controller.getPlantation
);
module.exports = router;