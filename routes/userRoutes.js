const router = require('express').Router();
const jwt = require('jsonwebtoken');

const pool = require('../psqlConnection');

router.post('/', async (req, res) => {
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

router.post('/login', async (req, res) => {
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1 AND password = $2",
            [req.body.email, req.body.password]);
    
        if (user.rows.length > 0) {
            const token = jwt.sign({ email: user.rows[0].email, handle: user.rows[0].handle }, "secretsecret");

            return res.status(200).json({
                token: token,
                user_id: user.rows[0].id
            });
        }

        res.status(401).json("Sorry, Incorrect Username or Password");

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;