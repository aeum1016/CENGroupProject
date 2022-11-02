require('dotenv').config(); // configure the environment by adding varibales from the .env file

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const apiRouter = express.Router();

// Middleware
app.use(cors()); // mitigates cors errors
app.use(express.json()); // allows us to parse json (built on body-parser)

// Define constants to be used in server implementation
const PORT = process.env.PORT;
const CIVIC_INFO_BASE_URL = "https://www.googleapis.com/civicinfo/v2";
const CIVIC_INFO_API_KEY = process.env.CIVIC_INFO_API_KEY;

// Routes for internal API
// creates a configuration object to be used in axios requests to the google civic information api
const getCivicInfoConfig = (url, address = null) => {
	let config = {
		url: url,
		method: 'get',
		baseURL: CIVIC_INFO_BASE_URL,
		params: {
			key: CIVIC_INFO_API_KEY
		}
	};

	if(address) {
		config.params.address = address;
	}

	return(config);
};

apiRouter.get('/voterinfo/:address', (req, res) => {
  const address = req.params.address; // takes the address that was given from the user as input

	const config = getCivicInfoConfig('/voterinfo', address);
	
	axios(config)
		.then((axiosResponse) => {
			const axiosData = axiosResponse.data; // take the axios response as a function parameter and get the data
			res.send(axiosData); // send the data from axios as a response
		})
		.catch((err) => {
			res.status(500).send(err); // send an HTTP error code along with the error if something fails
		});
});

//TODO: Write other internal API routues for specific queries to the APIs EX: a route that returns the top 5 polling locations as the response

// Use different router objects for different routes
app.use('/api', apiRouter); // use the apiRouter for all routes starting with /api

// Start the server when this file is run with node
app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT} ...`);
});