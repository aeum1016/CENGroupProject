import React from 'react';
import LoginInput from '../assets/LoginInput';

function LandingPage({ clientId, setUser }) {
	return (
		<div>
			<h1>Political Resource Hub</h1>
			<LoginInput clientId={clientId} setUser={setUser} />
		</div>
	);
}

export default LandingPage;
