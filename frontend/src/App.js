import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gapi } from 'gapi-script';

import { Container, Box, Typography, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import AppBar from './components/assets/AppBar';
import AccountPage from './components/pages/AccountPage';
import InformationPage from './components/pages/InformationPage';
import LandingPage from './components/pages/LandingPage';

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#4bc0f1',
			light: '#b2e4f9',
			dark: '#0085cb',
		},
		secondary: {
			main: '#fa902a',
			dark: '#f87224',
			light: '#ffdf8a',
		},
		background: {
			paper: '#005496',
			default: '#00213d',
		},
		text: {
			hint: '#fa902a',
			secondary: '#b2e4f9',
			disabled: '#e1f4fd',
		},
	},
	typography: {
		fontFamily: 'Lato',
		h1: {
			fontSize: '3rem',
			fontWeight: 500,
		},
		h2: {
			fontSize: '2.7rem',
			fontWeight: 500,
		},
		h3: {
			fontSize: '2.5rem',
			fontWeight: 500,
		},
		h4: {
			fontSize: '2.2rem',
		},
		h5: {
			fontSize: '2rem',
		},
		h6: {
			fontSize: '1.7rem',
			fontWeight: 300,
		},
		button: {
			fontWeight: 600,
		},
		subtitle1: {
			fontWeight: 400,
			fontSize: '1.5rem',
		},
		subtitle2: {
			fontWeight: 400,
			fontSize: '1.2rem',
		},
		body1: {
			fontSize: '1.2rem',
			fontWeight: 300,
		},
		body2: {
			fontSize: '1rem',
			fontWeight: 300,
		},
	},
});

function App() {
	const [user, setUser] = useState(null); // profile object from google sign in

	const CLIENT_ID = process.env.REACT_APP_CLIENT_ID; // client id for google login

	// initialize client once for every render
	useEffect(() => {
		const initClient = () => {
			gapi.client.init({
				clientId: CLIENT_ID,
				scope: '',
			});
		};
		gapi.load('client:auth2', initClient);
	});

	// if the user exists show the information page else show the landing page with the login
	const mainPage = user ? (
		<InformationPage user={user} />
	) : (
		<LandingPage clientId={CLIENT_ID} setUser={setUser} />
	);

	return (
		<div className='App'>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppBar user={user} />
				<Container>
					<Router>
						<Routes>
							<Route path='/' element={mainPage} />
							<Route path='/account' element={<AccountPage />} />
						</Routes>
					</Router>
				</Container>
			</ThemeProvider>
		</div>
	);
}

export default App;
