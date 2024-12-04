const express = require('express');
const app = express();
const ticketRoutes = require('./routes/ticketRoutes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Concert Ticket API',
      version: '1.0.0',
      description: 'API for buying, reserving, and canceling concert tickets'
    }
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/tickets', ticketRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
