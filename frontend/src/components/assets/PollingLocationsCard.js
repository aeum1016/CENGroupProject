import React from 'react';
import { Box, Typography } from '@mui/material';
import DashboardCard from './DashboardCard';

const LocationDetails = ({ pollingHours, startDate, endDate }) => {
	return <Box></Box>;
};
const LocationCard = ({ location }) => {
	// 	{
	// 	address: {
	// 		locationName: 'JOHN LANDES COMMUNITY CTR-MTG RM',
	// 		line1: '2855 CEDAR RD ',
	// 		city: 'OCEANSIDE',
	// 		state: 'CA',
	// 		zip: '92056',
	// 	},
	// 	pollingHours: 'Tue, Nov 8: 7 am - 8 pm',
	// 	startDate: '2022-11-08',
	// 	endDate: '2022-11-08',
	// },
	const pollingHours = location['pollingHours'];
	const startDate = location['startDate'];
	const endDate = location['endDate'];
	const addressObject = location['address'];

	const locationName = addressObject['locationName'];
	const address = `${addressObject['line1']} ${addressObject['city']}, ${addressObject['state']}`;
	const zipCode = addressObject['zip'];

	return (
		<Box>
			<Typography>{locationName}</Typography>
			<Typography>Address: {address}</Typography>
			<Typography>ZipCode: {zipCode}</Typography>
			<LocationDetails
				pollingHours={pollingHours}
				startDate={startDate}
				endDate={endDate}
			/>
		</Box>
	);
};
const LocationCards = ({ locations }) => {
	const locationCards = locations.map((location) => {
		return <LocationCard location={location} />;
	});

	return <Box>{locationCards}</Box>;
};

function PollingLocationsCard({ locations }) {
	return (
		<DashboardCard
			title={'Polling Locations'}
			content={locations && <LocationCards locations={locations} />}
		/>
	);
}

export default PollingLocationsCard;
