const { queryHuggingFaceAPI } = require('../services/urge.service');
const userInput = {
  inputs: 'ice cream',
  parameters: {
    candidate_labels: ['savings', 'needs', 'wants']
  }
};
// Define the controller function
const getUrgeCategoryController = async (req, res) => {
  const user = req?.user;
  const userItem = req?.body?.userItem;

  if (!user || user === '' || user === undefined) {
    return res.status(400).send('User is required');
  }
  try {
    /* reference, works in services   */
    const response = await queryHuggingFaceAPI({
      "inputs": "ice cream",
      "parameters": {
        "candidate_labels": ["savings", "needs", "wants"]
      }
    })

    console.log(JSON.stringify(response));
    /* how it shud  */
    function determineCategory(scores) {
        const maxIndex = scores.indexOf(Math.max(...scores));
        const categories = ['wants', 'needs', 'savings'];
        return categories[maxIndex];
      }
    if (!userItem) {
      return res.status(400).send('User item is required in the request body.');
    }


    // Check if the user item is provided in the request body
    /* if (!userItem) {
       throw new Error('User item is required in the request body.');
     } */

    // Make the API call with user input
    /*const result = await queryHuggingFaceAPI({
      inputs: userItem,
      parameters: { candidate_labels: ['wants', 'needs', 'savings'] },
    }); */

    // const result = await queryHuggingFaceAPI(userItem);
    // console.log(result);
    /* const result = await queryHuggingFaceAPI({
         inputs: 'smartphone',
         parameters: {
           candidate_labels: ['savings', 'needs', 'wants']
         } 
       });   */

    if (result) {
      res.status(200).send(result);
    } else if (result.error === "Model sileod/deberta-v3-base-tasksource-nli is currently loading") {
      // Wait for some time before retrying
      await sleep(5000);
    } else {
      res.status(400).send('An error occurred while processing the request.');
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Export the controller function
module.exports = {
  getUrgeCategoryController,
};