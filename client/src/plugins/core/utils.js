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
	formatDateHour(value) {
		if (moment(value).isValid()) {
			return moment(value).format('DD/MM/YYYY HH:mm')
		}
		else {
			return ''
		}
	},
	replaceAll(source, target, replacement) {
		return source.replace(new RegExp(target, 'g'), replacement)
	},
	format(source, args) {
		const canFormat = source.search('§')
		let sourceArgs = args || []

		if (canFormat !== -1 && sourceArgs.length > 0) {
			let argIndex = -1
			for (let i = 0; i < source.length; i++) {
				if (source[i] === '§') {
					argIndex++
					source = source.substr(0, i) + sourceArgs[argIndex] + source.substr(i + 1)
				}
			}

			return source
		}
		else {
			return source
		}
	},
	formatLength(source, length, shouldAddDots) {
		if (!this.isEmpty(source)) {
			let data = source.toString()
			return data.length > length ? `${data.substring(0, length)}${shouldAddDots ? '..' : ''}` : data
		}
		else {
			return ''
		}
	}
}

export default {
	install(Vue, i18n) {
		Vue.prototype.$utils = utilities
	},
	utilities
}
