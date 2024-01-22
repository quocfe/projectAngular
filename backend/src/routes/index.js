import { authenticateToken } from '../middleware/authenticateToken.js';
import { isAdmin } from '../middleware/isAdmin.js';
import authRoutes from './auth.js';
import employeeRoutes from './employee.js';
import projectRoutes from './project.js';
import taskRoutes from './task.js';

function routes(app) {
	app.use(`${process.env.API}/task`, taskRoutes);
	app.use(`${process.env.API}/project`, authenticateToken, projectRoutes);
	app.use(`${process.env.API}/accounts`, authenticateToken, employeeRoutes);
	app.use(`${process.env.API}/auth`, authRoutes);
}

export default routes;
