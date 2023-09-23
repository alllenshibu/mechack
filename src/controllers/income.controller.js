const { getAllExpensesService, addNewExpenseService, getExpenseByIdService } = require('../services/expense.service');
const { getIncomeByIdService, addNewIncomeService } = require('../services/income.service');

const getAllIncomesController = async (req, res) => {
    const user = req?.user;

    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }

    try {
        result = await getAllIncomesController(user);
        if (result) {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const getIncomeByIdController = async (req, res) => {
    const user = req?.user;
    const incomeId = req?.params?.id;

    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }
    if (!incomeId || incomeId === '' || incomeId === undefined) {
        return res.status(400).send('Income Id is required');
    }

    try {
        result = await getIncomeByIdService(user, incomeId);
        if (result) {
            console.log(result);
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const addNewIncomeController = async (req, res) => {
    const user = req?.user;
    const title = req?.body?.expense?.title;
    const amount = req?.body?.expense?.amount;
    const timestamp = req?.body?.expense?.timestamp;

    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }
    if (!title || title === '' || title === undefined) {
        return res.status(400).send('Title is required');
    }
    if (!amount || amount === '' || amount === undefined) {
        return res.status(400).send('Amount is required');
    }
    if (!timestamp || timestamp === '' || timestamp === undefined) {
        return res.status(400).send('Timestamp is required');
    }


    try {
        result = await addNewIncomeService(user, title, amount, timestamp);

        if (result) {

            res.status(200).send(result);
        }
    } catch (err) {

        res.status(400).send(err.message);
    }
}


module.exports = {
    getAllIncomesController,
    getIncomeByIdController,
    addNewIncomeController
}
