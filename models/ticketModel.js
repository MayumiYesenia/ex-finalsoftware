const db = require('../database/db');

const Ticket = {
  create: (concertName, seatNumber) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO tickets (concert_name, seat_number) VALUES (?, ?)';
      db.query(query, [concertName, seatNumber], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  updateStatus: (id, status) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE tickets SET status = ? WHERE id = ?';
      db.query(query, [status, id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  findById: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM tickets WHERE id = ?';
      db.query(query, [id], (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  }
};

module.exports = Ticket;
