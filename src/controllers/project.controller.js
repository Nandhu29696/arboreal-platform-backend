const db = require('../model');

const {
    Project,
    TreeCensus,
    TreePlantation,
    TreeTransplantation,
    Maintenance,
    DailyUpdate,
    Volunteer,
    ProjectVolunteer,
    FileUpload
} = db;

const { Op } = require('sequelize');

// ─────────────────────────────────────────────
// GET ALL PROJECTS
// ─────────────────────────────────────────────
exports.getAll = async (req, res) => {

    try {

        const {
            page = 1,
            limit = 20,
            project_type,
            status,
            organization_name
        } = req.query;

        const offset =
            (parseInt(page) - 1) * parseInt(limit);

        const where = {};

        if (project_type) {
            where.project_type = project_type;
        }

        if (status) {
            where.status = status;
        }

        if (organization_name) {
            where.organization_name = {
                [Op.iLike]: `%${organization_name}%`
            };
        }

        const { rows, count } =
            await Project.findAndCountAll({
                where,
                limit: parseInt(limit),
                offset,
                order: [['created_at', 'DESC']]
            });

        res.json({
            data: rows,
            total: count,
            page: parseInt(page),
            limit: parseInt(limit)
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

// ─────────────────────────────────────────────
// GET SINGLE PROJECT
// ─────────────────────────────────────────────
exports.getOne = async (req, res) => {

    try {

        const project =
            await Project.findByPk(
                req.params.id,
                {
                    include: [
                        TreeCensus,
                        TreePlantation,
                        TreeTransplantation,
                        Maintenance,
                        {
                            model: DailyUpdate,
                            limit: 10
                        },
                        {
                            model: Volunteer,
                            through: {
                                attributes: ['role']
                            }
                        }
                    ]
                }
            );

        if (!project) {

            return res.status(404).json({
                error: 'Project not found'
            });

        }

        res.json(project);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

// ─────────────────────────────────────────────
// CREATE PROJECT
// ─────────────────────────────────────────────
exports.create = async (req, res) => {

    try {

        const data =
            await Project.create({
                ...req.body,
                status: req.body.status || 'Draft'
            });

        res.status(201).json(data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

// ─────────────────────────────────────────────
// UPDATE PROJECT
// ─────────────────────────────────────────────
exports.update = async (req, res) => {

    try {

        const project =
            await Project.findByPk(req.params.id);

        if (!project) {

            return res.status(404).json({
                error: 'Project not found'
            });

        }

        await project.update(req.body);

        res.json(project);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

// ─────────────────────────────────────────────
// DELETE / CANCEL PROJECT
// ─────────────────────────────────────────────
exports.remove = async (req, res) => {

    try {

        const project =
            await Project.findByPk(req.params.id);

        if (!project) {

            return res.status(404).json({
                error: 'Project not found'
            });

        }

        await project.update({
            status: 'Cancelled'
        });

        res.json({
            cancelled: req.params.id
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

// ─────────────────────────────────────────────
// ADD CENSUS
// ─────────────────────────────────────────────
exports.addCensus = async (req, res) => {

    try {

        const data =
            await TreeCensus.create({
                ...req.body,
                project_id: req.params.id
            });

        res.status(201).json(data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

// ─────────────────────────────────────────────
// ADD TRANSPLANTATION
// ─────────────────────────────────────────────
exports.addTransplantation =
    async (req, res) => {

        try {

            const data =
                await TreeTransplantation.create({
                    ...req.body,
                    project_id: req.params.id
                });

            res.status(201).json(data);

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }

    };

// ─────────────────────────────────────────────
// ADD PLANTATION
// ─────────────────────────────────────────────
exports.addPlantation =
    async (req, res) => {

        try {

            const data =
                await TreePlantation.create({
                    ...req.body,
                    project_id: req.params.id
                });

            res.status(201).json(data);

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }

    };

// ─────────────────────────────────────────────
// ADD MAINTENANCE
// ─────────────────────────────────────────────
exports.addMaintenance =
    async (req, res) => {

        try {

            const data =
                await Maintenance.create({
                    ...req.body,
                    project_id: req.params.id
                });

            res.status(201).json(data);

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }

    };

// ─────────────────────────────────────────────
// GET DAILY UPDATES
// ─────────────────────────────────────────────
exports.getUpdates = async (req, res) => {

    try {

        const data =
            await DailyUpdate.findAll({
                where: {
                    project_id: req.params.id
                },
                order: [['update_date', 'DESC']]
            });

        res.json(data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

// ─────────────────────────────────────────────
// ADD DAILY UPDATE
// ─────────────────────────────────────────────
exports.addUpdate = async (req, res) => {

    try {

        const photos =
            (req.files || []).map(
                file => `/uploads/${file.filename}`
            );

        const data =
            await DailyUpdate.create({

                project_id: req.params.id,

                update_date:
                    req.body.update_date || new Date(),

                description:
                    req.body.description,

                photos,

                updated_by:
                    req.body.updated_by || null

            });

        res.status(201).json(data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};
// ─────────────────────────────────────────────
// FILE UPLOAD
// ─────────────────────────────────────────────
exports.uploadFile = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                error: 'No file uploaded'
            });

        }

        const data =
            await FileUpload.create({
                entity_type: 'project',
                entity_id: req.params.id,
                file_name: req.file.originalname,
                file_path:
                    `/uploads/${req.file.filename}`,
                file_type: req.file.mimetype
            });

        res.status(201).json(data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

// ─────────────────────────────────────────────
// ASSIGN VOLUNTEER
// ─────────────────────────────────────────────

exports.assignVolunteer =
    async (req, res) => {

        try {

            const existing =
                await ProjectVolunteer.findOne({
                    where: {
                        project_id: req.params.id,
                        volunteer_id:
                            req.body.volunteer_id
                    }
                });

            if (existing) {

                return res.json({
                    message: 'Already assigned'
                });

            }

            const data =
                await ProjectVolunteer.create({
                    project_id: req.params.id,
                    volunteer_id:
                        req.body.volunteer_id,
                    role: req.body.role || null
                });

            res.status(201).json(data);

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }

    };

exports.getAssignedVolunteers =
    async (req, res) => {

        try {

            const volunteers =
                await Volunteer.findAll({

                    include: [

                        {
                            model: Project,

                            where: {
                                id: req.params.id
                            },

                            through: {
                                attributes: ['role']
                            }
                        }

                    ]

                });

            res.json(volunteers);

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }

    };

exports.getPlantation =
    async (req, res) => {

        try {

            const plantation =
                await TreePlantation.findOne({

                    where: {
                        project_id: req.params.id
                    }

                });

            if (!plantation) {

                return res.status(404).json({
                    error: 'Plantation details not found'
                });

            }

            res.json(plantation);

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }

    };