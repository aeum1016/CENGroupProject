import React from 'react';

import { Box, Stack, IconButton, Link } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone'; //  // Copy the text inside the text field --> navigator.clipboard.writeText(copyText.value);
import EmailIcon from '@mui/icons-material/Email'; // <a href = "mailto: abc@example.com">Send Email</a>

export default function ElectionAccordions({ contests }) {
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (ballotTitle) => (event, isExpanded) => {
		setExpanded(isExpanded ? ballotTitle : false);
	};

	// 	{
	// 	ballotTitle: 'U.S. Senator',
	// 	office: 'U.S. Senator ((unexpired))',
	// 	candidates: [
	// 		{
	// 			name: 'Mark P. Meuser',
	// 			party: 'Republican Party',
	// 			phone: '(209) 763-8737',
	// 			email: 'contact@markmeuser.com',
	// 		},
	// 		{
	// 			name: 'Alex Padilla',
	// 			party: 'Democratic Party',
	// 			phone: '(213) 342-6869',
	// 			email: 'info@alex-padilla.com',
	// 		},
	// 	],
	// },

	const Candidate = ({ candidate }) => {
		const name = candidate['name'];
		const party = candidate['party'];
		const phone = candidate['phone'];
		const email = candidate['email'];

		const phoneToClipboard = () => {
			navigator.clipboard.writeText(phone);
		};

		const emailToClipboard = () => {
			navigator.clipboard.writeText(email);
		};

		return (
			<Stack direction={'row'} alignItems={'center'} spacing={2}>
				<Typography variant={'body1'}>{name}</Typography>
				<Typography variant={'body2'}>{party}</Typography>

				<Box justifySelf={'flex-end'}>
					{phone && (
						<IconButton onClick={phoneToClipboard}>
							<PhoneIcon />
						</IconButton>
					)}
					{email && (
						<Link>
							<IconButton onClick={emailToClipboard}>
								<EmailIcon />
							</IconButton>
						</Link>
					)}
				</Box>
			</Stack>
		);
	};
	const CandidatesList = ({ candidates }) => {
		const candidatesList = candidates.map((candidate) => {
			return <Candidate candidate={candidate} />;
		});

		return candidatesList;
	};
	const ContestAccordian = ({ contest }) => {
		console.log(contest);
		const ballotTitle = contest['ballotTitle'];
		const office = contest['office'];
		const candidates = contest['candidates'];

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
					<Typography sx={{ width: '33%', flexShrink: 0 }}>
						{ballotTitle}
					</Typography>
					{office !== ballotTitle && (
						<Typography sx={{ color: 'text.secondary' }}>
							{office}
						</Typography>
					)}
				</AccordionSummary>
				<AccordionDetails>
					<CandidatesList candidates={candidates} />
				</AccordionDetails>
			</Accordion>
		);
	};

	const ContestAccordians = ({ contests }) => {
		const accordians = contests.map((contest) => {
			return <ContestAccordian contest={contest} />;
		});

		return accordians;
	};

	return (
		<div>
			{/* <Accordion
				expanded={expanded === 'panel1'}
				onChange={handleChange('panel1')}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1bh-content'
					id='panel1bh-header'
				>
					<Typography sx={{ width: '33%', flexShrink: 0 }}>
						Accordian Title
					</Typography>
					<Typography sx={{ color: 'text.secondary' }}>
						Accordian Description
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Nulla facilisi. Phasellus sollicitudin nulla et quam
						mattis feugiat. Aliquam eget maximus est, id dignissim
						quam.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion
				expanded={expanded === 'panel2'}
				onChange={handleChange('panel2')}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel2bh-content'
					id='panel2bh-header'
				>
					<Typography sx={{ width: '33%', flexShrink: 0 }}>
						Users
					</Typography>
					<Typography sx={{ color: 'text.secondary' }}>
						You are currently not an owner
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Donec placerat, lectus sed mattis semper, neque lectus
						feugiat lectus, varius pulvinar diam eros in elit.
						Pellentesque convallis laoreet laoreet.
					</Typography>
				</AccordionDetails>
			</Accordion> */}
			<ContestAccordians contests={contests} />
		</div>
	);
}
