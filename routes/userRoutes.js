const router = require('express').Router();
const jwt = require('jsonwebtoken');

const pool = require('../psqlConnection');

router.post('/', async (req, res) => {
    // Run the code for this post route
    try {
        // Split up the "request.body" into it's separate variables
        const {
            email,
            password,
            handle
        } = req.body;

        console.log("New Account with credentials: ");
        console.log(email, password, handle);

        // Put that info into the database
        await pool.query("INSERT INTO users (password, email, handle) VALUES ($1, $2, $3)",
            [password, email, handle]);

        // Return a successful 200 message
        res.status(200).json("User Created");
    // If any of the above code throws an error, handle it
    } catch (err) {
        console.log(err);
        // Return a 500 internal error
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    // Run the code for this post route
    try {
        // Print the login credentials to the console
        console.log('loggin attempt from: ', req.body.email, '\nWith Password: ', req.body.password);

        // Check the database for updates
        const user = await pool.query("SELECT * FROM users WHERE email = $1 AND password = $2",
            [req.body.email, req.body.password]);
    
        if (user.rows.length > 0) {
            console.log('Login Successful!')
            const token = jwt.sign({ email: user.rows[0].email, handle: user.rows[0].handle }, "secretsecret");

            // Return a successful 200 message
            return res.status(200).json({
                token: token,
                user_id: user.rows[0].id
            });
        } else {
            console.log('Invalid Login');
            // Return a 401 login invalid (unauthorized) error
            return res.status(401).json("Sorry, Incorrect Username or Password");
        }
    // If any of the above code throws an error, handle it
    } catch (err) {
        console.log(err);
        // Return a 500 internal error
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    const { throw_err, email } = req.body;

    if (throw_err) {
        return res.status(500).json('OH NO, AN ERROR!!!');
    } else {
        // Get the handle from the database from a row with the email from the get request
        const databaseResponse = await pool.query("SELECT handle FROM users WHERE email = $1",
            [email]);
        
        // If there's a handle in the database associated with that email:
        if (databaseResponse.rows.length > 0) {
            return res.status(200).json({ handle: databaseResponse.rows[0].handle })
        } else {
            return res.status(401).json("Whoops! No handle associated with that email");
        }
    }
})

module.exports = router;