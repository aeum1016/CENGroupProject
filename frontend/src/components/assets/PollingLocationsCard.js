import React from 'react';
import DashboardCard from './DashboardCard';
import PollingLocationsAccordion from './PollingLocationsAccordion'

function PollingLocationsCard({ locations }) {
	const content = <PollingLocationsAccordion locations={locations} />;	
	
	return <DashboardCard title={'Polling Locations'} content={content} />;
}

export default PollingLocationsCard;
