import generateToken from '../helpers/generateToken.js';
import Employee from '../models/employee.js';
import bcrypt from 'bcryptjs';
import { jwtDecode } from 'jwt-decode';

const authController = {
	login: async (req, res, next) => {
		try {
			const employee = await Employee.findOne({ email: req.body.email });

			if (employee.status === 'Resigned') {
				return res.status(403).json({
					success: false,
					message: 'Từ chối truy cập!',
				});
			}

			if (!employee) {
				return res.status(404).json({
					success: false,
					message: 'Employee not found',
				});
			}

			if (
				employee &&
				bcrypt.compareSync(req.body.password, employee.password)
			) {
				const asscessToken = generateToken.accessToken(employee);
				const refreshToken = generateToken.refreshToken(employee);
				const decoded = jwtDecode(refreshToken);
				const { employeeId } = decoded;
				await Employee.findByIdAndUpdate(employeeId, {
					refreshToken: refreshToken,
				});
				res.status(201).json({
					success: true,
					employee: employee,
					token: {
						accessToken: asscessToken,
						refreshToken: refreshToken,
					},
				});
			} else {
				return res.status(401).json({
					success: false,
					message: 'Password invalid',
				});
			}
		} catch (error) {
			return res.status(500).json({
				success: false,
				error: error,
			});
		}
	},
	refreshToken: async (req, res) => {
		const refreshToken = req.body.refreshToken;

		if (!refreshToken) return res.status(401).json("You're not authenticated");
		const decoded = jwtDecode(refreshToken);
		const { employeeId } = decoded;
		const employee = await Employee.findById(employeeId);

		if (employee.refreshToken != refreshToken) {
			return res.status(403).json('Refresh token is not valid');
		}

		const newAccessToken = generateToken.accessToken(employee);

		res.status(200).json({
			accessToken: newAccessToken,
		});
	},
};

export default authController;
