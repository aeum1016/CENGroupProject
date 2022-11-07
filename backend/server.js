require("dotenv").config(); // configure the environment by adding varibales from the .env file

const express = require("express");
const cors = require("cors");
const axios = require("axios");

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
    method: "get",
    baseURL: CIVIC_INFO_BASE_URL,
    params: {
      key: CIVIC_INFO_API_KEY,
    },
  };

  if (address) {
    config.params.address = address;
  }

  return config;
};

apiRouter.get("/voterinfo/:address", (req, res) => {
  const address = req.params.address; // takes the address that was given from the user as input

  const config = getCivicInfoConfig("/voterinfo", address);

  axios(config)
    .then((axiosResponse) => {
      // get desired details of location
      function locationDetails(obj) {
        let address = obj.address;
        let pollingHours = obj.pollingHours;
        let startDate = obj.startDate;
        let endDate = obj.startDate;

        return { address, pollingHours, startDate, endDate };
      }

      // get desired urls
      function getUrls(obj) {
        let electionInfo = obj.electionInfoUrl;
        let electionRegistration = obj.electionRegistrationUrl;
        let electionRegistrationConfirmation =
          obj.electionRegistrationConfirmationUrl;
        let absenteeVoting = obj.absenteeVotingInfoUrl;
        let votingLocationFinder = obj.votingLocationFinderUrl;
        let ballotInfo = obj.ballotInfoUrl;

        return {
          electionInfo,
          electionRegistration,
          electionRegistrationConfirmation,
          absenteeVoting,
          votingLocationFinder,
          ballotInfo,
        };
      }

      const axiosData = axiosResponse.data; // take the axios response as a function parameter and get the data

      /* ======================= Voting information - pollingLocations, earlyVoteSites, dropOffLocations ======================= */
      // polling locations info
      let pollingLocationsArray;
      if (axiosData.pollingLocations) {
        const tenPollingLocations = axiosData.pollingLocations.slice(0, 10); // decrease size of array if needed
        pollingLocationsArray = tenPollingLocations.map((location) =>
          locationDetails(location)
        );
      }

      // early voting sites info
      let earlyVoteSitesArray;
      if (axiosData.earlyVoteSites) {
        const tenEarlyVoteSites = axiosData.earlyVoteSites.slice(0, 10); // decrease size of array if needed
        earlyVoteSitesArray = tenEarlyVoteSites.map((location) =>
          locationDetails(location)
        );
      }

      // drop off locations info
      let dropOffLocationsArray;
      if (axiosData.dropOffLocations) {
        const tenDropOffLocations = axiosData.dropOffLocations.slice(0, 10); // decrease size of array if needed
        dropOffLocationsArray = tenDropOffLocations.map((location) =>
          locationDetails(location)
        );
      }

      // variable for all info pertaining to polling locations, early vote sites, and drop off locations
      let votingInfo = {
        pollingLocations: pollingLocationsArray,
        earlyVoteSites: earlyVoteSitesArray,
        dropOffLocations: dropOffLocationsArray,
      };

      /* ==================================================== Helpful URLs =================================================== */
      let state = axiosData.state[0].electionAdministrationBody;
      let urls = getUrls(state);

      /* ================================================= Result/Send Response ================================================ */
      let result = { votingInformation: votingInfo, helpfulUrls: urls }; // variable for storing all pertinent info from voterinfo call

      res.send(result); // send the data from axios as a response
    })
    .catch((err) => {
      res.status(500);
      res.send(err); // send an HTTP error code along with the error if something fails
    });
});

apiRouter.get("/representatives/:address", (req, res) => {
  const address = req.params.address; // takes the address that was given from the user as input

  const config = getCivicInfoConfig("/representatives", address);

  axios(config)
    .then((axiosResponse) => {
      let representatives = []; // array with each element representing an office and its official
      const axiosData = axiosResponse.data; // take the axios response as a function parameter and get the data
      let offices = axiosData.offices;
      let officials = axiosData.officials;

      // get desired info of official
      function getOfficialInfo(official) {
        let name = official.name;
        let party = official.party;
        let phones = official.phones;
        let urls = official.urls;
        let photoUrl = official.photoUrl;
        let emails = official.emails;

        return { name, party, phones, urls, photoUrl, emails };
      }

      // add office and corresponding official to representatives array
      function getRepresentativeInfo(role) {
        let office = role.name;
        let numOfficials = role.officialIndices.length;

        // loop through each element of the office
        for (let i = 0; i < numOfficials; i++) {
          let officialObject = officials[role.officialIndices[i]]; // use index to get official
          let official = getOfficialInfo(officialObject); // get info on official
          representatives.push({ office, official }); // add info to representatives array
        }
      }

      offices.map((office) => getRepresentativeInfo(office)); // loop through offices

      res.send(representatives); // send the data from axios as a response
    })
    .catch((err) => {
      res.status(500);
      res.send(err); // send an HTTP error code along with the error if something fails
    });
});

