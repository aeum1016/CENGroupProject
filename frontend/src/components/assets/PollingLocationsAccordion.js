import React from 'react';

import {
	Box,
	Stack,
	IconButton,
	Divider,
	Tooltip,
} from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone'; //  // Copy the text inside the text field --> navigator.clipboard.writeText(copyText.value);

export default function PollingLocationsAccordion ({ locations }) {
	const [expanded, setExpanded] = React.useState(false);

    const handleChange = (ballotTitle) => (event, isExpanded) => {
		setExpanded(isExpanded ? ballotTitle : false);
	};


	const ContactInformation = ({ phone }) => {
		const phoneTooltipText = 'Copy Phone Number';
		

		const [phoneTooltip, setPhoneTooltip] =
			React.useState(phoneTooltipText);
		

		const phoneToClipboard = (event) => {
			navigator.clipboard.writeText(phone);
			setPhoneTooltip(`Copied: ${phone}`);
		};
	

		const resetPhoneTooltip = () => {
			setPhoneTooltip(phoneTooltipText);
		};
	

		return (
			<Box>
				{phone && (
					<Tooltip
						title={phoneTooltip}
						onTransitionEnd={resetPhoneTooltip}
					>
						<IconButton onClick={phoneToClipboard}>
							<PhoneIcon />
						</IconButton>
					</Tooltip>
				)}
			</Box>
		);
	};
	const PollingLocationsAccordian = ({ address, location }) => {
		const locationName = address['locationName'];
		const line1 = address['line1'];
		const city = address['city'];
        const state = address['state'];
        const zip = address['zip'];
        const pollingHours = location['pollingHours'];
        const startDate = location['startDate'];
        const endDate = location['endDate'];


        
		return (
			<Accordion
				expanded={expanded === locationName}
                onChange={handleChange(locationName)}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls={`${locationName}-content`}
					id={`${locationName}-header`}
				>
					<Typography sx={{ width: '70%', flexShrink: 0 }}>
						{locationName}
					</Typography>
					
				</AccordionSummary>
				<AccordionDetails>
                    <Box p={1}>
                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                            <Box width={'80%'}>
						        <Typography variant={'body1'}>Address: {line1}</Typography>
						        <Typography variant={'body1'}>City:  {city}</Typography>
                                <Typography variant={'body1'}>State:  {state}</Typography>
                                <Typography variant={'body1'}>Zip: {zip}</Typography>
                                <Typography variant={'body2'} color={'text.secondary'}> PollingHours: {pollingHours}</Typography>
                                <Typography variant={'body2'} color={'text.secondary'}>StartDate: {startDate}</Typography>
                                <Typography variant={'body2'} color={'text.secondary'}>EndDate: {endDate}</Typography>
					        </Box>
                        </Stack>
				        <Box pt={2}>
					        <Divider />
				        </Box>
			        </Box>
			</AccordionDetails>
			</Accordion>
		);
	
	};
    

	const AddressDetails = ({ location }) => {
		const address = location['address'];
        
        return <PollingLocationsAccordian address={address} location={ location }/>;
    };

	const PollingLocationsAccordians = ({ locations }) => {
      
       console.log(locations);

		const accordians = locations.map((location) => {
            return <AddressDetails location={location} />;
        });

		return accordians;
	};

	return (
		<div>
			<PollingLocationsAccordians locations={locations} />
		</div>
	);
}
