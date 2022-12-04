import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import DashboardCard from './DashboardCard';

const ResourceLink = ({ text, link }) => {
	return (
		<Link
			href={link}
			underline='hover'
			variant={'body2'}
			color={'white'}
			target='_blank'
		>
			{text}
		</Link>
	);
};

function HelpfulLinksCard({ links }) {
	const content = (
		<>
			{links?.map((link) => {
				return (
					<div>
						<ResourceLink text={link} link={link} />
					</div>
				);
			})}
		</>
	);
	return <DashboardCard title={'Helpful Links'} content={content} />;
}

export default HelpfulLinksCard;
