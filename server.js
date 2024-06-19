const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const fileupload = require('express-fileupload');
const path = require('path');

//Load ENV vars
dotenv.config({ path: './config/config.env' });
connectDB();

const user = require('./routes/auth');
const chores = require('./routes/chores');
const users = require('./routes/users');
const Grocery = require('./routes/Grocery');
const Request = require('./routes/request');
const app = express();

//Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
}
// File Uploading
app.use(fileupload());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//mount routers
app.use('/api/v1/auth', user);
app.use('/api/v1/user', users);
app.use('/api/v1/chores', chores);
app.use('/api/v1/grocery', Grocery);
app.use('/api/v1/request', Request);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold
  )
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`ERROR: ${err.message}`.red);
  server.close(() => process.exit(1));
});
