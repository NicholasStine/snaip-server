const router = require('express').Router();

const pool = require('../psqlConnection');

router.post('/user', async (req, res) => {
    const {
        email,
        password,
        handle
    } = req.body;

    console.log(req.body);

    console.log(email, password, handle);

    await pool.query("INSERT INTO users (password, email, handle) VALUES ($1, $2, $3)",
        [password, email, handle]);

    res.status(200).json("User Created");
});

module.exports = router;