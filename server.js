//Requires the necessary modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const EmployeeRoute = require('./routes/employee')

//Establishes a connection to the MongoDB database
mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

//Establishes a connection to the MongoDB database
db.on('error', (err) => {
    console.log(err);
});
db.once('open', () => {
    console.log('Database Connection Established');
});

//Creates an Express application instance
const app = express();

//Configures middleware for the application
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Specifies the port for the server to listen on
const PORT = process.env.PORT || 3000;

//Starts the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.use('/api/employee', EmployeeRoute)