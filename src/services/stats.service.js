const pool = require('../utils/pg');

const getStatsService = async (user) => {
    try {

        const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }


        const query = {
            text: `SELECT 
                        SUM(amount) 
                    FROM
                        expense
                    WHERE
                        user_id = $1
                        AND EXTRACT(MONTH FROM expense.timestamp) = 9 
                        AND EXTRACT(YEAR FROM expense.timestamp) = 2023
            `,
            values: [userId?.rows[0]?.id]
        };

        const result = await pool.query(query);

        return result?.rows;
    } catch (err) {
        throw new Error(err.message);
    }
}


module.exports = {
    getStatsService
}
