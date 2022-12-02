import { React, useEffect, useState } from 'react';
import { Container, Box, CircularProgress, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import axios from 'axios';

import Dashboard from '../assets/Dashboard';
import LoadingWheel from '../assets/LoadingWheel';

import californiaInfo from '../../data/responses/california/californiaInfo';
import californiaContests from '../../data/responses/california/californiaContests';
import californiaRepresentatives from '../../data/responses/california/californiaRepresentatives';

function InformationPage() {
	const [isLoading, setIsLoading] = useState(true);

	//TODO: Using dummy data for response for now but will replace this with actual logic
	const [voterInfo, setVoterInfo] = useState(californiaInfo);
	const [contests, setContests] = useState(californiaContests);
	const [representatives, setRepresentatives] = useState(
		californiaRepresentatives
	);

	// Show the loading circle if the info and contests is null
	useEffect(() => {
		if (voterInfo && contests && representatives) {
			setIsLoading(false);
		}
	}, [voterInfo, contests, representatives]);

	const display = () => {
		if (isLoading) {
			return <LoadingWheel />;
		} else {
			return (
				<Dashboard
					voterInfo={voterInfo}
					contests={contests}
					representatives={representatives}
				/>
			);
		}
	};

	return <>{display()}</>;
}

export default InformationPage;
