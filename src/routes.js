const express = require('express');

const { authorize } = require('./middlewares/auth.middleware');
const { signupController, loginController } = require('./controllers/auth.controller');
const { getAllExpensesController, addNewExpenseController, getExpenseByIdController } = require('./controllers/expense.controller');
const { chatWithBroController } = require('./controllers/bro.controller');
const { getAllGoalsContoller, getGoalByIdController, addNewGoalController } = require('./controllers/goal.controller');

const router = express.Router();

// Authentication routes
router.post("/auth/signup", async (req, res) => {
    signupController(req, res);
});

router.post("/auth/login", async (req, res) => {
    loginController(req, res);
});


// Expense routes
router.get("/expense", authorize, (req, res) => {
    getAllExpensesController(req, res);
});

router.get("/expense/:id", authorize, (req, res) => {
    getExpenseByIdController(req, res);
});

router.post("/expense", authorize, (req, res) => {
    addNewExpenseController(req, res);
});

// Expense routes
router.get("/goal", authorize, (req, res) => {
    getAllGoalsContoller(req, res);
});

router.get("/goal/:id", authorize, (req, res) => {
    getGoalByIdController(req, res);
});

router.post("/goal", authorize, (req, res) => {
    addNewGoalController(req, res);
});

// Bro routes
router.post("/bro", authorize, (req, res) => {
    chatWithBroController(req, res);
});

module.exports = router;
