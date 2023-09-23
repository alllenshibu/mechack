const { signupService, loginService } = require('../services/auth.service');

const signupController = async (req, res) => {
    const name = req?.body?.name;
    const email = req?.body?.email;
    const password = req?.body?.password;
    const dob = req?.body?.dob;

    if (!name || name === '' || name === undefined) {
        return res.status(400).send('Name is required');
    }
    if (!email || email === '' || email === undefined) {
        return res.status(400).send('Email is required');
    }
    if (!password || password === '' || password === undefined) {
        return res.status(400).send('Password is required');
    }
    if (!dob || dob === '' || dob === undefined) {
        return res.status(400).send('Date of birth is required');
    }

    try {
        token = await signupService(name, email, password, dob);
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
