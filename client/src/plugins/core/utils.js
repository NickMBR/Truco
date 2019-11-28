import moment from 'moment'

const utilities = {
	isEmpty(data) {
		return data === null || data === undefined || data === 'undefined' || data === '' || data === ' '
	},
	clearMask(data) {
		return data.replace(/\D/g, '')
	},
	formatDate(value) {
		if (moment(value).isValid()) {
			return moment(value).format('DD/MM/YYYY')
		}
		else {
			return ''
		}
	},

	replaceAll(source, target, replacement) {
		return source.replace(new RegExp(target, 'g'), replacement)
	}
}

export default {
	install(Vue, i18n) {
		Vue.prototype.$utils = utilities
	},
	utilities
}
