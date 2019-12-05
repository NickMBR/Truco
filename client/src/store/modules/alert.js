const alertModule = {
	state: {
		alert: '',
		alertContent: '',
		action: ''
	},
	actions: {
		setAlert({ commit }, content) {
			commit('updateAlert', content.alert)
			commit('updateAlertContent', content.data)
		},
		setAction({ commit }, content) {
			commit('updateAction', content)
		},
		resetAlert({ commit }) {
			commit('updateAlert', '')
			commit('updateAlertContent', '')
		}
	},
	mutations: {
		updateAlert(state, content) {
			state.alert = content
		},
		updateAlertContent(state, content) {
			state.alertContent = content
		},
		updateAction(state, content) {
			state.action = content
		}
	},
	getters: {
		alert(state) {
			return state.alert
		},
		alertContent(state) {
			return state.alertContent
		},
		action(state) {
			return state.action
		}
	}
}

export default alertModule
