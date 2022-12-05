import React from 'react';
import { Stack, Box, Grid, Typography, IconButton } from '@mui/material';

import ElectionsCard from './ElectionsCard';
import OfficialsCard from './OfficialsCard';
import PollingLocationsCard from './PollingLocationsCard';
import HelpfulLinksCard from './HelpfulLinksCard';

function Dashboard({ voterInfo, contests, representatives }) {
	const links = Object.values(voterInfo['helpfulUrls']);

	const grid = (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: 'repeat(4, 1fr)',
				gap: 1,
				gridTemplateRows: 'auto',
				gridTemplateAreas: `"top top top top" "left left right right" "left left right right"`,
			}}
		>
			<Box sx={{ gridArea: 'top' }}>
				<HelpfulLinksCard links={links} />
			</Box>
			<Box sx={{ gridArea: 'left' }}>
				<ElectionsCard contests={contests} />
			</Box>
			<Stack spacing={1} sx={{ gridArea: 'right' }}>
				<OfficialsCard representatives={representatives} />
				<PollingLocationsCard />
			</Stack>
		</Box>
	);

	return grid;
}

export default Dashboard;
