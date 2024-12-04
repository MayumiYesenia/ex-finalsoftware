const request = require('supertest');
const app = require('../app');
const db = require('../database/db'); // Assuming this is where your database connection is

// Helper function to clear the database before each test
const clearTicketsTable = () => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM tickets';
    db.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

describe('Ticket API', () => {
  
  // Clear the tickets table before each test to ensure a clean state
  beforeEach(async () => {
    await clearTicketsTable();
  });

  it('should create a new ticket', async () => {
    const response = await request(app)
      .post('/tickets/create')
      .send({ concertName: 'Rock Concert', seatNumber: 'A1' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.concertName).toBe('Rock Concert');
    expect(response.body.seatNumber).toBe('A1');
    expect(response.body.status).toBe('available');
  });

  it('should get a ticket by ID', async () => {
    // First, create a ticket
    const createResponse = await request(app)
      .post('/tickets/create')
      .send({ concertName: 'Rock Concert', seatNumber: 'A1' });

    const ticketId = createResponse.body.id;

    // Now, get the created ticket
    const getResponse = await request(app).get(`/tickets/${ticketId}`);
    
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.id).toBe(ticketId);
    expect(getResponse.body.concertName).toBe('Rock Concert');
    expect(getResponse.body.seatNumber).toBe('A1');
    expect(getResponse.body.status).toBe('available');
  });

  it('should update the ticket status to reserved', async () => {
    // First, create a ticket
    const createResponse = await request(app)
      .post('/tickets/create')
      .send({ concertName: 'Rock Concert', seatNumber: 'A1' });

    const ticketId = createResponse.body.id;

    // Now, update the ticket status to reserved
    const updateResponse = await request(app)
      .put('/tickets/update')
      .send({ id: ticketId, status: 'reserved' });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.status).toBe('reserved');
  });

  it('should return 404 for non-existing ticket when getting by ID', async () => {
    const response = await request(app).get('/tickets/9999'); // Assuming this ticket doesn't exist
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Ticket not found');
  });

  it('should delete a ticket by ID', async () => {
    // First, create a ticket
    const createResponse = await request(app)
      .post('/tickets/create')
      .send({ concertName: 'Rock Concert', seatNumber: 'A1' });

    const ticketId = createResponse.body.id;

    // Now, delete the created ticket
    const deleteResponse = await request(app)
      .delete('/tickets/delete')
      .send({ id: ticketId });

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.message).toBe('Ticket deleted');

    // Try to get the ticket again and ensure it was deleted
    const getResponse = await request(app).get(`/tickets/${ticketId}`);
    expect(getResponse.status).toBe(404);
    expect(getResponse.body.error).toBe('Ticket not found');
  });

  it('should not allow updating a ticket status to an invalid state', async () => {
    // First, create a ticket
    const createResponse = await request(app)
      .post('/tickets/create')
      .send({ concertName: 'Rock Concert', seatNumber: 'A1' });

    const ticketId = createResponse.body.id;

    // Update the status to "reserved"
    await request(app)
      .put('/tickets/update')
      .send({ id: ticketId, status: 'reserved' });

    // Try updating to "reserved" again, which should fail
    const updateResponse = await request(app)
      .put('/tickets/update')
      .send({ id: ticketId, status: 'reserved' });

    expect(updateResponse.status).toBe(400); // Assuming you return a 400 for invalid status transition
    expect(updateResponse.body.error).toBe('Ticket is already reserved');
  });
});