import cache from '../plugins/core/cache'
import moment from 'moment'

let matchService = {
	getRunningMatch() {
		return new Promise((resolve, reject) => {
			let runningMatch = []
			Promise.resolve().then(() => {
				return cache.getCache('truco-running-match').then(result => {
					if (result && result.length > 0) {
						runningMatch = result
					}
				}).catch(error => {
					throw new Error('RUNNING_MATCH_EMPTY, ERROR:', error)
				})
			}).then(() => {
				resolve(runningMatch)
			}).catch(error => {
				reject(error)
			})
		})
	},
	saveRunningMatch(data) {
		return new Promise((resolve, reject) => {
			Promise.resolve().then(() => {
				if (data && data.length > 0) {
					let validMatch = true
					for (let match of data) {
						if (!match.date || !match.teamAdded || !match.teamName) {
							validMatch = false
						}
					}
					if (validMatch) {
						return cache.setCache('truco-running-match', data, false).catch(error => {
							throw new Error('CANNOT_SAVE_MATCH, ERROR:', error)
						})
					}
					else {
						throw new Error('CANNOT_SAVE_MATCH_INVALID_DATA')
					}
				}
				else {
					return true
				}
			}).then(() => {
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},
	removeRunningMatch() {
		return new Promise((resolve, reject) => {
			Promise.resolve().then(() => {
				return cache.removeCache('truco-running-match').catch(error => {
					throw new Error('CANNOT_REMOVE_RUNNING_MTACH, ERROR:', error)
				})
			}).then(() => {
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	}
}

export default matchService
