require('dotenv').config(); // configure the environment by adding varibales from the .env file

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const apiRouter = express.Router();

// Middleware
//app.use(cors()); // mitigates cors errors -> put this back in if there are issues
app.use(express.json()); // allows us to parse json (built on body-parser)
app.disable("x-powered-by");

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

			function desiredResponse(obj) {
				let address = obj.address;
				let pollingHours = obj.pollingHours;
				let startDate = obj.startDate;
				let endDate = obj.startDate;
				 
				return {address, pollingHours, startDate, endDate};
			}

			function getUrls(obj) {
				let electionInfo = obj.electionInfoUrl;
				let electionRegistration = obj.electionRegistrationUrl;
				let electionRegistrationConfirmation = obj.electionRegistrationConfirmationUrl;
				let absenteeVoting = obj.absenteeVotingInfoUrl;
				let votingLocationFinder = obj.votingLocationFinderUrl;
				let ballotInfo = obj.ballotInfoUrl;

				return {electionInfo, electionRegistration, electionRegistrationConfirmation, absenteeVoting, votingLocationFinder, ballotInfo};
			}

			const axiosData = axiosResponse.data; // take the axios response as a function parameter and get the data


			/* ======================= Voting information - pollingLocations, earlyVoteSites, dropOffLocations ======================= */
			let pollingLocationsArray;
			if (axiosData.pollingLocations) {
				const tenPollingLocations = axiosData.pollingLocations.slice(0, 10);
				pollingLocationsArray = tenPollingLocations.map((location) => desiredResponse(location));
			}

			let earlyVoteSitesArray;
			if (axiosData.earlyVoteSites) {
				const tenEarlyVoteSites = axiosData.earlyVoteSites.slice(0, 10);
				earlyVoteSitesArray = tenEarlyVoteSites.map((location) => desiredResponse(location));
			}

			let dropOffLocationsArray;
			if (axiosData.dropOffLocations) {
				const tenDropOffLocations = axiosData.dropOffLocations.slice(0, 10);
				dropOffLocationsArray = tenDropOffLocations.map((location) => desiredResponse(location));
			}

			let votingInfo = {pollingLocations: pollingLocationsArray, earlyVoteSites: earlyVoteSitesArray, dropOffLocations: dropOffLocationsArray};

			/* ==================================================== Helpful URLs =================================================== */
			let state = axiosData.state[0].electionAdministrationBody;
			let urls = getUrls(state);

			/* =================================================== Representatives ================================================== */
			

			/* ================================================= Result/Send Response ================================================ */
			let result = {votingInformation: votingInfo, helpfulUrls: urls};

			res.send(result); // send the data from axios as a response

		})
		.catch((err) => {
			res.status(500)
			res.send(err); // send an HTTP error code along with the error if something fails
		});
});

// TODO: Write other internal API routues for specific queries to the APIs EX: a route that returns the top 5 polling locations as the response

// TODO: '/electionname/:address' - Get the election name

// TODO: '/contests/:address' - Get the contests and respond in the form [ballotTitle : {office, position, referrendumTitle, referrendumUrl,[candidateName : {party, phone, email}]}, ...]

// TODO: '/votinginformation/:address' - Get everything but the source from pollingLocations and early voting sites in the form [locationName : {address, [dropOffLocations], startDate, endDate}]

// TODO: '/helpfulurls/:address' - {electionInfo, electionRegistration, electionRegistrationConfirmation, absenteeVoting, votingLocationFinder, ballotInfo}

// TODO: '/representatives/:address' - {...}

// Use different router objects for different routes
app.use('/api', apiRouter); // use the apiRouter for all routes starting with /api

// Start the server when this file is run with node
app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT} ...`);
});