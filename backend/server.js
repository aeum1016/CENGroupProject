require('dotenv').config(); // configure the environment by adding varibales from the .env file

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const apiRouter = express.Router();

// Middleware
app.use(cors); // mitigates cors errors
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

apiRouter.get('/voterinfo', (req, res) => {
  // const address = req.params.address;
	axios(getCivicInfoConfig('/voterinfo', '607 Carpenter Way Auburn, Alabama(AL)'))
		.then((axiosResponse) => {
			const axiosData = axiosResponse.data;
			res.send(axiosData);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});

//TODO: Write other internal API routues for specific queries to the APIs EX: a route that returns the top 5 polling locations as the response

// Use different routers for different routes
app.use('/api', apiRouter); // use the apiRouter for all routes starting with /api

const server = app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`);
})