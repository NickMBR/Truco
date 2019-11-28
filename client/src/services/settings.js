import cache from '../plugins/core/cache'
import moment from 'moment'

function isEmpty(data) {
	return data === null || data === undefined || data === 'undefined' || data === '' || data === ' '
}

let settingsService = {
	getSettings() {
		return new Promise((resolve, reject) => {
			let settings = []
			Promise.resolve().then(() => {
				return cache.getCache('truco-settings').then(result => {
					if (result && result.version) {
						settings = result
					}
				}).catch(async error => {
					if (error && error.toString().includes('CACHE_DOES_NOT_EXISTS')) {
						let localLang = navigator.language || navigator.userLanguage
						let setLang = 'en'

						if (localLang) {
							if (localLang.includes('en')) {
								setLang = 'en'
							}
							else if (localLang.includes('pt') && localLang.includes('BR')) {
								setLang = 'pt_BR'
							}
						}
						else {
							setLang = 'en'
						}

						settings = {
							theme: 'default',
							darkMode: false,
							language: setLang,
							version: '0.0.1',
							author: 'Nicolas Mello'
						}

						cache.setCache('truco-settings', settings)
					}
				})
			}).then(() => {
				resolve(settings)
			}).catch(error => {
				reject(error)
			})
		})
	},
	async updateSettings(data, type) {
		let settings = await this.getSettings()

		if (settings.version && !isEmpty(data) && type) {
			if (type === 'LANG') {
				if (data.includes('pt')) {
					moment.locale('pt')
				}
				else {
					moment.locale(data)
				}
			}

			console.log('UPDATED', type, 'TO', data)

			cache.setCache('truco-settings', {
				theme: type === 'THEME' ? data : settings.theme,
				darkMode: type === 'DARK' ? data : settings.darkMode,
				language: type === 'LANG' ? data : settings.language,
				version: type === 'VERSION' ? data : settings.version,
				author: type === 'AUTHOR' ? data : settings.author
			})
		}
	}
}

export default settingsService
