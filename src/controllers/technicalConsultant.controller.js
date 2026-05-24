const db = require('../model');
const TechnicalConsultant = db.TechnicalConsultant;
// GET ALL
exports.getAll = async (req, res) => {

  try {

    const data =
      await TechnicalConsultant.findAll({
        order: [['created_at', 'DESC']]
      });

    res.json(data);

  } catch (error) {
f
    res.status(500).json({
      error: error.message
    });

  }
};

// GET ONE
exports.getOne = async (req, res) => {

  try {

    const data =
      await TechnicalConsultant.findByPk(
        req.params.id
      );

    if (!data) {

      return res.status(404).json({
        error: 'Consultant not found'
      });

    }

    res.json(data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// CREATE
exports.create = async (req, res) => {

  try {

    const data =
      await TechnicalConsultant.create(
        req.body
      );

    res.status(201).json(data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// UPDATE
exports.update = async (req, res) => {

  try {

    const id = req.params.id;

    await TechnicalConsultant.update(
      req.body,
      {
        where: { id }
      }
    );

    const updated =
      await TechnicalConsultant.findByPk(id);

    res.json(updated);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// DELETE
exports.remove = async (req, res) => {

  try {

    await TechnicalConsultant.destroy({
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
};