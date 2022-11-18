import axios from 'axios';
import React from 'react';
import AddressInput from '../assets/AddressInput';

function InformationPage({ user }) {
	return (
		<div>
			<h1>InformationPage</h1>
			<AddressInput />
		</div>
	);
}

export default InformationPage;
