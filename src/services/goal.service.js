const pool = require('../utils/pg');

const getAllGoalsService = async (user) => {
    try {
        console.log('Getting all goals');
        const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }


        const result = await pool.query(`
                                            SELECT
                                                goal.id,
                                                goal.title,
                                                goal.total_amount,
                                                goal.completed_amount,
                                                category.name as category,
                                                classification.name as classification
                                            FROM 
                                                goal
                                            JOIN 
                                                category ON 
                                                    goal.category_id = category.id 
                                            JOIN 
                                                classification ON category.classification_id = classification.id
                                            WHERE goal.user_id = $1
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


const getGoalByIdService = async (user, goalId) => {
    try {
        console.log('Getting goals by id');
        const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const result = await pool.query('SELECT * FROM goal WHERE user_id = $1 AND id = $2', [userId?.rows[0]?.id, goalId]);
        if (result?.rows?.length > 0) {
            return result?.rows[0];
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {
        throw new Error(err.message);
    }
}


const addNewGoalService = async (user, category, title, amount, dueDate) => {
    try {
        console.log('Adding goal');
        const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        let categoryId = await pool.query('SELECT id FROM category WHERE name = $1', [category]);

        if (categoryId?.rows?.length === 0) {
            categoryId = await pool.query(`SELECT id FROM category WHERE name = 'Other'`)
        }

        const result = await pool.query(
            'INSERT INTO goal (user_id, category_id, title, total_amount, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [userId?.rows[0]?.id, categoryId?.rows[0]?.id, title, amount, dueDate]);
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
    getAllGoalsService,
    getGoalByIdService,
    addNewGoalService
}
