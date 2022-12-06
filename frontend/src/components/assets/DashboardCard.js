import React from 'react';
import {
	Card,
	CardHeader,
	CardContent,
	Typography,
	Container,
	Divider,
} from '@mui/material';

function DashboardCard({ title, subheader, content }) {
	const card = (
		<Card>
			<CardHeader
				title={<Typography variant='h8'>{title}</Typography>}
				subheader={subheader ? subheader : ''}
				// action={
				// 	<IconButton>
				// 		<ExpandMoreIcon />
				// 	</IconButton>
				// }
			/>
			<Container>
				<Divider />
			</Container>
			{content && <CardContent>{content}</CardContent>}
		</Card>
	);

	return card;
}

export default DashboardCard;
