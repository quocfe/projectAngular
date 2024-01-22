import Employee from '../models/employee.js';
import bcrypt from 'bcryptjs';
import { jwtDecode } from 'jwt-decode';

const employeeController = {
	save: async (req, res, next) => {
		let employee = new Employee();

		employee.name = req.body.name;
		employee.email = req.body.email;
		employee.password = bcrypt.hashSync(req.body.password);
		employee.zone = req.body.zone;
		employee.role = req.body.role;
		employee.phone = req.body.phone;
		employee.image = employee.gravatar();
		employee.status = req.body.status;
		try {
			await employee.save();
			res.status(201).json({
				success: true,
				employee: employee,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: "The employee can't be created",
				error: error,
			});
		}
	},
	find: async (req, res, next) => {
		try {
			const employeesList = await Employee.find().select('-password');
			res.status(200).json({
				message: 'find success',
				employees: employeesList,
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
			const employee = await Employee.findById(req.params.id).select(
				'-password'
			);
			res.status(200).json({
				message: 'find success',
				employee: employee,
			});
		} catch (error) {
			res.status(500).json({
				message: 'find faild',
				error: error,
			});
		}
	},
	update: async (req, res, next) => {
		const _id = req.params.id;
		const employeeExit = await Employee.findById(_id);
		if (!employeeExit)
			return res.status(500).json({
				success: false,
				message: 'No employee existed',
			});

		let newPassword = req.body.password
			? bcrypt.hashSync(req.body.password)
			: employeeExit.password;

		let employee = {
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
			zone: req.body.zone,
			role: req.body.role,
			phone: req.body.phone,
			status: req.body.status,
		};

		try {
			const emp = await Employee.findByIdAndUpdate(_id, employee, {
				new: true,
			});
			res.status(201).json({
				success: true,
				message: 'update success',
				employee: emp,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				message: 'update false',
				error: error,
			});
		}
	},
	delete: async (req, res, next) => {
		const _id = req.params.id;
		try {
			await Employee.deleteOne({ _id: _id });
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
	profileUser: async (req, res, next) => {
		try {
			const token = req.headers.authorization.split(' ')[1];
			if (!token) return res.status(401).json({ message: 'token invalid' });
			const { employeeId } = jwtDecode(token);
			const employee = await Employee.findById(employeeId).select(
				'-password, -refreshToken'
			);
			if (!employee) {
				return res.status(404).json({
					success: false,
					message: 'Employee not found',
				});
			}
			res.status(200).json({
				success: true,
				employee: employee,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				error: error,
			});
		}
	},
};

export default employeeController;
