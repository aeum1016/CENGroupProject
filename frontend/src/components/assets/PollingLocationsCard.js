import React from 'react';
import {
	Container,
	Box,
	Divider,
	Link,
	IconButton,
	Typography,
} from '@mui/material';
import DashboardCard from './DashboardCard';

import MapIcon from '@mui/icons-material/Map';
import { Stack } from '@mui/system';

const LocationIconButton = ({ line1, city, state, zipCode }) => {
	let URL = `https://www.google.com/maps/place/${line1}, ${city}, ${state} ${zipCode}/`;

	return (
		<Link href={URL} target={'_blank'}>
			<IconButton>
				<MapIcon />
			</IconButton>
		</Link>
	);
};
const LocationCard = ({ location }) => {
	const pollingHours = location['pollingHours'];
	const addressObject = location['address'];

	const capitalize = (str) => {
		let newStr = str.toLowerCase();
		return newStr.charAt(0).toUpperCase() + newStr.slice(1);
	};

	const titleCase = (str) => {
		console.log(str);
		let newStr = str.toLowerCase();
		let newTokenizedStr = newStr.split(' ');

		if (newTokenizedStr.length < 1) {
			return capitalize(newTokenizedStr[0]);
		}

		newStr = newTokenizedStr
			.map((element) => {
				return capitalize(element);
			})
			.join(' ');

		return newStr;
	};

	// TODO: Polling hours for CA includes this information so leaving it out until needed
	// const startDate = location['startDate'];
	// const endDate = location['endDate'];

	const locationName = titleCase(addressObject['locationName']);
	const line1 = titleCase(addressObject['line1']);
	const city = titleCase(addressObject['city']);
	const state = titleCase(addressObject['state']);
	const zipCode = addressObject['zip'];

	return (
		<Container>
			<Box
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<Stack p={1} spacing={1}>
					<Typography>{locationName}</Typography>
					<Typography variant='body2'>{pollingHours}</Typography>
				</Stack>
				<LocationIconButton
					line1={line1}
					city={city}
					state={state}
					zipCode={zipCode}
				/>
			</Box>
			<Box pt={1}>
				<Divider />
			</Box>
		</Container>
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
