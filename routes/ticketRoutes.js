const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/create', ticketController.createTicket);
router.put('/update', ticketController.updateTicketStatus);

module.exports = router;
