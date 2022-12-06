import React from 'react';

import {
	Box,
	Stack,
	IconButton,
	Link,
	Divider,
	Toolbar,
	Tooltip,
} from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone'; //  // Copy the text inside the text field --> navigator.clipboard.writeText(copyText.value);

export default function OfficialAccordion ({ representatives }) {
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
	const TheOfficial = ({ official }) => {
		const name = official['name'];
		let party = official['party'];
		const phone = official['phones'];
	

		if (party) {
			party = party.replace(' Party', '');
			party = party.replace('Democratic', 'Democrat');
		}

		return (
			<Box p={1}>
				<Stack direction={'row'} alignItems={'center'} spacing={2}>
					<Box width={'80%'}>
						<Typography variant={'body1'}>{name}</Typography>
						<Typography variant={'body2'} color={'text.secondary'}>
							{party}
						</Typography>
					</Box>

					<ContactInformation phone={phone} />
				</Stack>
				<Box pt={2}>
					<Divider />
				</Box>
			</Box>
		);
	};
    

	const RepresentativeAccordian = ({ representative}) => {
		//console.log(contest);
		let office = representative['office'];
		const official = representative['official'];

	
		return (
			<Accordion
				expanded={expanded === office}
                onChange={handleChange(office)}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls={`${office}-content`}
					id={`${office}-header`}
				>
					<Typography sx={{ width: '70%', flexShrink: 0 }}>
						{office}
					</Typography>
					
				</AccordionSummary>
				<AccordionDetails>
                   <TheOfficial official={official} />
				</AccordionDetails>
			</Accordion>
		);
	};

	const RepresentativeAccordians = ({ representatives }) => {
	
        //console.log(representatives);

		const accordians = representatives.map((representative) => {
			return <RepresentativeAccordian representative={representative} />; 
		});

		return accordians;
	};

	return (
		<div>
			<RepresentativeAccordians representatives={representatives} />
		</div>
	);
}
