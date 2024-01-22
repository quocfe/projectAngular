import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authenticateToken = (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.split(' ')[0] === 'Bearer'
	) {
		const accessToken = req.headers.authorization.split(' ')[1];
		jwt.verify(accessToken, process.env.ACCESSTOKEN_SECRET, (err, payload) => {
			if (err) return res.status(403).json('token is not valid');
			req.payload = payload;
			next();
		});
	} else {
		res.status(401).json('You are not authenticated');
	}
};
