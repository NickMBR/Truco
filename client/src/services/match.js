import cache from '../plugins/core/cache'
import moment from 'moment'

let matchService = {
	getRunningMatch() {
		return new Promise((resolve, reject) => {
			let runningMatch = []
			Promise.resolve().then(() => {
				return cache.getCache('truco-running-match').then(result => {
					if (result && result.id) {
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
	}
}

export default matchService
