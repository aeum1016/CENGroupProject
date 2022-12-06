import React from 'react';
import DashboardCard from './DashboardCard';
import ElectionAccordions from './ElectionAccordions';

function ElectionsCard({ contests }) {
	const content = <ElectionAccordions contests={contests} />;
	return <DashboardCard title={'Elections'} content={content} />;
}

export default ElectionsCard;
