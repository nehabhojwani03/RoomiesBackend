const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

//Load ENV vars
dotenv.config({ path : './config/config.env' });
connectDB();


const user = require('./routes/auth');
const chores= require('./routes/chores');
const Grocery= require('./routes/Grocery');

const errorHandler = require('./middleware/error');

const app= express();
app.use(express.json());

if(process.env.NODE_ENV = "development"){
    app.use(morgan("dev"));
}

//mount routers
app.use('/api/v1/auth',user);
app.use('/api/v1/chores', chores);
app.use('/api/v1/grocery', Grocery);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server= app.listen(PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold));
    
process.on('unhandledRejection' , (err, promise) =>{
    console.log(`ERROR: ${err.message}`.red);
    server.close(() => process.exit(1));
});