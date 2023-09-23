const pool = require('../utils/pg');

const getAllExpensesService = async (user) => {
    try {
        console.log('Getting all expenses');
        const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const result = await pool.query(`
                                            SELECT
                                                expense.id,
                                                expense.title,
                                                expense.amount,
                                                expense.timestamp,
                                                expense.freq_per_year,
                                                category.name as category,
                                                classification.name as classification
                                            FROM 
                                                expense
                                            JOIN 
                                                category ON 
                                                    expense.category_id = category.id 
                                            JOIN 
                                                classification ON category.classification_id = classification.id
                                            WHERE expense.user_id = $1
                                        `, [userId?.rows[0]?.id]);

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


const getAllExpensesByMonthService = async (user, month) => {
    try {
        console.log('Getting all expenses by month');
        const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const result = await pool.query(`
                                            SELECT
                                                expense.id,
                                                expense.title,
                                                expense.amount,
                                                expense.timestamp,
                                                expense.freq_per_year,
                                                category.name as category,
                                                classification.name as classification
                                            FROM 
                                                expense
                                            JOIN 
                                                category ON 
                                                    expense.category_id = category.id 
                                            JOIN 
                                                classification ON category.classification_id = classification.id
                                            WHERE 
                                                expense.user_id = $1 AND EXTRACT(MONTH FROM timestamp) = $2
                                        `, [userId?.rows[0]?.id, month]);

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


const getAllExpensesByYearService = async (user, year) => {
    try {
        console.log('Getting all expenses by month');
        const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const result = await pool.query(`
                                            SELECT
                                                expense.id,
                                                expense.title,
                                                expense.amount,
                                                expense.timestamp,
                                                expense.freq_per_year,
                                                category.name as category,
                                                classification.name as classification
                                            FROM 
                                                expense
                                            JOIN 
                                                category ON 
                                                    expense.category_id = category.id 
                                            JOIN 
                                                classification ON category.classification_id = classification.id
                                            WHERE 
                                                expense.user_id = $1 AND EXTRACT(YEAR FROM timestamp) = $2
                                        `, [userId?.rows[0]?.id, year]);

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


const getAllExpensesByMonthAndYearService = async (user, month, year) => {
    try {
        console.log('Getting all expenses by month');
        const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const result = await pool.query(`
                                            SELECT
                                                expense.id,
                                                expense.title,
                                                expense.amount,
                                                expense.timestamp,
                                                category.name as category,
                                                classification.name as classification
                                            FROM 
                                                expense
                                            JOIN 
                                                category ON 
                                                    expense.category_id = category.id 
                                            JOIN 
                                                classification ON category.classification_id = classification.id
                                            WHERE 
                                                expense.user_id = $1 AND EXTRACT(YEAR FROM timestamp) = $2 AND EXTRACT(MONTH FROM timestamp) = $3
                                        `, [userId?.rows[0]?.id, year, month]);

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

const getExpenseByIdService = async (user, expenseId) => {
    try {
        console.log('Getting expenses by id');
        const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const result = await pool.query('SELECT * FROM expense WHERE user_id = $1 AND id = $2', [userId?.rows[0]?.id, expenseId]);
        if (result?.rows?.length > 0) {
            return result?.rows[0];
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {
        throw new Error(err.message);
    }
}


const addNewExpenseService = async (user, category, title, amount, timestamp, freq_per_year) => {
    try {
        console.log('Adding expense');
        const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        let categoryId = await pool.query('SELECT id FROM category WHERE name = $1', [category]);

        if (categoryId?.rows?.length === 0) {
            categoryId = await pool.query(`SELECT id FROM category WHERE name = 'Other'`)
        }

        const result = await pool.query('INSERT INTO expense (title, amount, timestamp, user_id, category_id, freq_per_year) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [title, amount, timestamp, userId?.rows[0]?.id, categoryId?.rows[0]?.id, freq_per_year]);
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
    getAllExpensesService,
    getAllExpensesByMonthService,
    getAllExpensesByYearService,
    getAllExpensesByMonthAndYearService,
    getExpenseByIdService,
    addNewExpenseService,
}
