const pool = require('../utils/pg');
const { OpenAIApi } = require('openai');
const { HfInference } = require('@huggingface/inference');
const { pipeline } = require('@huggingface/agents')
const fetch = require('node-fetch');

const openaiApiKey = process.env.OPENAI_API_KEY
const accessToken = process.env.HF_API_TOKEN

//INITIALISE INFERENCE
//const inference = new HfInference(accessToken);

//model stuff 
//const model = "sileod/mdeberta-v3-base-tasksource-nli";
//const nlp = pipeline("zero-shot-classification", { model });
const userInput = {
  inputs: 'smartphone',
  parameters: {
    candidate_labels: ['savings', 'needs', 'wants']
  }
};
function determineCategory(scores) {
    // Find the index of the maximum score
    // console.log(scores)
    const maxIndex = scores.indexOf(Math.max(...scores));
    // console.log(maxIndex)
    // Define the categories
    const categories = ['wants', 'needs', 'savings'];
  
    // Return the category with the highest score
    return categories[maxIndex];
  }

async function queryHuggingFaceAPI(data) {
  console.log("booooom")
  const userItem = data.inputs;
  const response = await fetch(
    'https://api-inference.huggingface.co/models/sileod/deberta-v3-base-tasksource-nli',
    {
      headers: { Authorization: `Bearer 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` },
      method: 'POST',
      body: JSON.stringify({
        inputs: `${userItem}`,
        parameters: {
          candidate_labels: ['saving', 'need', 'want']
        }
      }),
      // 'Content-Type': 'application/json',
    }
  );
  const result = await response.json();
  // console.log(result)
  //return result;
  // const category = determineCategory(result.scores); 
//   console.log(category);
  //get category current remaining income
  /*const income = await getIncomeByCategory(category);
  console.log(`Income for ${category}: ${income}`); */
  return result?.labels[0];
}

module.exports = {
  //  getAllUrgesService,
  queryHuggingFaceAPI
}