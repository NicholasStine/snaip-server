const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config()
require('./db/psqlSetup')();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`EXPRESS\t:::\t${process.env.PORT}`)
});