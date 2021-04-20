const express = require('express');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');

require('dotenv').config()
require('./db/psqlSetup')();

app.use(cors({
    "Access-Control-Allow-Origin": "https://snaip-client.herokuapp.com"
}));
app.use(express.json());

app.use('/user', userRoutes);
app.use('/file', fileRoutes);

app.listen(process.env.PORT, () => {
    console.log(`EXPRESS\t:::\t${process.env.PORT}`)
});