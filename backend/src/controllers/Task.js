import Task from '../models/task.js';
import Employee from '../models/employee.js';
import employee from '../models/employee.js';

const TaskController = {
	save: async (req, res, next) => {
		let task = new Task();

		task.taskName = req.body.taskName;
		task.description = req.body.description;
		task.project = req.body.project;
		task.employee = req.body.employee;
		task.priority = req.body.priority;
		task.status = req.body.status;
		task.startDate = req.body.startDate;
		task.endDate = req.body.endDate;

		try {
			await task.save();
			res.status(201).json({
				success: true,
				data: task,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: "The task can't be created",
				error: error,
			});
		}
	},
	find: async (req, res, next) => {
		try {
			const taskList = await Task.find();
			res.status(200).json({
				message: 'find success',
				data: taskList,
			});
		} catch (error) {
			res.status(500).json({
				message: 'find faild',
				error: error,
			});
		}
	},

	findWithNameEmployee: async (req, res, next) => {
		try {
			const tasks = await Task.find().populate('employee').populate('project');
			const taskList = tasks.map((task) => ({
				...task.toObject(),
				employee: task.employee?.name,
				project: task.project?.name,
			}));

			res.status(200).json({
				message: 'find success',
				data: taskList,
			});
		} catch (error) {
			res.status(500).json({
				message: 'find failed',
				error: error,
			});
		}
	},

	findwithProjectEmployee: async (req, res, next) => {
		try {
			const tasks = await Task.find().populate('employee').populate('project');
			const taskList = tasks.map((task) => ({
				...task.toObject(),
				employee: task.employee,
				project: task.project,
			}));

			res.status(200).json({
				message: 'find success',
				data: taskList,
			});
		} catch (error) {
			res.status(500).json({
				message: 'find failed',
				error: error,
			});
		}
	},

	findByIDEmployee: async (req, res, next) => {
		try {
			const { id } = req.params;

			const employee = await Employee.findById(id).select('-password');

			if (!employee) {
				return res.status(404).json({
					message: 'Employee not found',
				});
			}

			const tasks = await Task.find({ employee: id });

			res.status(200).json({
				message: 'Find success',
				data: tasks,
			});
		} catch (error) {
			res.status(500).json({
				message: 'Error finding employee tasks',
				error: error.message,
			});
		}
	},
	findOne: async (req, res, next) => {
		try {
			const task = await Task.findById(req.params.id);
			res.status(200).json({
				message: 'find success',
				data: task,
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
			await Task.deleteOne({ _id: _id });
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

		const task = {
			taskName: req.body.taskName,
			description: req.body.description,
			project: req.body.project,
			employee: req.body.employee,
			assignedTo: req.body.assignedTo,
			priority: req.body.priority,
			status: req.body.status,
			startDate: req.body.startDate,
			endDate: req.body.endDate,
		};

		try {
			const updatedTask = await Task.findByIdAndUpdate(_id, task, {
				new: true,
			});

			if (!updatedTask) {
				return res.status(404).json({
					success: false,
					message: 'Task not found',
				});
			}

			res.status(201).json({
				success: true,
				data: updatedTask,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: "The task can't be updated",
				error: error,
			});
		}
	},
};

export default TaskController;
