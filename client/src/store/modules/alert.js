const alertModule = {
	state: {
		alert: '',
		action: ''
	},
	actions: {
		setAlert({ commit }, data) {
			commit('updateAlert', data)
		},
		setAction({ commit }, data) {
			commit('updateAction', data)
		}
	},
	mutations: {
		updateAlert(state, data) {
			state.alert = data
		},
		updateAction(state, data) {
			state.action = data
		}
	},
	getters: {
		alert(state) {
			return state.alert
		},
		action(state) {
			return state.action
		}
	}
}

export default alertModule
