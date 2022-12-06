import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { gapi } from 'gapi-script';

import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import DefaultTheme from './themes/DefaultTheme';
import AppBar from './components/assets/AppBar';
import AccountPage from './components/pages/AccountPage';
import InformationPage from './components/pages/InformationPage';
import LandingPage from './components/pages/LandingPage';
import store from './data/store'

function App() {
	const [user, setUser] = useState(); // profile object from google sign in

	const CLIENT_ID = process.env.REACT_APP_CLIENT_ID; // client id for google login

	// initialize client once for every render
	useEffect(() => {
		const initClient = () => {
			gapi.auth2.getAuthInstance({
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
			<Provider store={store}>
				<ThemeProvider theme={DefaultTheme}>
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
			</Provider>
		</div>
	);
}

export default App;
