import { React, useState, useEffect } from 'react';
import { update } from './addressSlice';
import { useDispatch } from 'react-redux';
import {
	Stack,
	TextField,
	MenuItem,
	IconButton,
	Paper,
	Divider,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EditIcon from '@mui/icons-material/Edit';

import states from '../../data/states'; // TODO: consider replacing with npm package such as react-select-us-states


function AddressInput() {
	const dispatch = useDispatch();

	// state for the different address components
	const [streetAddress, setStreetAddress] = useState(
		localStorage['streetAddress']
	);
	const [streetAddressError, setStreetAddressError] = useState(false);

	const [city, setCity] = useState(localStorage['city']);
	const [cityError, setCityError] = useState(false);

	const [state, setState] = useState(localStorage['state']);
	const [stateError, setStateError] = useState(false);

	// state for overall adress component
	const [address, setAddress] = useState(localStorage['address']);

	// state for making the form disabled
	const [isDisabled, setIsDisabled] = useState(false);

	useEffect(() => {
		// clearAddress(); // uncomment this to clear the localStorage when this component is rendered
		if (address) {
			setIsDisabled(!isDisabled);
		}
	}, []);

	useEffect(() => {
		localStorage['streetAddress'] = streetAddress;
		localStorage['city'] = city;
		localStorage['state'] = state;
		localStorage['address'] = address;
		dispatch(update(address))
		console.log('New address set');
	}, [address]);

	// helper function to wipe the application state and local storage
	const clearAddress = () => {
		localStorage['streetAddress'] = '';
		setStreetAddress('');

		localStorage['city'] = '';
		setCity('');

		localStorage['state'] = '';
		setState('');

		localStorage['address'] = '';
		setState('');
	};

	// functions to change the address
	const handleStreetAddressChange = (event) => {
		const newValue = event.target.value;
		// TODO: check value against regex to set error value
		if (!newValue || newValue == '') {
			setStreetAddressError(true);
		} else {
			setStreetAddressError(false);
		}
		setStreetAddress(newValue);
	};
	const handleCityChange = (event) => {
		const newValue = event.target.value;
		// TODO: check value against regex to set error value
		if (!newValue || newValue == '') {
			setCityError(true);
		} else {
			setCityError(false);
		}
		setCity(newValue);
	};
	const handleStateChange = (event) => {
		const newValue = event.target.value;
		// TODO: check value against regex to set error value
		if (!newValue || newValue == '') {
			setStateError(true);
		} else {
			setStateError(false);
		}
		setState(newValue);
	};

	// store address in local storage
	const storeAddress = () => {
		let error = false;
		// if the error state has not been set yet in the onChange handlers handle that here
		if (!streetAddress || streetAddress == '') {
			setStreetAddressError(true);
			error = true;
		}
		if (!city || city == '') {
			setCityError(true);
			error = true;
		}
		if (!state || state == '') {
			setStateError(true);
			error = true;
		}
		if (!error) {
			const newAddress = `${streetAddress} ${city}, ${state}`;
			setAddress(newAddress);
			setIsDisabled(!isDisabled);
		}
	};
	// put the address form into input mode
	const editAddress = () => {
		setIsDisabled(!isDisabled);
	};
	const onClick = () => {
		if (isDisabled) {
			editAddress();
		} else {
			storeAddress();
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
				value={streetAddress}
				label='Street Address'
				helperText={streetAddressError ? 'Ex: 607 Carpenter Way' : ' '}
				onChange={handleStreetAddressChange}
				error={streetAddressError}
				size={'small'}
				fullWidth
				required
				disabled={isDisabled}
			/>
			<TextField
				id='city'
				value={city}
				label='City'
				helperText={cityError ? 'Ex: Auburn' : ' '}
				onChange={handleCityChange}
				error={cityError}
				size={'small'}
				fullWidth
				required
				disabled={isDisabled}
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
				disabled={isDisabled}
			>
				{states.map((state) => {
					return (
						<MenuItem key={state} value={state}>
							{state}
						</MenuItem>
					);
				})}
			</TextField>
			<IconButton size='large' onClick={onClick}>
				{isDisabled ? <EditIcon /> : <SearchOutlinedIcon />}
			</IconButton>
		</Stack>
	);
}

export default AddressInput;
