const alerts = [
	{
		id: 'RESET_SCORE',
		type: 'DANGER',
		title: 'actions.confirm',
		description: 'alerts.game.reset',
		buttons: [
			{
				type: 'success',
				title: 'common.yes',
				action: 'RESET_MATCH',
				dark: false
			},
			{
				type: 'red darken-2',
				title: 'common.no',
				action: 'CLOSE_ALERT',
				dark: true
			}
		],
		options: {
			persistent: true,
			width: 400
		}
	},
	{
		id: 'MATCH_WINNER',
		type: 'WINNER',
		title: 'common.nice',
		description: 'alerts.game.winner',
		buttons: [
			{
				type: 'success',
				title: 'common.ok',
				action: 'SAVE_AND_RESET_MATCH',
				dark: false
			}
		],
		options: {
			persistent: true,
			width: 400
		}
	},
	{
		id: 'DELETE_MATCH_INFO',
		type: 'DANGER',
		title: 'actions.confirm',
		description: 'alerts.app.reset',
		buttons: [
			{
				type: 'success',
				title: 'common.yes',
				action: 'DELETE_MATCH_INFO',
				dark: false
			},
			{
				type: 'red darken-2',
				title: 'common.no',
				action: 'CLOSE_ALERT',
				dark: true
			}
		],
		options: {
			persistent: true,
			width: 400
		}
	}
]

export default alerts
