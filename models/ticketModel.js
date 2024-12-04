const db = require('../database/db');

const Ticket = {
  create: (concertName, seatNumber) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO tickets (concert_name, seat_number) VALUES (?, ?)';
      db.query(query, [concertName, seatNumber], (err, result) => {
        if (err) reject(err);
        resolve({ id: result.insertId, concertName, seatNumber, status: 'available' });
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
  delete: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM tickets WHERE id = ?';
      db.query(query, [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  isAvailable: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT status FROM tickets WHERE id = ?';
      db.query(query, [id], (err, result) => {
        if (err) reject(err);
        resolve(result[0].status === 'available');
      });
    });
  }
};

module.exports = Ticket;
