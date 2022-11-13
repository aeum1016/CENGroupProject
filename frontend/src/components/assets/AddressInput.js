import { React, useState } from 'react';
import {
	Stack,
	TextField,
	MenuItem,
	IconButton,
	Paper,
	Divider,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import states from '../../data/states'; // TODO: consider replacing with npm package such as react-select-us-states

function AddressInput() {
	// state for the different address components
	const [streetAddress, setStreetAddress] = useState(null);
	const [streetAddressError, setStreetAddressError] = useState(false);

	const [city, setCity] = useState(null);
	const [cityError, setCityError] = useState(false);

	const [state, setState] = useState(null); // don't need error checking here because it's a dropdown
	const [stateError, setStateError] = useState(false);

	// functions to change the address
	const handleStreetAddressChange = (event) => {
		const newValue = event.target.value;
		// TODO: check value against regex to set error value
		setStreetAddressError(false);
		setStreetAddress(newValue);
	};
	const handleCityChange = (event) => {
		const newValue = event.target.value;
		// TODO: check value against regex to set error value
		setCityError(false);
		setCity(newValue);
	};
	const handleStateChange = (event) => {
		// TODO: check value against regex to set error value
		setStateError(false);
		setState(event.target.value);
	};

	// store address in local storage
	const submitAddress = () => {
		const address = `${streetAddress} ${city}, ${state}`;
		if (!streetAddress) {
			setStreetAddressError(true);
		}
		if (!city) {
			setCityError(true);
		}
		if (!state) {
			setStateError(true);
		}

		if (!(streetAddressError || cityError || stateError)) {
			localStorage['address'] = address;
		}
	};

	return (
		<Stack
			direction='row'
			spacing={2}
			justifyContent='center'
			alignItems='start'
		>
			<TextField
				id='street-address'
				label='Street Address'
				helperText={streetAddressError ? 'Ex: 607 Carpenter Way' : ' '}
				onChange={handleStreetAddressChange}
				error={streetAddressError}
				size={'small'}
				fullWidth
				required
			/>
			<TextField
				id='city'
				label='City'
				helperText={cityError ? 'Ex: Auburn' : ' '}
				onChange={handleCityChange}
				error={cityError}
				size={'small'}
				fullWidth
				required
			/>
			<TextField
				select
				id='state'
				value={state}
				label='State'
				helperText={' '}
				onChange={handleStateChange}
				error={stateError}
				size={'small'}
				fullWidth
				required
			>
				{states.map((state) => {
					return <MenuItem value={state}>{state}</MenuItem>;
				})}
			</TextField>
			<IconButton size='large' onClick={submitAddress}>
				<SearchOutlinedIcon />
			</IconButton>
		</Stack>
	);
}

export default AddressInput;
