const {
  getAllGoalsService,
  getGoalByIdService,
  addNewGoalService,
} = require("../services/goal.service");

const getAllGoalsContoller = async (req, res) => {
  const user = req?.user;

  if (!user || user === "" || user === undefined) {
    return res.status(400).send("User is required");
  }

  try {
    result = await getAllGoalsService(user);
    if (result) {
      res.status(200).send(result);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getGoalByIdController = async (req, res) => {
  const user = req?.user;
  const goalId = req?.params?.id;

  if (!user || user === "" || user === undefined) {
    return res.status(400).send("User is required");
  }

  if (!goalId || goalId === "" || goalId === undefined) {
    return res.status(400).send("Goal Id is required");
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
};

const addNewGoalController = async (req, res) => {
    const user = req?.user;
    const title = req?.body?.goal?.title;
    const amount = req?.body?.goal?.amount;
    const targetDate = req?.body?.goal?.targetDate;
    const completedAmount = req?.body?.goal?.completedAmount;
    const priority = req?.body?.goal?.priority;

    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }
    if (!title || title === '' || title === undefined) {
        return res.status(400).send('Title is required');
    }
    if (!amount || amount === '' || amount === undefined) {
        return res.status(400).send('Amount is required');
    }
    if (!targetDate || targetDate === '' || targetDate === undefined) {
        return res.status(400).send('Target date is required');
    }
    if (!priority || priority === '' || priority === undefined) {
        return res.status(400).send('Priority is required');
    }
    if (!completedAmount || completedAmount === '' || completedAmount === undefined) {
        return res.status(400).send('completedAmount is required');
    }

    try {
        result = await addNewGoalService(user, title, amount, targetDate, priority, completedAmount);

    if (result) {
      res.status(200).send(result);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  getAllGoalsContoller,
  getGoalByIdController,
  addNewGoalController,
};
