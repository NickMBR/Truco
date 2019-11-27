const settingsModule = {
	state: {
		themeGradient: 'to top, rgba(119,67,210,.4), rgba(88,49,156,.6)'
	},
	actions: {
	},
	mutations: {
		updateThemeGradient(state, data) {
			state.themeGradient = data
		}
	},
	getters: {
		themeGradient(state) {
			return state.themeGradient
		}
	}
}

export default settingsModule
