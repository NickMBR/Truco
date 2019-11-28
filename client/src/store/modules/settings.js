const settingsModule = {
	state: {
		themeGradient: 'to top, rgba(119,67,210,.4), rgba(88,49,156,.6)',
		colorMode: false
	},
	actions: {
	},
	mutations: {
		updateThemeGradient(state, data) {
			state.themeGradient = data
		},
		updateColorMode(state, data) {
			/*
				ON DEFAULT THEME, THE PRIMARY COLOR IS WHITE
				WHEN THE DARK MODE IS SET TO TRUE, ALL PRIMARY SETTINGS HAS A WHITE CONTENT
				TURN THIS CONTENT BLACK!
			*/

			if (data.darkMode && data.theme === 'default') {
				state.colorMode = true
			}
			else {
				state.colorMode = false
			}
		}
	},
	getters: {
		themeGradient(state) {
			return state.themeGradient
		},
		colorMode(state) {
			return state.colorMode
		}
	}
}

export default settingsModule
