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

async function queryHuggingFaceAPI(data) {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/sileod/deberta-v3-base-tasksource-nli',
      {
        headers: { Authorization: `Bearer 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`},
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
    return result;
  } 
module.exports = {
    //  getAllUrgesService,
      queryHuggingFaceAPI
}
 queryHuggingFaceAPI(userInput)
  .then((response) => {
    console.log(JSON.stringify(response));
  })
  .catch((error) => {
    console.error('Error:', error);
  }); 

  /*queryHuggingFaceAPI({userInput
        }).then((response) => {
        console.log(JSON.stringify(response));
    });   */

/*const getAllUrgesService = async (user) => {
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
        return result?.rows;
    } catch (err) {
        throw new Error(err.message);
    }
} */

/*how to 

/*Use this model with the Inference API

async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/sileod/deberta-v3-base-tasksource-nli",
		{
			headers: { Authorization: "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({"inputs": "Hi, I recently bought a device from your company but it is not working as advertised and I would like to get reimbursed!", "parameters": {"candidate_labels": ["refund", "legal", "faq"]}}).then((response) => {
	console.log(JSON.stringify(response));
}); */

/* from transformers import pipeline

pipe = pipeline(model="facebook/bart-large-mnli")
pipe("I have a problem with my iphone that needs to be resolved asap!",
    candidate_labels=["urgent", "not urgent", "phone", "tablet", "computer"],
)const labels =[ 
    "wants", 
    "needs", 
    "savings" ] 
//trasnforemers for python and agents for js
*/