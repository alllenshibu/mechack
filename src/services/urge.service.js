const pool = require('../utils/pg');
const { OpenAIApi } = require('openai'); 
import { HfInference } from '@huggingface/inference';
const { pipeline } = require("@huggingface/transformers");

const openaiApiKey = process.env.OPENAI_API_KEY 
const HF_ACCESS_TOKEN = process.env.HF_API_TOKEN

//INITIALISE INFERENCE
const inference = new HfInference(HF_ACCESS_TOKEN);

//model stuff 
const model = "sileod/mdeberta-v3-base-tasksource-nli";
const nlp = pipeline("zero-shot-classification", { model });

//user input 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

function getUserInput() {
    rl.question("Enter a text prompt: ", async (prompt) => {
        const result = await nlp(prompt, {
          candidate_labels: [ 
            "wants", 
            "needs", 
            "savings"],
        });
        
        console.log(result);
        
        rl.close();
      });
    } 
    getUserInput();
const itemName = "";


/* from transformers import pipeline

pipe = pipeline(model="facebook/bart-large-mnli")
pipe("I have a problem with my iphone that needs to be resolved asap!",
    candidate_labels=["urgent", "not urgent", "phone", "tablet", "computer"],
)const labels =[ 
    "wants", 
    "needs", 
    "savings" ] 

*/
const getAllUrgesService = async (user) => {
    try {
        console.log('Getting all urges');
        const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const result = await pool.query(`
                                            SELECT
                                                category.name as category
                                            FROM
                                                category 
                                            JOIN 
                                                classification ON category.classification_id = classification.id
                                        `);

                                    //    SELECT
                                    //    category.id,
                                    //    category.name as category,
                                    //    classification.name as classification
        // if (result?.rows?.length > 0) {
        //     return result?.rows;
        // } else {
        //     throw new Error('Something went wrong');
        // }
        return result?.rows;
    } catch (err) {
        throw new Error(err.message);
    }
}

const getCategoryByAi = async (user) => {
try {
    const openai = new OpenAIApi({ apiKey: openaiApiKey });
    const response = await openai.createCompletion({
      model: 'sileod/mdeberta-v3-base-tasksource-nli', // Replace with the desired OpenAI model
      prompt: 'Your prompt here', // Replace with your prompt


       // Process the OpenAI response as needed
    //   const processedData = response.data.choices[0].text;
       res.json(processedData),
     })
     } catch (error) {
       console.error('Error fetching data from the database:', error);
       res.status(500).json({ error: 'Internal Server Error' })
       
     };
}

module.exports = {
    getAllUrgesService
}