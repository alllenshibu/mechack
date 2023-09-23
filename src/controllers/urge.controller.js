const readline = require('readline');
const { queryHuggingFaceAPI } = require('../services/urge.service');



// Define the controller function
const getUrgeCategoryController = async (req, res) => {
  const user = req?.user;
  const userItem = req?.body?.userItem;
  console.log(userItem);

  if (!user || user === '' || user === undefined) {
    return res.status(400).send('User is required');
  }

  try {
    // Get user's item input
    const userInputString = await getUserInput(
      'Enter the item you want to categorize & its cost (comma-separated): '
    );
    const [userItem, itemExpense] = userInputString.split(',');

    // Check if the user input is valid (item is a string, cost is an integer)
    if (typeof userItem !== 'string' || isNaN(parseInt(itemExpense))) {
      throw new Error('Invalid user input. Please enter a valid item and cost.');
    }

    // Combine user input as needed
    const modelPrompt = userItem;

    // Make the API call with user input
    const result = await queryHuggingFaceAPI({
      inputs: modelPrompt,
      parameters: { candidate_labels: ['wants', 'needs', 'savings'] },
    });

    if (result) {
      res.status(200).send(result);
    } else if (
      result.error === 'Model sileod/deberta-v3-base-tasksource-nli is currently loading'
    ) {
      // Wait for some time before retrying
      await sleep(5000);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Export the controller function
module.exports = {
  getUrgeCategoryController,
};


