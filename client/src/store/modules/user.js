import api from '../../plugins/core/api'
import moment from 'moment'

const userModule = {
	state: {
		user: [],
		themeGradient: 'to top, rgba(119,67,210,.4), rgba(88,49,156,.6)'
	},
	actions: {
		setUser({ commit }, data) {
			commit('updateUser', data)
		},
		refreshUserData({ commit }, data) {
			// test
		},
		doRegister({ commit }, data) {
			return new Promise((resolve, reject) => {
				if (data && data.email) {
					api.post('http://localhost:1131/users/register', { data }).then(result => {
						if (result) {
							if (result.remember) {
								localStorage.setItem('token', result.token)
							}
							else {
								sessionStorage.setItem('token', result.token)
							}

							resolve()
						}
						else {
							reject(new Error('NO_RESULT_AFTER_REGISTER'))
						}
					}).catch(error => {
						reject(error)
					})
				}
				else {
					reject(new Error('NO_DATA_TO_REGISTER'))
				}
			})
		},
		doLogin({ commit }, data) {
			return new Promise((resolve, reject) => {
				if (data && data.email) {
					api.post('http://localhost:1131/users/login', { data }).then(result => {
						if (result) {
							if (result.remember) {
								localStorage.setItem('token', result.token)
							}
							else {
								sessionStorage.setItem('token', result.token)
							}

							resolve()
						}
						else {
							reject(new Error('NO_RESULT_AFTER_LOGIN'))
						}
					}).catch(error => {
						reject(error)
					})
				}
				else {
					reject(new Error('NO_DATA_TO_LOGIN'))
				}
			})
		},
		doLogout({ state }) {
			return new Promise((resolve, reject) => {
				if (state.user && state.user.id) {
					api.post('http://localhost:1131/users/logout', { id: state.user.id }).then(() => {
						resolve()
					}).catch(() => {
						resolve()
					})
				}
				else {
					resolve()
				}
			})
		},
		updateUserLanguage({ state }, data) {
			if (state.user && state.user.id) {
				let userData = {
					id: state.user.id,
					language: data
				}

				api.post('http://localhost:1131/users/language/update', { data: userData }).then(() => {
					localStorage.setItem('dt-lang', data)

					if (data.includes('pt')) {
						moment.locale('pt')
					}
					else {
						moment.locale('en')
					}
				}).catch(() => {})
			}
		},
		updateUserTheme({ state }, data) {
			if (state.user && state.user.id) {
				let userData = {
					id: state.user.id,
					theme: data
				}

				api.post('http://localhost:1131/users/theme/update', { data: userData }).then(() => {
					localStorage.setItem('dt-theme', data)
				}).catch(() => {})
			}
		},
		updateUserDarkMode({ state }, data) {
			if (state.user && state.user.id) {
				let userData = {
					id: state.user.id,
					dark: data
				}

				api.post('http://localhost:1131/users/darkmode/update', { data: userData }).then(() => {
					localStorage.setItem('dt-dark', data)
				}).catch(() => {})
			}
		},
		updateUserPhoto({ commit, state }, payload) {
			api.post('http://localhost:1131/users/image/update', { data: { id: state.user.id, image: payload } }).then(() => {
				api.get('http://localhost:1131/users/id', { id: state.user.id }).then(result => {
					commit('updateUser', result)
				}).catch(() => {})
			}).catch(() => {})

			// commit('updateUserPhoto', data)
		}
	},
	mutations: {
		updateUser(state, data) {
			state.user = data
		},
		resetUser(state) {
			state.user = []
		},
		updateUserPhoto(state, payload) {
			if (state.user && state.user.id && payload) {
				api.post('http://localhost:1131/users/image/update', { data: { id: state.user.id, image: payload } }).catch(() => {})
			}
		},
		updateThemeGradient(state, data) {
			state.themeGradient = data
		}
	},
	getters: {
		user(state) {
			return state.user
		},
		themeGradient(state) {
			return state.themeGradient
		}
	}
}

export default userModule
