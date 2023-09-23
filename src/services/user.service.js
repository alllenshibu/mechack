const pool = require('../utils/pg');

const getUserDetailsByIdService = async (user) => {
    try {
        console.log('Getting user by id');
        const result = await pool.query('SELECT * FROM "user" WHERE email = $1', [user]);

        if (result?.rows?.length === 0) {
            throw new Error('User not found');
        }

        return result?.rows?.[0];
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    getUserDetailsByIdService
}
