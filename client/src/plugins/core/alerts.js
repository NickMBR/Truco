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
				action: 'RESET_MATCH'
			},
			{
				type: 'red darken-2',
				title: 'common.no',
				action: 'CLOSE_ALERT'
			}
		],
		options: {
			persistent: true,
			width: 400
		}
	},
	{
		id: 'SAVE_MATCH',
		type: 'DANGER',
		title: 'actions.confirm',
		description: 'alerts.game.save',
		buttons: [
			{
				type: 'success',
				title: 'common.yes',
				action: 'SAVE_MATCH'
			},
			{
				type: 'red darken-2',
				title: 'common.no',
				action: 'CLOSE_ALERT'
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
				action: 'CLOSE_ALERT'
			}
		],
		options: {
			persistent: true,
			width: 400
		}
	}
]

export default alerts
