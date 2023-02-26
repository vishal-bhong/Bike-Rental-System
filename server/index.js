import Express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';

const app = Express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = 'mongodb://localhost:27017/Bike_Rental_System';

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));

