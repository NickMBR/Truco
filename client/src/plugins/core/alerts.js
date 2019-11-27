const alerts = [
	{
		id: 'TEST_ALERT',
		type: 'DANGER',
		title: 'menu.exit',
		description: 'alerts.test.message',
		buttons: [
			{
				type: 'success',
				title: 'common.yes',
				action: 'CONSOLE_TEST'
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
