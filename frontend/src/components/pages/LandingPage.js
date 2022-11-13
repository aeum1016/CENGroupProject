import React from 'react';
import LoginInput from '../assets/LoginInput';

function LandingPage({ clientId, setUser }) {
	return (
		<div>
			<LoginInput clientId={clientId} setUser={setUser} />
		</div>
	);
}

export default LandingPage;
