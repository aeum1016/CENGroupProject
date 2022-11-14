import { React, useEffect, useState } from 'react';
import { Container, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

import AddressInput from '../assets/AddressInput';

function InformationPage() {
	const [isLoading, setIsLoading] = useState(true);

	const spinningWheel = (
		<Box
			sx={{
				height: '70vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<CircularProgress color='secondary' size={150} />
		</Box>
	);

	return spinningWheel;
}

export default InformationPage;
