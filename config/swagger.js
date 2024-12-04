/**
 * @swagger
 * /tickets/create:
 *   post:
 *     description: Create a new ticket
 *     parameters:
 *       - name: concertName
 *         in: body
 *         required: true
 *         description: Name of the concert
 *         schema:
 *           type: string
 *       - name: seatNumber
 *         in: body
 *         required: true
 *         description: Seat number for the concert
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *       500:
 *         description: Internal Server Error
 */
