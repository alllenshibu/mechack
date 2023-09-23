
const { chatWithBroService } = require("../services/bro.service.js");

const chatWithBroController = async (req, res) => {

    const prompt = req.body.prompt;

    if (!prompt || prompt === '' || prompt === undefined) {
        return res.status(400).send('Prompt is required');
    }

    try {
        result = await chatWithBroService(prompt);
        if (result) {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = {
    chatWithBroController,
}
