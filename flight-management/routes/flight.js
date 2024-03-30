const express = require('express');
const router = express.Router();
const { createFlight, viewFlight, updateFlight} = require("../controller/flight");

router.post('/create',createFlight);
router.post('/view', viewFlight);
router.get('/update',updateFlight);

module.exports = router;
