const express = require('express');

const { authorize } = require('./middlewares/auth.middleware');
const { signupController, loginController } = require('./controllers/auth.controller');
const { getAllExpensesController, addNewExpenseController, getExpenseByIdController } = require('./controllers/expense.controller');
const { chatWithBroController } = require('./controllers/bro.controller');
const { getAllGoalsContoller, getGoalByIdController, addNewGoalController } = require('./controllers/goal.controller');
const { getAllIncomesController, getIncomeByIdController, addNewIncomeController } = require('./controllers/income.controller');
const { getAllCategoriesController } = require('./controllers/category.controller');
const { getStatsController } = require('./controllers/stats.controller');
const { getUserDetailsByIdController } = require('./controllers/user.controller');
const { getUrgeCategoryController } = require('./controllers/urge.controller');
const { bigBrainIdeaService } = require('./services/stats.service');
const { queryHuggingFaceAPI } = require('./services/urge.service');

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

// Income routes
router.get("/income", authorize, (req, res) => {
    getAllIncomesController(req, res);
});

router.get("/income/:id", authorize, (req, res) => {
    getIncomeByIdController(req, res);
});

router.post("/income", authorize, (req, res) => {
    addNewIncomeController(req, res);
});

// Category routes
router.get("/category", authorize, (req, res) => {
    getAllCategoriesController(req, res);
});

// Stats routes
router.get("/stats", authorize, (req, res) => {
    getStatsController(req, res);
})

// User routes
router.get("/user", authorize, (req, res) => {
    getUserDetailsByIdController(req, res);
});

// Bro routes
router.post("/bro", authorize, (req, res) => {
    chatWithBroController(req, res);
})

//sql routes
router.post("/urge", authorize, (req, res) => {
    queryHuggingFaceAPI(req, res);
});

// Big brain routes
router.post("/bigbrain", authorize, async (req, res) => {
    await bigBrainIdeaService(req?.user)
    res.send("Big brain");
});

module.exports = router;
