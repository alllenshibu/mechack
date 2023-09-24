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
    const maxIndex = scores.indexOf(Math.max(...scores));
  
    // Define the categories
    const categories = ['wants', 'needs', 'savings'];
  
    // Return the category with the highest score
    return categories[maxIndex];
  }

async function queryHuggingFaceAPI(data) {
  console.log("booooom")

  const response = await fetch(
    'https://api-inference.huggingface.co/models/sileod/deberta-v3-base-tasksource-nli',
    {
      headers: { Authorization: `Bearer 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` },
      method: 'POST',
      body: JSON.stringify({
        inputs: 'smartphone',
        parameters: {
          candidate_labels: ['savings', 'needs', 'wants']
        }
      }),
      // 'Content-Type': 'application/json',
    }
  );
  const result = await response.json();
  
  //return result;
  const category = determineCategory(result.scores);
//   console.log(category);
  //get category current remaining income
  /*const income = await getIncomeByCategory(category);
  console.log(`Income for ${category}: ${income}`); */
  return [category, result];
}

module.exports = {
  //  getAllUrgesService,
  queryHuggingFaceAPI
}