// TODO: Write other internal API routues for specific queries to the APIs EX: a route that returns the top 5 polling locations as the response

// TODO: '/electionname/:address' - Get the election name

// TODO: '/contests/:address' - Get the contests and respond in the form [ballotTitle : {office, position, referrendumTitle, referrendumUrl,[candidateName : {party, phone, email}]}, ...]

apiRouter.get("/contests/:address", (req, res) => {
  const address = req.params.address; // takes the address that was given from the user as input

  const config = getCivicInfoConfig("/voterinfo", address);

  axios(config)
    .then((axiosResponse) => {
      let contests = []; // array with each element representing an office and its official
      const axiosData = axiosResponse.data; // take the axios response as a function parameter and get the data
      let contestData = axiosData.contests;

      // get desired info of official
      function getCandidateInfo(cand) {
        let { name, party, phone, email } = cand;

        return { name, party, phone, email };
      }

      // add office and corresponding official to representatives array
      function getContestInfo(contest) {
        let { ballotTitle, office, referendumTitle, referendumUrl } = contest;

        let candidates = [];
        for (let i = 0; i < contest.candidates?.length; i++) {
          candidates.push(getCandidateInfo(contest.candidates[i])); // get info on official
        }

        contests.push({
          ballotTitle,
          office,
          referendumTitle,
          referendumUrl,
          candidates,
        }); // add info to representatives array
      }

      contestData.map((contestC) => getContestInfo(contestC)); // loop through offices

      res.send(contests); // send the data from axios as a response
    })
    .catch((err) => {
      res.status(500);
      res.send(err); // send an HTTP error code along with the error if something fails
    });
});

// TODO: '/votinginformation/:address' - Get everything but the source from pollingLocations and early voting sites in the form [locationName : {address, [dropOffLocations], startDate, endDate}]

apiRouter.get("/votinginformation/:address", (req, res) => {
  const address = req.params.address; // takes the address that was given from the user as input

  const config = getCivicInfoConfig("/voterinfo", address);

  axios(config)
    .then((axiosResponse) => {
      let pollingLocations = []; // array with each element representing an office and its official
      let dropOffLocations = []; // array with each element representing an office and its official
      const axiosData = axiosResponse.data; // take the axios response as a function parameter and get the data

      console.log(axiosData);
      let locationData = axiosData.pollingLocations;
      let dropOffData = axiosData.dropOffLocations;

      // add office and corresponding official to representatives array
      function getLocationInfo(loc) {
        let { address, startDate, endDate } = loc;

        let name = address.locationName;

        return { name, address, startDate, endDate };
      }

      locationData.map((location) =>
        pollingLocations.push(getLocationInfo(location))
      ); // loop through offices
      dropOffData?.map((location) =>
        dropOffLocations.push(getLocationInfo(location))
      ); // loop through offices

      res.send({
        pollingLocations: pollingLocations,
        dropOffLocations: dropOffLocations,
      }); // send the data from axios as a response
    })
    .catch((err) => {
      res.status(500);
      res.send(err); // send an HTTP error code along with the error if something fails
    });
});

// TODO: '/helpfulurls/:address' - {electionInfo, electionRegistration, electionRegistrationConfirmation, absenteeVoting, votingLocationFinder, ballotInfo}

// TODO: '/representatives/:address' - [{position, official},...] where official has format {name, party, phones, urls, photoUrl, emails}

// Use different router objects for different routes
app.use("/api", apiRouter); // use the apiRouter for all routes starting with /api

// Start the server when this file is run with node
app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT} ...`);
});
