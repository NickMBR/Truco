import moment from 'moment'

export default {
	install(Vue, i18n) {
		const utilities = {
			isEmpty(data) {
				return data === null || data === undefined || data === 'undefined' || data === '' || data === ' '
			},
			clearMask(data) {
				return data.replace(/\D/g, '')
			},
			invertDate(date) {
				let invertedDate = null
				if (date.length === 8) {
					invertedDate = date.substring(4, 8) + '-' + date.substring(2, 4) + '-' + date.substring(0, 2)
					return invertedDate
				}
				else {
					return false
				}
			},
			formatDate(value) {
				if (moment(value).isValid()) {
					return moment(value).format('DD/MM/YYYY')
				}
				else {
					return ''
				}
			},
			formatHour(value) {
				if (moment(value).isValid()) {
					return moment(value).format('HH:mm')
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
			formatDateWeekString(value) {
				if (moment(value).isValid()) {
					return moment(value).format('dddd, DD/MM/YYYY')
				}
				else {
					return ''
				}
			},
			getMonth(value) {
				if (moment(value).isValid()) {
					return moment(value).format('MMMM')
				}
				else {
					return 'N/A'
				}
			},
			getYear(value) {
				if (moment(value).isValid()) {
					return moment(value).format('YYYY')
				}
				else {
					return 'N/A'
				}
			},
			getMonthYear(value) {
				if (moment(value).isValid()) {
					return moment(value).format('MMMM - YYYY')
				}
				else {
					return 'N/A'
				}
			},
			formatNameByFirstSpace(value) {
				return value.split(' ')[0]
			},
			replaceAll(source, target, replacement) {
				return source.replace(new RegExp(target, 'g'), replacement)
			}
		}

		Vue.prototype.$utils = utilities
	}
}
