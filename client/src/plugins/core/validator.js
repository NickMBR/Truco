export default {
	install(Vue, i18n) {
		const methods = {
			required: value => {
				return (value && value.length > 0) || i18n.t('validations.required')
			},
			email: value => {
				const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				return pattern.test(value) || i18n.t('validations.invalid')
			},
			match: (a, b) => {
				return a === b || i18n.t('validations.match')
			},
			alpha: value => {
				return (value && /^[A-Za-z\u00C0-\u00FF ]+$/.test(value)) || i18n.t('validations.alpha')
			},
			numeric: value => {
				return (value && /^[0-9 .]+$/.test(value)) || i18n.t('validations.numeric')
			},
			alphaNumeric: value => {
				return (value && /^[A-Za-z\u00C0-\u00FF0-9 ]+$/.test(value)) || i18n.t('validations.numeric')
			},
			length: (value, length) => {
				return value.length >= length || i18n.t('validations.length').replace('¬', length)
			},
			date: (value, required) => {
				if (required) {
					return (value && value.length === 10 && /^[0-9 /]+$/.test(value)) || i18n.t('validations.date')
				}
				else {
					return (value.length > 0 ? (value.length === 10 && /^[0-9 /]+$/.test(value)) : true) || i18n.t('validations.date')
				}
			}
		}

		/*
		const regexOptions = {
			upper: 'A-Z',
			lower: 'a-z',
			spaces: ' ',
			numeric: '0-9',
			unicode: '\u00C0-\u00FF',
			linebreak: '\r|\n'
		}
		*/

		Vue.prototype.$rules = methods
	}
}
