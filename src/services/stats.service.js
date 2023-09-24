const { response } = require("express");
const pool = require("../utils/pg");
const { getAllGoalsService } = require("./goal.service");
const { addNewExpenseService } = require("./expense.service");
const { getAllGoalsContoller } = require("../controllers/goal.controller");
const getStatsService = async (user) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [
      user,
    ]);

    if (userId?.rows?.length === 0) {
      throw new Error("User not found");
    }

    let responseData = {};

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;

    const currentYear = currentDate.getFullYear();

    console.log({ currentMonth, currentYear });

    // Income for the month
    let result = await pool.query(
      `
                                            SELECT 
                                                SUM(amount) 
                                            FROM
                                                income
                                            WHERE
                                                user_id = $1
                                                AND EXTRACT(MONTH FROM date) = $2 
                                                AND EXTRACT(YEAR FROM date) = $3
                                        `,
      [userId?.rows[0]?.id, currentMonth, currentYear]
    );

    responseData = { ...responseData, totalIncome: result?.rows[0]?.sum };

    // Expense for the month
    result = await pool.query(
      `
                                            SELECT 
                                                SUM(amount) 
                                            FROM
                                                expense
                                            WHERE
                                                user_id = $1
                                                AND EXTRACT(MONTH FROM timestamp) = $2 
                                                AND EXTRACT(YEAR FROM timestamp) = $3
                                        `,
      [userId?.rows[0]?.id, currentMonth, currentYear]
    );

    responseData = { ...responseData, totalExpense: result?.rows[0]?.sum };

    // Needs expense for the month
    result = await pool.query(
      `
                                            SELECT 
                                                SUM(amount) 
                                            FROM
                                                expense
                                            JOIN
                                                category ON category.id = expense.category_id
                                            JOIN 
                                                classification ON classification.id = category.classification_id
                                            WHERE
                                                user_id = $1
                                                AND classification.name = 'needs'
                                                AND EXTRACT(MONTH FROM expense.timestamp) = $2 
                                                AND EXTRACT(YEAR FROM expense.timestamp) = $3
                                        `,
      [userId?.rows[0]?.id, currentMonth, currentYear]
    );

    responseData = { ...responseData, totalNeedsExpense: result?.rows[0]?.sum };

    // Wants expense for the month
    result = await pool.query(
      `
                                            SELECT 
                                                SUM(amount) 
                                            FROM
                                                expense
                                            JOIN
                                                category ON category.id = expense.category_id
                                            JOIN 
                                                classification ON classification.id = category.classification_id
                                            WHERE
                                                user_id = $1
                                                AND classification.name = 'wants'
                                                AND EXTRACT(MONTH FROM expense.timestamp) = $2 
                                                AND EXTRACT(YEAR FROM expense.timestamp) = $3
                                        `,
      [userId?.rows[0]?.id, currentMonth, currentYear]
    );

    responseData = { ...responseData, totalWantsExpense: result?.rows[0]?.sum };

    // Savings expense for the month
    result = await pool.query(
      `
                                            SELECT 
                                                SUM(amount) 
                                            FROM
                                                expense
                                            JOIN
                                                category ON category.id = expense.category_id
                                            JOIN 
                                                classification ON classification.id = category.classification_id
                                            WHERE
                                                user_id = $1
                                                AND classification.name = 'savings'
                                                AND EXTRACT(MONTH FROM expense.timestamp) = $2 
                                                AND EXTRACT(YEAR FROM expense.timestamp) = $3
                                        `,
      [userId?.rows[0]?.id, currentMonth, currentYear]
    );

    responseData = {
      ...responseData,
      totalSavingsExpense: result?.rows[0]?.sum,
    };

    responseData = {
      ...responseData,
      totalBalance: responseData?.totalIncome - responseData?.totalExpense,
    };
    //console.log(responseData)
    // TODO: algo  ivide
    const goals = await getAllGoalsService(user);
    //console.log(goals)
    const fixedSavingsPerMonth = responseData.totalIncome / 20;
    //console.log(fixedSavingsPerMonth)
    function calculateSavingsAllocation(
      goals,
      currentDate,
      fixedSavingsPerMonth
    ) {
      const result = [];

      for (const goal of goals) {
        const targetDate = goal.target_date
        const amount = goal.total_amount;
        const completed_amount = goal.completed_amount;

        // Calculate months remaining
        //console.log(targetDate - currentDate)
        const monthsRemaining =
          (targetDate - currentDate) / (30 * 24 * 60 * 60 * 1000);
        //console.log(monthsRemaining)
        // Calculate monthly savings required
        const monthlySavingsRequired =
          (amount - completed_amount)  / monthsRemaining;
        //console.log(monthlySavingsRequired)
        // Check if the goal is achievable
        const achievable = monthlySavingsRequired <= (fixedSavingsPerMonth);

        // Calculate the percentage of savings allocation
        let percentageOfSavings = 0; // Initialize as 0
        if (achievable) {
          percentageOfSavings =
            (monthlySavingsRequired / fixedSavingsPerMonth) * 100;
          if (percentageOfSavings > 100) {
            percentageOfSavings = 100; // Cap at 100% if it exceeds
          }
        }

        result.push({
          percentageOfSavings: percentageOfSavings.toFixed(2),
          achievableOrNot: achievable ? "Yes" : "No",
        });
      }

      return result;
    }

    // Example usage with a larger set of data

    const res = calculateSavingsAllocation(
      goals,
      currentDate,
      fixedSavingsPerMonth
    );
        //console.log(res)
    return [res,responseData];
  } catch (err) {
    throw new Error(err.message);
  }
};

