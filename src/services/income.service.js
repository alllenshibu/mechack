const pool = require('../utils/pg');

const getAllIncomesService = async (user) => {
    try {
        console.log('Getting all incomes');
        const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const result = await pool.query('SELECT * FROM income WHERE user_id = $1', [userId?.rows[0]?.id]);

        // if (result?.rows?.length > 0) {
        //     return result?.rows;
        // } else {
        //     throw new Error('Something went wrong');
        // }
        return result?.rows;
    } catch (err) {
        throw new Error(err.message);
    }
}


const getIncomeByIdService = async (user, incomeId) => {
    try {
        console.log('Getting income by id');
        const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const result = await pool.query('SELECT * FROM income WHERE user_id = $1 AND id = $2', [userId?.rows[0]?.id, incomeId]);
        if (result?.rows?.length > 0) {
            return result?.rows[0];
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {
        throw new Error(err.message);
    }
}


const addNewIncomeService = async (user, title, amount, timestamp) => {
    try {
        console.log('Adding expense');
        const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const result = await pool.query('INSERT INTO income (user_id, title, amount, timestamp) VALUES ($1, $2, $3, $4) RETURNING id', [userId?.rows[0]?.id, title, amount, timestamp]);
        if (result?.rows?.length > 0) {
            return result?.rows[0]?.id;
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {

        throw new Error(err.message);
    }
}

module.exports = {
    getAllIncomesService,
    getIncomeByIdService,
    addNewIncomeService
}
