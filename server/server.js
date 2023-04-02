import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connect from './config/db.js';
import cors from 'cors';
import locationRoutes from './routes/locationRoutes.js';
import deviceRoutes from './routes/deviceRoutes.js';


//-------DOTENV------>
dotenv.config();


const app = express();


//-----MIDDLEWARE--------->
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//-----ROUTES--------->
app.use('/api/v1/location', locationRoutes);
app.use('/api/v1/device', deviceRoutes);


//-----LISTEN & PORT--------->
const port = process.env.PORT || 5000;
app.listen(port, () => {
    connect();
    console.log(`Server is running ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgYellow.black);
});