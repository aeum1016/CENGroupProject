import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { gapi } from 'gapi-script';

import { Container } from '@mui/material';

import './App.css';
import AccountPage from './components/pages/AccountPage';
import InformationPage from './components/pages/InformationPage';
import LandingPage from './components/pages/LandingPage';

function App() {
	const [user, setUser] = useState(null);

	const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

	// initialize client once for every render
	useEffect(() => {
		console.log(CLIENT_ID);
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
			<Container>
				<Router>
					<Routes>
						<Route path='/' element={mainPage} />
						<Route path='/account' element={<AccountPage />} />
					</Routes>
				</Router>
			</Container>
		</div>
	);
}

export default App;
