const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors);

//Routes
app.get('/', (req, res) => {
  // TODO: Write response for what we need
});

//TODO: Write internal API routues for specific queries to the APIs EX: a route that returns the top 5 polling locations as the response

const server = app.listen(process.env.PORT, () => {
  console.log(`Starting server on port ${process.env.PORT}`);
})