const Ticket = require('../models/ticketModel');
const winston = require('winston');

// Logger configuration
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: `logs/log_${new Date().toISOString().split('T')[0]}.log` })
  ]
});

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

const updateTicketStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const ticket = await Ticket.updateStatus(id, status);
    logger.info('Exito en Ejecución');
    res.status(200).json(ticket);
  } catch (err) {
    logger.error('Error en Ejecución');
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createTicket,
  updateTicketStatus
};
