const {
    getAllExpensesService,
    getAllExpensesByMonthService,
    getAllExpensesByYearService,
    getAllExpensesByMonthAndYearService,
    addNewExpenseService,
    getExpenseByIdService
} = require('../services/expense.service');

const getAllExpensesController = async (req, res) => {
    const user = req?.user;

    const month = req?.query?.month;
    const year = req?.query?.year;

    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }

    try {
        if (month) {
            result = await getAllExpensesByMonthService(user, month);
        } else if (year) {
            result = await getAllExpensesByYearService(user, year);
        } else if (month && year) {
            result = await getAllExpensesByMonthAndYearService(user, month, year);
        } else {
            result = await getAllExpensesService(user);
        }

        if (result) {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const getExpenseByIdController = async (req, res) => {
    const user = req?.user;
    const expenseId = req?.params?.id;

    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }

    if (!expenseId || expenseId === '' || expenseId === undefined) {
        return res.status(400).send('Expense Id is required');
    }

    try {
        result = await getExpenseByIdService(user, expenseId);
        if (result) {
            console.log(result);
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const addNewExpenseController = async (req, res) => {
    const user = req?.user;
    const category = req?.body?.expense?.category;
    const title = req?.body?.expense?.title;
    const amount = req?.body?.expense?.amount;
    const timestamp = req?.body?.expense?.timestamp;
    const freq_per_year = req?.body?.expense?.freq_per_year;

    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }
    if (!category || category === '' || category === undefined) {
        return res.status(400).send('Category is required');
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
    if (!freq_per_year || freq_per_year === '' || freq_per_year === undefined) {
        return res.status(400).send('Frequency per year is required');
    }

    try {
        result = await addNewExpenseService(user, category, title, amount, timestamp, freq_per_year);

        if (result) {

            res.status(200).send(result);
        }
    } catch (err) {

        res.status(400).send(err.message);
    }
}


const editExpenseController = async (req, res) => {
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
        result = await editExpenseService(user, title, amount, timestamp);

        if (result) {

            res.status(200).send(result);
        }
    } catch (err) {

        res.status(400).send(err.message);
    }
}


module.exports = {
    getAllExpensesController,
    getExpenseByIdController,
    addNewExpenseController,
}
