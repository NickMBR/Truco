import cache from '../plugins/core/cache'
import coreUtils from '../plugins/core/utils'
import moment from 'moment'

const utils = coreUtils.utilities
const settingsService = {
	getSettings() {
		return new Promise((resolve, reject) => {
			let settings = []
			Promise.resolve().then(() => {
				return cache.getCache('truco-settings').then(result => {
					if (result && result.author) {
						settings = result
					}
				}).catch(async error => {
					if (error && error.toString().includes('CACHE_DOES_NOT_EXISTS')) {
						const localLang = navigator.language || navigator.userLanguage
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
							detect11Hands: true,
							language: setLang,
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
		const settings = await this.getSettings()

		if (settings.author && !utils.isEmpty(data) && type) {
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
				detect11Hands: type === 'DETECT_11_HANDS' ? data : settings.detect11Hands,
				language: type === 'LANG' ? data : settings.language,
				author: type === 'AUTHOR' ? data : settings.author
			})
		}
	}
}

export default settingsService
