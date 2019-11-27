const alerts = [
	{
		id: 'CONFIRM_LOGOUT',
		type: 'DANGER',
		title: 'menu.exit',
		description: 'alerts.user.logout',
		buttons: [
			{
				type: 'success',
				title: 'common.yes',
				action: 'USER_CONFIRMED_LOGOUT'
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
		id: 'CONFIRM_REGISTER_CANCELLATION',
		type: 'DANGER',
		title: 'actions.cancel',
		description: 'alerts.entries.cancel',
		buttons: [
			{
				type: 'success',
				title: 'common.yes',
				action: 'REGISTER_WINDOW_CLOSE_CONFIRMED'
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
		id: 'CONFIRM_RECORD_REMOVAL',
		type: 'DANGER',
		title: 'actions.delete',
		description: 'alerts.entries.removal',
		buttons: [
			{
				type: 'success',
				title: 'common.yes',
				action: 'REMOVE_RECORD_CONFIRMED'
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
	}
]

export default alerts
