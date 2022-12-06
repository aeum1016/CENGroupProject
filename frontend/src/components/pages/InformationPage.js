import { React, useEffect, useState } from 'react';
import { Container, Box, CircularProgress, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import { useSelector } from 'react-redux';
import { selectAddress } from '../assets/addressSlice';
import Dashboard from '../assets/Dashboard';
import LoadingWheel from '../assets/LoadingWheel';

import californiaInfo from '../../data/responses/california/californiaInfo';
import californiaContests from '../../data/responses/california/californiaContests';
import californiaRepresentatives from '../../data/responses/california/californiaRepresentatives';
import alabamaInfo from '../../data/responses/alabama/alabamaInfo';
import alabamaContests from '../../data/responses/alabama/alabamaContests';
import alabamaRepresentatives from '../../data/responses/alabama/alabamaRepresentativesRaw';
import gainesvilleInfo from '../../data/responses/gainesville/gainesvilleInfo';
import gainesvilleContests from '../../data/responses/gainesville/gainesvilleContests';
import gainesvilleRepresentatives from '../../data/responses/gainesville/gainesvilleRepresentativesRaw';

function InformationPage() {
	const [isLoading, setIsLoading] = useState(true);
	const address = useSelector(selectAddress);

	//TODO: Using dummy data for response for now but will replace this with actual logic
	const [voterInfo, setVoterInfo] = useState();
	const [contests, setContests] = useState();
	const [representatives, setRepresentatives] = useState();

	// Show the loading circle if the info and contests is null
	useEffect(() => {
		if(address == "607 Carpenter Way Auburn, AL") {
			setVoterInfo(alabamaInfo);
			setContests(alabamaContests);
			setRepresentatives("NA");
		}
		else if(address == "4286 Esperanza Way Oceanside, CA") {
			setVoterInfo(californiaInfo);
			setContests(californiaContests);
			setRepresentatives(californiaRepresentatives);
		}
		else if(address == "2337 SW Archer Road Gainesville, FL") {
			setVoterInfo(gainesvilleInfo);
			setContests(gainesvilleContests);
			setRepresentatives("NA");
		}
		else {
			setVoterInfo("NA");
			setContests("NA");
			setRepresentatives("NA");
		}
		if (voterInfo && contests && representatives) {
			setIsLoading(false);
		}
	}, [voterInfo, contests, representatives, address]);

	const display = () => {
		if (isLoading) {
			return <LoadingWheel />;
		} else {
			return (
				<>
					<Dashboard
						voterInfo={voterInfo}
						contests={contests}
						representatives={representatives}
					/>
				</>
			);
		}
	};

	return <>{display()}</>;
}

export default InformationPage;
