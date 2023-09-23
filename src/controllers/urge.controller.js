
const { queryHuggingFaceAPI } = require('../services/urge.service');

// Define the controller function
const getUrgeCategoryController = async (req, res) => {
  const user = req?.user;

  if (!user || user === '' || user === undefined) {
    return res.status(400).send('User is required');
  }
  const userItem = await getUserInput('Enter the item you want to categorize: ');

  try {
    const result = await queryHuggingFaceAPI({
      inputs: userItem,
       // 'Hi, I recently bought a device from your company but it is not working as advertised and I would like to get reimbursed!',
      parameters: { candidate_labels: ['wants', 'needs', 'savings'] },
    });

    if (result) {
      res.status(200).send(result);
    } else if (result.error === "Model sileod/deberta-v3-base-tasksource-nli is currently loading") {
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
