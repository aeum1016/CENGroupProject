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
import EmailIcon from '@mui/icons-material/Email'; // <a href = "mailto: abc@example.com">Send Email</a>

export default function ElectionAccordions({ contests }) {
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (ballotTitle) => (event, isExpanded) => {
		setExpanded(isExpanded ? ballotTitle : false);
	};

	const ContactInformation = ({ phone, email }) => {
		const phoneTooltipText = 'Copy Phone Number';
		const emailTooltipText = 'Copy Email';

		const [phoneTooltip, setPhoneTooltip] =
			React.useState(phoneTooltipText);
		const [emailTooltip, setEmailTooltip] =
			React.useState(emailTooltipText);

		const phoneToClipboard = (event) => {
			navigator.clipboard.writeText(phone);
			setPhoneTooltip(`Copied: ${phone}`);
		};
		const emailToClipboard = (event) => {
			navigator.clipboard.writeText(email);
			setEmailTooltip(`Copied: ${email}`);
		};

		const resetPhoneTooltip = () => {
			setPhoneTooltip(phoneTooltipText);
		};
		const resetEmailTooltip = () => {
			setEmailTooltip(emailTooltipText);
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
				{email && (
					<Tooltip
						title={emailTooltip}
						onTransitionEnd={resetEmailTooltip}
					>
						<IconButton onClick={emailToClipboard}>
							<EmailIcon />
						</IconButton>
					</Tooltip>
				)}
			</Box>
		);
	};
	const Candidate = ({ candidate }) => {
		const name = candidate['name'];
		let party = candidate['party'];
		const phone = candidate['phone'];
		const email = candidate['email'];

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

					<ContactInformation phone={phone} email={email} />
				</Stack>
				<Box pt={2}>
					<Divider />
				</Box>
			</Box>
		);
	};
	const CandidatesList = ({ candidates }) => {
		const candidatesList = candidates.map((candidate) => {
			return <Candidate candidate={candidate} />;
		});

		return candidatesList;
	};
	const ContestAccordian = ({ contest }) => {
		//console.log(contest);
		const ballotTitle = contest['ballotTitle'];
		let office = contest['office'];
		const candidates = contest['candidates'];

		if (office && office !== ballotTitle) {
			office = office.replace(ballotTitle, '');
		}

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
						{ballotTitle}
					</Typography>
					{office !== ballotTitle && (
						<Typography
							variant='body2'
							sx={{
								color: 'text.secondary',
							}}
						>
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
		const filteredContests = Array.isArray(contests) ? (
		contests?.filter((contest) => {
			return contest['candidates'].length > 0;
		})) : null;

		let accordians = filteredContests?.map((contest) => {
			return <ContestAccordian contest={contest} />;
		});

		return accordians;
	};

	return (
		<div>
			<ContestAccordians contests={contests} />
		</div>
	);
}
