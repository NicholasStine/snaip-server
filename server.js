const express = require('express');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');

require('dotenv').config()
require('./db/psqlSetup')();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/file', fileRoutes);

app.listen(process.env.PORT, () => {
    console.log(`EXPRESS\t:::\t${process.env.PORT}`)
});