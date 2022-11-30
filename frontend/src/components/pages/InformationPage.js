import { React, useEffect, useState } from 'react';
import { Container, Box, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';

import AddressInput from '../assets/AddressInput';
import { Stack } from '@mui/system';

function InformationPage() {
	const [isLoading, setIsLoading] = useState(true);

	//TODO: Using dummy data for response for now but will replace this with actual logic
	const [voterInfo, setVoterInfo] = useState();
	const [contests, setContests] = useState();

	useEffect(() => {
		if (voterInfo && contests) {
			setIsLoading(false);
		}
	}, [voterInfo, contests]);

	const spinningWheel = (
		<Box
			sx={{
				height: '70vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Stack spacing={4} alignItems='center'>
				<CircularProgress color='secondary' size={150} />
				<Typography color='secondary' variant='h2'>
					Loading ...
				</Typography>
			</Stack>
		</Box>
	);

	return spinningWheel;
}

export default InformationPage;
