import { React, useState, useEffect, useContext } from 'react';
import { InformationContext } from '../App';
import CaliContests from '../data/CaliforniaContests';
import CaliRepresentatives from '../data/CaliforniaReps';
import CaliVoterInfo from '../data/CaliforniaVoterInfo';

function JSONParser() {
    // sets Context variables to California response before election was held
    const { setContests, setRepresentatives, setPollingLocations, setEarlyVoteSites, setDropOffLocations } = useContext(InformationContext);
    if (CaliContests){
        setContests(CaliContests);
    }
    if (CaliRepresentatives){
        setRepresentatives(CaliRepresentatives);
    }
    if (CaliVoterInfo.votingInformation.pollingLocations){
        setPollingLocations(CaliVoterInfo.votingInformation.pollingLocations);
    }
    if (CaliVoterInfo.votingInformation.earlyVoteSites){
        setEarlyVoteSites(CaliVoterInfo.votingInformation.earlyVoteSites);
    }
    if (CaliVoterInfo.votingInformation.dropOffLocations){
        setDropOffLocations(CaliVoterInfo.votingInformation.dropOffLocations);
    }
}

export default JSONParser;