const Ticket = require('../models/ticketModel');
const winston = require('winston');

// Logger configuration
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: `logs/log_${new Date().toISOString().split('T')[0]}.log` })
  ]
});

// Create a new ticket
const createTicket = async (req, res) => {
  try {
    const { concertName, seatNumber } = req.body;
    const ticket = await Ticket.create(concertName, seatNumber);
    logger.info('Exito en Ejecución');
    res.status(201).json(ticket);
  } catch (err) {
    logger.error('Error en Ejecución');
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update the status of a ticket (buy/reserve/cancel)
const updateTicketStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    if (status === 'reserved' && ticket.status !== 'available') {
      return res.status(400).json({ error: 'Ticket is not available for reservation' });
    }

    if (status === 'sold' && ticket.status !== 'reserved') {
      return res.status(400).json({ error: 'Ticket is not reserved for purchase' });
    }

    if (status === 'canceled' && ticket.status === 'sold') {
      return res.status(400).json({ error: 'Ticket cannot be canceled after being sold' });
    }

    if (status === 'available' && ticket.status === 'canceled') {
      return res.status(400).json({ error: 'Ticket cannot be made available after cancellation' });
    }

    await Ticket.updateStatus(id, status);
    logger.info('Exito en Ejecución');
    res.status(200).json({ message: 'Ticket status updated', status });
  } catch (err) {
    logger.error('Error en Ejecución');
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a ticket (optional for canceled tickets)
const deleteTicket = async (req, res) => {
  try {
    const { id } = req.body;
    await Ticket.delete(id);
    logger.info('Exito en Ejecución');
    res.status(200).json({ message: 'Ticket deleted' });
  } catch (err) {
    logger.error('Error en Ejecución');
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get ticket by ID
const getTicket = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`Fetching ticket with ID: ${id}`);

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      logger.warn(`Ticket with ID: ${id} not found`);
      return res.status(404).json({ error: 'Ticket not found' });
    }

    logger.info(`Ticket with ID: ${id} fetched successfully`);
    res.status(200).json(ticket);
  } catch (err) {
    logger.error(`Error fetching ticket with ID: ${id}: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createTicket,
  updateTicketStatus,
  deleteTicket,
  getTicket
};