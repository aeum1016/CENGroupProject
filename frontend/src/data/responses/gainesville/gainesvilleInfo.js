export default {
	votingInformation: {
		pollingLocations: [
			{
				address: {
					locationName: 'Florida Museum of Natural History',
					line1: '3215 Hull Road',
					city: 'Gainesville',
					state: 'FL',
					zip: '32611',
				},
				pollingHours: 'Tue, Nov 8: 7 am - 7 pm',
				startDate: '2022-11-08',
				endDate: '2022-11-08',
			},
		],
		dropOffLocations: [
			{
				address: {
					locationName:
						'Alachua County Supervisor of Elections Office',
					line1: '515 N Main St',
					city: 'Gainesville',
					state: 'FL',
					zip: '32601',
				},
				pollingHours:
					'Sun, Nov 6: 9 am - 6 pm\nMon, Nov 7: 9 am - 6 pm\nTue, Nov 8: 7 am - 7 pm',
				startDate: '2022-10-24',
				endDate: '2022-10-24',
			},
		],
	},
	helpfulUrls: {
		electionInfo: 'https://dos.myflorida.com/elections/',
		electionRegistration: 'https://registertovoteflorida.gov/home',
		electionRegistrationConfirmation:
			'https://registration.elections.myflorida.com/CheckVoterStatus',
		absenteeVoting:
			'https://dos.myflorida.com/elections/for-voters/voting/vote-by-mail/',
		votingLocationFinder:
			'https://dos.myflorida.com/elections/for-voters/check-your-voter-status-and-polling-place/voter-precinct-lookup/',
		ballotInfo:
			'https://dos.myflorida.com/elections/for-voters/check-your-voter-status-and-polling-place/vote-by-mail-ballot-information-and-status-lookup/',
	},
};
