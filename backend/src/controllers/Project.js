import Project from '../models/project.js';

const projectController = {
	save: async (req, res, next) => {
		let project = new Project();

		project.name = req.body.name;
		project.startDate = req.body.startDate;
		project.endDate = req.body.endDate;
		project.teamSize = req.body.teamSize;
		project.budget = req.body.budget;
		project.exprense = req.body.exprense;
		project.status = req.body.status;

		try {
			await project.save();
			res.status(201).json({
				success: true,
				date: project,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: "The project can't be created",
				error: error,
			});
		}
	},
	find: async (req, res, next) => {
		try {
			const projectList = await Project.find();
			res.status(200).json({
				message: 'find success',
				data: projectList,
			});
		} catch (error) {
			res.status(500).json({
				message: 'find faild',
				error: error,
			});
		}
	},
	findOne: async (req, res, next) => {
		try {
			const project = await Project.findById(req.params.id);
			res.status(200).json({
				message: 'find success',
				data: project,
			});
		} catch (error) {
			res.status(500).json({
				message: 'find faild',
				error: error,
			});
		}
	},
	delete: async (req, res, next) => {
		const _id = req.params.id;
		try {
			await Project.deleteOne({ _id: _id });
			res.status(201).json({
				success: true,
				message: 'delete success',
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: 'delete false',
			});
		}
	},
	update: async (req, res, next) => {
		const _id = req.params.id;
		const projectExit = await Project.findById(_id);

		if (!projectExit)
			return res.status(500).json({
				success: false,
				message: 'No project existed',
			});

		const project = {
			name: req.body.name,
			startDate: req.body.startDate,
			endDate: req.body.endDate,
			teamSize: req.body.teamSize,
			budget: req.body.budget,
			exprense: req.body.exprense,
			status: req.body.status,
		};

		try {
			const prj = await Project.findByIdAndUpdate(_id, project, {
				new: true,
			});
			res.status(201).json({
				success: true,
				data: prj,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: "The project can't be update",
				error: error,
			});
		}
	},
};

export default projectController;
