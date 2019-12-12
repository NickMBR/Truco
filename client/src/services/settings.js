import cache from '../plugins/core/cache'
import coreUtils from '../plugins/core/utils'
import moment from 'moment'

const utils = coreUtils.utilities
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
							showHistory: true,
							keepNames: true,
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

		if (settings.version && !utils.isEmpty(data) && type) {
			if (type === 'LANG') {
				if (data.includes('pt')) {
					moment.locale('pt')
				}
				else {
					moment.locale(data)
				}
			}

			cache.setCache('truco-settings', {
				theme: type === 'THEME' ? data : settings.theme,
				darkMode: type === 'DARK' ? data : settings.darkMode,
				showHistory: type === 'SHOW_HISTORY' ? data : settings.showHistory,
				keepNames: type === 'KEEP_NAMES' ? data : settings.keepNames,
				language: type === 'LANG' ? data : settings.language,
				version: type === 'VERSION' ? data : settings.version,
				author: type === 'AUTHOR' ? data : settings.author
			})
		}
	}
}

export default settingsService
