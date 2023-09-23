const { getAllGoalsService, getGoalByIdService, addNewGoalService } = require("../services/goal.service");

const getAllGoalsContoller = async (req, res) => {
    const user = req?.user;

    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }

    try {
        result = await getAllGoalsService(user);
        if (result) {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const getGoalByIdController = async (req, res) => {
    const user = req?.user;
    const goalId = req?.params?.id;

    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }


    if (!goalId || goalId === '' || goalId === undefined) {
        return res.status(400).send('Goal Id is required');
    }

    try {
        result = await getGoalByIdService(user, goalId);
        if (result) {
            console.log(result);
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const addNewGoalController = async (req, res) => {
    const user = req?.user;
    const category = req?.body?.goal?.category;
    const title = req?.body?.goal?.title;
    const amount = req?.body?.goal?.amount;
    const dueDate = req?.body?.goal?.dueDate;

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
    if (!dueDate || dueDate === '' || dueDate === undefined) {
        return res.status(400).send('Due date is required');
    }

    try {
        result = await addNewGoalService(user, category, title, amount, dueDate);

        if (result) {

            res.status(200).send(result);
        }
    } catch (err) {

        res.status(400).send(err.message);
    }
}


module.exports = {
    getAllGoalsContoller,
    getGoalByIdController,
    addNewGoalController
}
