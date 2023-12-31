const { getStatsService } = require("../services/stats.service");

const getStatsController = async (req, res) => {
    const user = req?.user;

    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }

    try {
        result = await getStatsService(user);
        if (result) {
            // console.log(result);
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}


module.exports = {
    getStatsController
}
