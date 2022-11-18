import { React, useState, useEffect } from 'react';
import {
	Stack,
	FormControl,
	TextField,
	InputLabel,
	MenuItem,
	Select,
	IconButton,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import states from '../../data/states'; // TODO: consider replacing with npm package such as react-select-us-states

function AddressInput() {
	// state for the different address components
	const [streetAddress, setStreetAddress] = useState('');
	const [streetAddressError, setStreetAddressError] = useState(false);

	const [city, setCity] = useState('');
	const [cityError, setCityError] = useState(false);

	const [state, setState] = useState(''); // don't need error checking here because it's a dropdown

	// functions to change the state
	const handleStreetAddressChange = (event) => {
		const newValue = event.target.value;
		// TODO: check value against regex to set error value
		setStreetAddress(newValue);
	};
	const handleCityChange = (event) => {
		const newValue = event.target.value;
		// TODO: check value against regex to set error value
		setCity(newValue);
	};
	const handleStateChange = (event) => {
		setState(event.target.value);
	};

	// store address in local storage
	const submitAddress = () => {
		const address = `${streetAddress} ${city}, ${state}`;
		localStorage['address'] = address;
	};

	// TODO: Find a better way other than maxWidth to set the width
	// TODO: Make the form look nicer
	return (
		<Stack
			direction='row'
			spacing={2}
			justifyContent='center'
			alignItems='flex-start'
			maxWidth={600}
		>
			<TextField
				id='street-address'
				label='Street Address'
				helperText='Ex: 607 Carpenter Way'
				onChange={handleStreetAddressChange}
				error={streetAddressError}
				fullWidth
			/>
			<TextField
				id='city'
				label='City'
				helperText='Ex: Auburn'
				onChange={handleCityChange}
				error={cityError}
				fullWidth
			/>
			<TextField
				select
				id='state'
				value={state}
				label='State'
				onChange={handleStateChange}
				fullWidth
			>
				{states.map((state) => {
					return <MenuItem value={state}>{state}</MenuItem>;
				})}
			</TextField>
			<IconButton size='large' onClick={submitAddress}>
				<SearchOutlinedIcon fontSize='inherit' />
			</IconButton>
		</Stack>
	);
}

export default AddressInput;
