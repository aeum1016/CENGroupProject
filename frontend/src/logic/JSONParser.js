import { React, useState, useEffect } from 'react';
import CaliContests from '../data/CaliforniaContests';
import CaliRepresentatives from '../data/CaliforniaReps';
import CaliVoterInfo from '../data/CaliforniaVoterInfo';

function JSONParser() {
    // sets Context variables to California response before election was held
    let contests, representatives, pollingLocations, earlyVoteSites, dropOffLocations;
    if (CaliContests){
        contests = CaliContests;
    }
    if (CaliRepresentatives){
        representatives = CaliRepresentatives;
    }
    if (CaliVoterInfo.votingInformation.pollingLocations){
        pollingLocations = CaliVoterInfo.votingInformation.pollingLocations;
    }
    if (CaliVoterInfo.votingInformation.earlyVoteSites){
        earlyVoteSites = CaliVoterInfo.votingInformation.earlyVoteSites;
    }
    if (CaliVoterInfo.votingInformation.dropOffLocations){
        dropOffLocations = CaliVoterInfo.votingInformation.dropOffLocations;
    }
    return {contests, representatives, pollingLocations, earlyVoteSites, dropOffLocations};
}

export default JSONParser;