const { signupService, loginService } = require('../services/auth.service');

const signupController = async (req, res) => {
    const name = req?.body?.name;
    const email = req?.body?.email;
    const password = req?.body?.password;

    if (!name || name === '' || name === undefined) {
        return res.status(400).send('Name is required');
    }
    if (!email || email === '' || email === undefined) {
        return res.status(400).send('Email is required');
    }
    if (!password || password === '' || password === undefined) {
        return res.status(400).send('Password is required');
    }

    try {
        token = await signupService(name, email, password);
        if (token) {
            const message = {
                token: token
            }
            res.status(200).send(message);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const loginController = async (req, res) => {
    const email = req?.body?.email;
    const password = req?.body?.password;

    if (!email || email === '' || email === undefined) {
        return res.status(400).send('Email is required');
    }
    if (!password || password === '' || password === undefined) {
        return res.status(400).send('Password is required');
    }

    try {
        token = await loginService(email, password);
        if (token) {
            const message = {
                token: token
            }
            res.status(200).send(message);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = {
    signupController,
    loginController
}
