import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/connectDB.js';
import routes from './routes/index.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

connectDB.connect();

// static file
app.use(express.static(path.join(__dirname, 'public')));
//

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('dev'));

// routes
routes(app);
//

app.listen(3000, () => {
	console.log(`App listen port http://localhost:${3000}`);
});
