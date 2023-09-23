const pool = require('../utils/pg');

const getAllCategoriesService = async (user) => {
    try {
        console.log('Getting all categories');
        const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const result = await pool.query(`
                                            SELECT
                                                category.id,
                                                category.name as category,
                                                classification.name as classification
                                            FROM
                                                category 
                                            JOIN 
                                                classification ON category.classification_id = classification.id
                                        `);

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

module.exports = {
    getAllCategoriesService
}
