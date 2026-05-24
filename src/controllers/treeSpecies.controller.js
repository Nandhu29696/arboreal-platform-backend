const db = require('../model');

const Flower = db.TreeSpeciesFlower;
const Fruit = db.TreeSpeciesFruit;
const Bird = db.TreeSpeciesBird;
const Reptile = db.TreeSpeciesReptile;

// COMMON CRUD FACTORY
const crudController = (Model) => ({

  getAll: async (req, res) => {

    try {

      const data = await Model.findAll({
        order: [['created_at', 'DESC']]
      });

      res.json(data);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  },

  getOne: async (req, res) => {

    try {

      const data = await Model.findByPk(
        req.params.id
      );

      if (!data) {

        return res.status(404).json({
          error: 'Record not found'
        });

      }

      res.json(data);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  },

  create: async (req, res) => {

    try {

      const data = await Model.create(req.body);

      res.status(201).json(data);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  },

  update: async (req, res) => {

    try {

      const id = req.params.id;

      await Model.update(req.body, {
        where: { id }
      });

      const updated = await Model.findByPk(id);

      res.json(updated);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  },

  remove: async (req, res) => {

    try {

      await Model.destroy({
        where: {
          id: req.params.id
        }
      });

      res.json({
        message: 'Deleted successfully'
      });

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  }

});

module.exports = {
  flowers: crudController(Flower),
  fruits: crudController(Fruit),
  birds: crudController(Bird),
  reptiles: crudController(Reptile)
};