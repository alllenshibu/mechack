const pool = require("../utils/pg");

const getAllGoalsService = async (user) => {
  try {
    console.log("Getting all goals");
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [
      user,
    ]);

    if (userId?.rows?.length === 0) {
      throw new Error("User not found");
    }

    const result = await pool.query(
      `
                                            SELECT
                                                id,
                                                title,
                                                total_amount,
                                                completed_amount,
                                                target_date,
                                                priority
                                            FROM 
                                                goal
                                            WHERE goal.user_id = $1
                                        `,
      [userId?.rows[0]?.id]
    );

    // if (result?.rows?.length > 0) {
    //     return result?.rows;
    // } else {
    //     throw new Error('Something went wrong');
    // }
    return result?.rows;
  } catch (err) {
    throw new Error(err.message);
  }
};

// TODO: Add joins
const getGoalByIdService = async (user, goalId) => {
  try {
    console.log("Getting goals by id");
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [
      user,
    ]);

    if (userId?.rows?.length === 0) {
      throw new Error("User not found");
    }

    const result = await pool.query(
      "SELECT * FROM goal WHERE user_id = $1 AND id = $2",
      [userId?.rows[0]?.id, goalId]
    );
    if (result?.rows?.length > 0) {
      return result?.rows[0];
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const addNewGoalService = async (user, title, amount, targetDate, priority, completedAmount) => {
    try {
        console.log('Adding goal');
        const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new Error("User not found");
    }

        const result = await pool.query(
            'INSERT INTO goal (user_id, title, total_amount, target_date, priority, completed_amount) VALUES ($1, $2, $3, $4, $5,$6) RETURNING id',
            [userId?.rows[0]?.id, title, amount, targetDate, priority, completedAmount]);
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
  addNewGoalService,
};