const bigBrainIdeaService = async (user) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [
    user,
  ]);

  if (userId?.rows?.length === 0) {
    throw new Error("User not found");
  }

  result = await pool.query(
    `
                                SELECT * 
                                FROM monthly_stats 
                                WHERE user_id = $1 
                                AND month = $2 
                                AND year = $3
                            `,
    [userId?.rows[0]?.id, currentMonth, currentYear]
  );

  if (result?.rows?.length === 0) {
    const stats = await getStatsService(user);
    const { totalBalance } = stats;

    let goals = await getAllGoalsService(user);

    let totalRemainingGoalAmount = 0;
    let numberOfGoals = 0;
    for (let goal of goals) {
      if (goal?.completed_amount >= goal?.total_amount) {
        goals = goals.filter((g) => g?.id !== goal?.id);
      }
      const remaining = goal?.total_amount - goal?.completed_amount;
      totalRemainingGoalAmount += remaining;
      numberOfGoals++;
      goal = { ...goal, remaining };
      goals = [...goals, goal];
    }

    const amountAssignedToGoals =
      parseFloat(totalBalance) - parseFloat(totalRemainingGoalAmount);
    const amountAssignedPerGoal = amountAssignedToGoals / numberOfGoals;

    //console.log({ goals });

    for (let goal of goals) {
      let completed_amount = parseFloat(goal?.completed_amount);
      completed_amount += parseFloat(amountAssignedPerGoal);

      console.log({ completed_amount, amountAssignedPerGoal });

      goal = { ...goal, completed_amount };
      let result = await pool.query(
        `UPDATE goal SET completed_amount = $1 WHERE id = $2`,
        [goal?.completed_amount, goal?.id]
      );
      if (result?.rowCount === 0) {
        throw new Error("Failed to update goal");
      }
      result = await addNewExpenseService(
        user,
        "Loan",
        `Saving towards ${goal.title}`,
        amountAssignedPerGoal,
        new Date().toISOString(),
        0
      );
      if (result?.rowCount === 0) {
        throw new Error("Failed to add expense for saving");
      }
    }

    result = await pool.query(
      `INSERT INTO monthly_stats (user_id, month, year, towards_goal) VALUES ($1, $2, $3, $4)`,
      [userId?.rows[0]?.id, currentMonth, currentYear, amountAssignedToGoals]
    );
  }
};

module.exports = {
  getStatsService,
  bigBrainIdeaService,
};
