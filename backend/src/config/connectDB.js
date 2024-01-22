import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = {
	connect: async () => {
		try {
			await mongoose.connect(process.env.DB_CONNECT_URL);
			console.log('Database connected');
		} catch (err) {
			console.error('Database disconnect', err);
		}
	},
};
