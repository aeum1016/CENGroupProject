const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  console.log(process.env);
  // TODO: Write response for what we need
});

//TODO: Write internal API routues for specific queries to the APIs EX: a route that returns the top 5 polling locations as the response

const server = app.listen(process.env.PORT, () => {
  console.log(`Starting server on port ${process.env.PORT}`);
})