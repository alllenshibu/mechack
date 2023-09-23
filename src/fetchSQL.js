//import { DataSource } from "typeorm";
//import { OpenAI } from "langchain/llms/openai";
const { OpenAIApi } = require('openai'); 
//import { SqlDatabase } from "langchain/sql_db";
//import { SqlDatabaseChain } from "langchain/chains/sql_db";
//import { createSqlAgent, SqlToolkit } from "langchain/agents/toolkits/sql";
//import { PromptTemplate } from "langchain/prompts";

require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const app = express();
const { Pool } = require('pg'); // Import the Pool class from pg

//import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
};

const openaiApiKey = process.env.OPENAI_API_KEY
app.get('/fetch-data', async (req, res) => {
    try {
      const client = await pool.connect(); // Acquire a PostgreSQL client
      const result = await client.query('SELECT * FROM your_table'); // Replace with your query
      client.release(); // Release the PostgreSQL client
  
      // Process the result using OpenAI or perform any other operations here
      // For example, you can send the result to OpenAI for further analysis
  
      // Make an API call to OpenAI using the API key
      const openai = new OpenAIApi({ apiKey: openaiApiKey });
      const response = await openai.createCompletion({
        model: 'text-davinci-002', // Replace with the desired OpenAI model
        prompt: 'Your prompt here', // Replace with your prompt
      });
  
      // Process the OpenAI response as needed
      const processedData = response.data.choices[0].text;
  
      res.json(processedData);
    } catch (error) {
      console.error('Error fetching data from the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


/*
const getDataFromDatabase = async () => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM your_table');
      client.release(); // Release the client back to the pool
      return result.rows;
    } catch (error) {
      console.error('Error fetching data from the database:', error);
      return [];
    }
  };
*/
//  module.exports = getDataFromDatabase;