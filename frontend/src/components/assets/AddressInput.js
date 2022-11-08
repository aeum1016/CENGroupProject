import { React, useState, useEffect } from 'react';
import { Typography, Divider, Stack, FormControl, TextField, InputLabel, MenuItem, Select, IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import states from '../../data/states'; // TODO: consider replacing with npm package such as react-select-us-states
import axios, * as others from 'axios';

function AddressInput() {
	// state for the different address components
	const [streetAddress, setStreetAddress] = useState('');
	const [streetAddressError, setStreetAddressError] = useState(false);

	const [city, setCity] = useState('');
	const [cityError, setCityError] = useState(false);

	const [state, setState] = useState(''); // don't need error checking here because it's a dropdown

	const [resultsReady, setResultsReady] = useState(false);
	const [voterInfo, setVoterInfo] = useState('');
	const [contests, setContests] = useState('');
	const [representatives, setRepresentatives] = useState('');

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
	// const submitAddress = () => {
	// 	const address = `${streetAddress} ${city}, ${state}`;
	// 	localStorage['address'] = address;
	// 	let contests = axios.get(`http://localhost:5500/api/contests/${address}`, {})
	// 	.then((res) => {
	// 		console.log(res);
	// 		setContests(res);
	// 	}, (error => {
	// 		console.log(error);
	// 	}));
	// 	let info = axios.get(`http://localhost:5500/api/voterinfo/${address}`, {})
	// 	.then((res) => {
	// 		console.log(res);
	// 		setVoterInfo(res);
	// 		setResultsReady(true);
	// 	}, (error => {
	// 		console.log(error);
	// 	}));
	// }
	async function submitAddress() {
		const address = `${streetAddress} ${city}, ${state}`;
		localStorage['address'] = address;
		let contests = await axios.get(`http://localhost:5500/api/contests/${address}`, {});
		setContests(contests);

		let info = await axios.get(`http://localhost:5500/api/voterinfo/${address}`, {});
		setVoterInfo(info);
		setResultsReady(true);
	}

	// TODO: Find a better way other than maxWidth to set the width
	// TODO: Make the form look nicer
  return (
	<div>
    <Stack direction='row' spacing={2} justifyContent='center' alignItems='flex-start' maxWidth={600} sx={{m:3}}>
      <TextField
      	id="street-address"
      	label="Street Address"    
      	helperText="Ex: 607 Carpenter Way"
				onChange={handleStreetAddressChange}
				error={streetAddressError}
				fullWidth
      />
			<TextField
      	id="city"
      	label="City"    
      	helperText="Ex: Auburn"
				onChange={handleCityChange}
				error={cityError}
				fullWidth
      />
			<TextField select
				id="state"
				value={state}
				label="State"
				onChange={handleStateChange}
				fullWidth
				
			>
				{states.map((state) => {
					return <MenuItem value={state}>{state}</MenuItem>
				})}
			</TextField>
			<IconButton size='large' onClick={submitAddress}>
				<SearchOutlinedIcon fontSize='inherit'/>
			</IconButton>
    </Stack>

		{resultsReady ?
			<div>
			 	<Typography variant="h3" sx={{m: 4}}> Voting Information </Typography>
			 	<Typography variant="h5" sx={{m: 3}}> Polling Locations </Typography>
			 	{voterInfo.data.votingInformation.pollingLocations.map((obj) => {
					return (
						<div>
							<Typography variant="body1" sx={{m: 0.5}}> {obj.address.locationName} </Typography>
						</div>
					);
				})}
				{/* <Typography variant="h5" sx={{m: 1}}> Early Vote Sites </Typography>
				{voterInfo.data.votingInformation.earlyVoteSites.map((obj) => {
					return (
						<div>
							<Typography variant="body1" sx={{m: 0.5}}> {obj.address.locationName} </Typography>
						</div>
					);
				})} */}
				<Divider sx={{m: 7}}/>
				<Typography variant="h3" sx={{m: 4}}> Contests </Typography>
				{contests.data.map((obj) => {
					return (
						<div>
							<Typography variant="h5" sx={{m: 3}}>  {obj.ballotTitle} </Typography>
							{obj.candidates.map((cand) => {
								return (
									<Typography variant="body1" sx={{m: 0.5}}> {cand.name} </Typography>
								)
							})}
						</div>
					);
				})}
			</div>
		:
		<Typography> </Typography>}

	</div>
  )
}

export default AddressInput