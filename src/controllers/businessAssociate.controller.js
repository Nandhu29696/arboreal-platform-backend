const db = require('../config/database');

const BusinessAssociate = db.BusinessAssociate;

// Get All
exports.getAll = async (req, res) => {
  try {
    const data = await BusinessAssociate.findAll();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get One
exports.getOne = async (req, res) => {
  try {
    const data = await BusinessAssociate.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: 'Record not found',
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create
exports.create = async (req, res) => {
  try {
    const data = await BusinessAssociate.create(req.body);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const [updated] = await BusinessAssociate.update(req.body, {
      where: { id },
    });

    if (!updated) {
      return res.status(404).json({
        message: 'Record not found',
      });
    }

    const updatedData = await BusinessAssociate.findByPk(id);

    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete
exports.remove = async (req, res) => {
  try {
    const deleted = await BusinessAssociate.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({
        message: 'Record not found',
      });
    }

    res.status(200).json({
      message: 'Deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};