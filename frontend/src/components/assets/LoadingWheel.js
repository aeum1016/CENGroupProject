import React from 'react';
import { Box, Stack, CircularProgress, Typography } from '@mui/material';

function LoadingWheel() {
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

export default LoadingWheel;
