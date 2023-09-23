const express = require('express');

const { authorize } = require('./middlewares/auth.middleware');
const { signupController, loginController } = require('./controllers/auth.controller');
const { getAllExpensesController, addNewExpenseController, getExpenseByIdController } = require('./controllers/expense.controller');

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

module.exports = router;
