const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const apiRouter = express.Router();

// Middleware
app.use(cors); // mitigates cors errors
app.use(express.json()); // allows us to parse json (built on body-parser)

// Routes for internal API
apiRouter.get('/', (req, res) => {
  // TODO: Write response for what we need
});
//TODO: Write internal API routues for specific queries to the APIs EX: a route that returns the top 5 polling locations as the response

// Use different routers for different routes
app.use('/api', apiRouter); // use the apiRouter for all routes starting with /api

const server = app.listen(process.env.PORT, () => {
  console.log(`Starting server on port ${process.env.PORT}`);
})