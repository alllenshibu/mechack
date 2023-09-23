const { openai } = require("../utils/openai");

const chatWithBroService = async (prompt) => {
    try {

        const response = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-3.5-turbo',

        });

        console.log(response.choices[0].message.content)

        return response.choices[0].message.content;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    chatWithBroService,
}
