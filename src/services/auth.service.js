const pool = require('../utils/pg');

const signupService = async (name, email, password, dob) => {
    try {
        let user = await pool.query('SELECT * FROM "user" WHERE email = $1', [email]);

        if (user?.rows?.length > 0) {
            throw new Error('User already exists');
        }

        console.log('Creating user');
        const result = await pool.query('INSERT INTO "user" (name, email, password, dob) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, password, dob]);

        if (result?.rows?.length > 0) {
            return result?.rows[0]?.id;
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}

const loginService = async (email, password) => {
    try {
        let user = await pool.query('SELECT * FROM "user" WHERE email = $1', [email]);
        if (user?.rows?.length === 0) {
            throw new Error('User does not exist');
        }

        if (user?.rows?.length > 0 && user.rows[0].password !== password) {
            throw new Error('Wrong password');
        }

        return user?.rows[0]?.id;
    } catch (err) {
        console.log(err);
        throw new Error(err.message)
    }
}

module.exports = {
    signupService,
    loginService,
}
