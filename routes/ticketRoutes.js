const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/create', ticketController.createTicket);
router.get('/:id', ticketController.getTicket);
router.put('/update', ticketController.updateTicketStatus);
router.delete('/delete', ticketController.deleteTicket);

module.exports = router;

