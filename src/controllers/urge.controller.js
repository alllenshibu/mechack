
const { getAllUrgesService } = require('../services/urge.service');

const getAllUrgesController = async (req, res) => {
    const user = req?.user;

    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }

    try {
        result = await getAllUrgesService(user);
        if (result) {
            res.status(200).send(result);
            console.log(result);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = {
    getAllUrgesController
}
