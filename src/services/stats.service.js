const { response } = require('express');
const pool = require('../utils/pg');

const getStatsService = async (user) => {
    try {

        const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        let responseData = {}

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;

        const currentYear = currentDate.getFullYear();

        console.log({ currentMonth, currentYear })

        // Income for the month
        let result = await pool.query(`
                                            SELECT 
                                                SUM(amount) 
                                            FROM
                                                income
                                            WHERE
                                                user_id = $1
                                                AND EXTRACT(MONTH FROM date) = $2 
                                                AND EXTRACT(YEAR FROM date) = $3
                                        `, [userId?.rows[0]?.id, currentMonth, currentYear]);

        responseData = { ...responseData, totalIncome: result?.rows[0]?.sum }

        // Income for the month
        result = await pool.query(`
                                            SELECT 
                                                SUM(amount) 
                                            FROM
                                                expense
                                            WHERE
                                                user_id = $1
                                                AND EXTRACT(MONTH FROM timestamp) = $2 
                                                AND EXTRACT(YEAR FROM timestamp) = $3
                                        `, [userId?.rows[0]?.id, currentMonth, currentYear]);

        responseData = { ...responseData, totalExpense: result?.rows[0]?.sum }

        responseData = { ...responseData, totalBalance: responseData?.totalIncome - responseData?.totalExpense }

        return responseData;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    getStatsService
}
