import React from 'react';
import DashboardCard from './DashboardCard';
import OfficialAccordion from './OfficialAccordion';


function OfficialsCard({ representatives }) {
	const content = <OfficialAccordion representatives={representatives} />;
	
	return <DashboardCard title={'Legislators'} content={content} />;
}

export default OfficialsCard;
