export default {
	app: {
		title: 'Truco',
		madeBy: 'Made by',
		seeOnGithub: 'View on Github'
	},
	common: {
		yes: 'Yes',
		no: 'No',
		ok: 'Ok',
		next: 'Next',
		back: 'Back',
		type: 'Type',
		category: 'Category',
		categories: 'Categories',
		upload: 'Upload',
		uploads: 'Uploads',
		today: 'Today',
		emoji: 'Emoji',
		new: 'New',
		newO: 'New',
		contact: 'Contact',
		since: 'Since',
		until: 'Until',
		details: 'Details',
		stats: 'Stats',
		nice: 'Nice!',
		history: 'History',
		point: 'Point',
		points: 'Points',
		score: 'Score',
		scored: 'Scored',
		table: 'Table',
		wins: 'Wins',
		losses: 'Losses',
		winLossRatio: 'W/L',
		name: 'Name',
		rank: 'Rank'
	},
	game: {
		teamA: 'Us',
		teamB: 'Them',
		changedName: 'Changed the name to',
		runningMatchs: 'Running Matchs',
		previousMatchs: 'Previous Matchs',
		elevenHand: 'Eleven Hand',
		ironHand: 'Iron Hand'
	},
	menu: {
		home: 'Home',
		play: 'Play',
		about: 'About',
		exit: 'Exit',
		tools: 'Tools',
		settings: 'Settings',
		matchs: 'Matchs',
		teams: 'Teams',
		ranking: 'Ranking'
	},
	actions: {
		start: 'Start',
		delete: 'Delete',
		remove: 'Remove',
		save: 'Save',
		cancel: 'Cancel',
		edit: 'Edit',
		search: 'Search',
		confirm: 'Confirm',
		undo: 'Undo',
		deleteMatchInfo: 'Delete Matches History'
	},
	forms: {
		language: 'Language',
		theme: 'Theme',
		darkMode: 'Dark Mode',
		showMatchHistory: 'Show Match History',
		keepTeamNames: 'Keep Team Names',
		teamName: 'Team Name',
		detect11Hands: 'Detect 11 Hands',
		riskArea: 'Risk Area'
	},
	time: {
		day: 'Day',
		days: 'Days',
		hour: 'Hour',
		hours: 'Hours',
		minute: 'Minute',
		minutes: 'Minutes',
		to: 'to',
		and: 'and'
	},
	themes: {
		default: 'Default',
		dark: 'Dark',
		forest: 'Forest',
		wine: 'Wine',
		orchid: 'Orchid'
	},
	validations: {
		required: 'This field is required.',
		invalid: 'This field is invalid.',
		invalids: 'Fields are empty or invalid.',
		match: 'The fields do not match.',
		alpha: 'The field must contain only letters.',
		numeric: 'The field must contain only numbers.',
		length: 'The field must contain at least ¬ characters.',
		noChanges: 'No changes were made.',
		exists: 'This record already exists.',
		date: 'This field must be a valid date.'
	},
	errors: {
		pages: {
			P403: 'Access Denied',
			P404: 'Route Undefined'
		},
		content: {
			noTeams: 'There are no teams to display.'
		}
	},
	alerts: {
		game: {
			save: 'Are you sure you want to save this match?',
			reset: 'Are you sure you want to reset this match?',
			winner: '§ won the match!'
		},
		app: {
			reset: 'Are you sure you want to delete all the matches information? This action cannot be undone.'
		}
	},
	$vuetify: {
		badge: 'Badge',
		close: 'Close',
		dataIterator: {
			noResultsText: 'No matching records found',
			loadingText: 'Loading items...'
		},
		dataTable: {
			itemsPerPageText: 'Rows per page:',
			ariaLabel: {
				sortDescending: 'Sorted descending.',
				sortAscending: 'Sorted ascending.',
				sortNone: 'Not sorted',
				activateNone: 'Activate to remove sorting.',
				activateDescending: 'Activate to sort descending.',
				activateAscending: 'Activate to sort ascending.'
			},
			sortBy: 'Sort by'
		},
		dataFooter: {
			itemsPerPageText: 'Items per page:',
			itemsPerPageAll: 'All',
			nextPage: 'Next page',
			prevPage: 'Previous page',
			firstPage: 'First page',
			lastPage: 'Last page',
			pageText: '{0}-{1} of {2}'
		},
		datePicker: {
			itemsSelected: '{0} selected'
		},
		noDataText: 'No data available',
		carousel: {
			prev: 'Previous visual',
			next: 'Next visual',
			ariaLabel: {
				delimiter: 'Carousel slide {0} of {1}'
			}
		},
		calendar: {
			moreEvents: '{0} more'
		},
		fileInput: {
			counter: '{0} files',
			counterSize: '{0} files ({1} in total)'
		},
		timePicker: {
			am: 'AM',
			pm: 'PM'
		}
	}
}
