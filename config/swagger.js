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

/**
 * @swagger
 * /tickets/{id}:
 *   get:
 *     description: Get a ticket by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Ticket ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket details
 *       404:
 *         description: Ticket not found
 */

/**
 * @swagger
 * /tickets/update:
 *   put:
 *     description: Update ticket status (buy, reserve, cancel)
 *     parameters:
 *       - name: id
 *         in: body
 *         required: true
 *         description: Ticket ID
 *         schema:
 *           type: integer
 *       - name: status
 *         in: body
 *         required: true
 *         description: New status for the ticket
 *         schema:
 *           type: string
 *           enum: [available, reserved, sold, canceled]
 *     responses:
 *       200:
 *         description: Ticket status updated
 *       400:
 *         description: Invalid status transition
 */

/**
 * @swagger
 * /tickets/delete:
 *   delete:
 *     description: Delete a ticket (for canceled tickets)
 *     parameters:
 *       - name: id
 *         in: body
 *         required: true
 *         description: Ticket ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket deleted
 *       404:
 *         description: Ticket not found
 */