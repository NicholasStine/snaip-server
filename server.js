const express = require('express');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/userRoutes');

require('dotenv').config()
require('./db/psqlSetup')();

app.use(cors());
app.use(express.json());

app.use('', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`EXPRESS\t:::\t${process.env.PORT}`)
});