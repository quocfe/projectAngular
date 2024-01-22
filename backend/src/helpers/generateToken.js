import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const generateToken = {
	accessToken: (employee) => {
		return jwt.sign(
			{ employeeId: employee._id, role: employee.role },
			process.env.ACCESSTOKEN_SECRET,
			{
				expiresIn: '1d',
			}
		);
	},

	refreshToken: (employee) => {
		return jwt.sign(
			{ employeeId: employee._id, role: employee.role },
			process.env.REFRESHTOKEN_SECRET,
			{ expiresIn: '30d' }
		);
	},
};

export default generateToken;
