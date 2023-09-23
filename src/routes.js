const express = require('express');

const { signupController, loginController } = require('./controllers/auth.controller');

const router = express.Router();

// Authentication routes
router.post("/auth/signup", async (req, res) => {
    signupController(req, res);
});

router.post("/auth/login", async (req, res) => {
    loginController(req, res);
});

module.exports = router;
