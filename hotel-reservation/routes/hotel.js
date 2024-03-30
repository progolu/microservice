const express = require('express');
const router = express.Router();
const { createReservation, viewReservation, updateReservation} = require("../controller/hotel");

router.post('/create',createReservation);
router.post('/view', viewReservation);
router.get('/update',updateReservation);

module.exports = router;
