const express = require('express');
const router = express.Router();
const { signup, signin, logout, userProfile, updateUser, } = require("../controller/auths");
const { isAuthenticated } = require("../middleware/auth");

router.post('/signup',signup);
router.post('/signin', signin);
router.get('/account',isAuthenticated, userProfile);
router.put('/user/:id', updateUser);
router.get('/logout', logout);

module.exports = router;
