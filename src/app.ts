import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json';

const userRoutes= require('./Routes/userRoutes')
const taskRoutes = require('./Routes/taskRoutes')

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/api', userRoutes);
app.use('/api',taskRoutes)

export default app;
