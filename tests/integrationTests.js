// tests/integrationTests.js
const request = require('supertest');
const app = require('../app');

describe('Ticket API', () => {
  it('should create a new ticket', async () => {
    const response = await request(app)
      .post('/tickets/create')
      .send({ concertName: 'Rock Concert', seatNumber: 'A1' });
    expect(response.status).toBe(201);
  });

  it('should update the ticket status to reserved', async () => {
    const response = await request(app)
      .put('/tickets/update')
      .send({ id: 1, status: 'reserved' });
    expect(response.status).toBe(200);
  });
});
