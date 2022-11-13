import { React } from 'react';
import { AppBar as MUIAppBar, Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from 'react-router-dom';
import AddressInput from './AddressInput';

function AppBar({ user }) {
	return (
		<MUIAppBar position='static' sx={{ height: '14vh', marginBottom: 4 }}>
			<Box padding={4}>
				<Stack
					spacing={2}
					direction='row'
					justifyContent='space-between'
				>
					<Typography variant='h3'>
						<LanguageIcon
							fontSize='inherit'
							sx={{ marginRight: 2 }}
						/>
						Political Resource Hub
					</Typography>
					{user && <AddressInput />}
				</Stack>
			</Box>
		</MUIAppBar>
	);
}

export default AppBar;
