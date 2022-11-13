import React from 'react';
import {
	Box,
	Button,
	TextField,
	Stack,
	Typography,
	Paper,
} from '@mui/material';
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
		<Stack
			spacing={4}
			alignItems='center'
			sx={{ width: '50%', margin: 'auto' }}
		>
			<Typography variant='h5'>Login</Typography>
			<Stack spacing={2} width='100%'>
				<TextField id='email' label=' Enter Email' variant='outlined' />
				<TextField
					id='password'
					label='Enter Password'
					variant='outlined'
				/>
				<Button variant='outlined'>Login</Button>
			</Stack>
			<div>- OR -</div>
			<div>
				<GoogleLogin
					clientId={clientId}
					onSuccess={onSuccess}
					onFailure={onFailure}
					cookiePolicy={'single_host_origin'}
					render={(renderProps) => {
						return (
							<Button
								variant='outlined'
								onClick={renderProps.onClick}
							>
								Sign in with Google
							</Button>
						);
					}}
				/>
			</div>
		</Stack>
	);
}

export default LoginInput;
