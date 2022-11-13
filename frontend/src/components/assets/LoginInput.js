import React from 'react';
import { Box, Button, TextField, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

function LoginInput({ clientId, setUser }) {
	const onSuccess = (res) => {
		setUser(res.profileObj);
	};
	const onFailure = (err) => {
		console.log(`Error: ${err}`);
	};

	return (
		<Stack direction='column' width={'30%'} margin={'auto'} spacing={4}>
			<TextField
				fullwidth
				id='email'
				label=' Enter Email'
				variant='outlined'
			/>
			<TextField
				id='password'
				label='Enter Password'
				variant='outlined'
			/>
			<Button variant='contained'>Login</Button>
			<div>- OR -</div>
			<div>
				<GoogleLogin
					clientId={clientId}
					buttonText='Sign in with Google'
					onSuccess={onSuccess}
					onFailure={onFailure}
					cookiePolicy={'single_host_origin'}
				/>
			</div>
		</Stack>
	);
}

export default LoginInput;
