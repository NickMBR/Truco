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
			isValidEmoji(emoji) {
				// Thanks to: https://raw.githubusercontent.com/Modernizr/Modernizr/master/feature-detects/emoji.js
				// also: https://github.com/Dafrok/if-emoji/blob/master/src/index.js
				const canvas = document.createElement('canvas')
				canvas.width = 1
				canvas.height = 1

				const ctx = canvas.getContext('2d')
				ctx.fillStyle = '#000'
				ctx.textBaseline = 'top'
				ctx.scale(0.01, 0.01)
				ctx.font = '100px -no-font-family-here-'

				ctx.fillText(emoji, 0, 0)
				return ctx.getImageData(0, 0, 1, 1).data[0] !== 0
			},
			replaceAll(source, target, replacement) {
				return source.replace(new RegExp(target, 'g'), replacement)
			},
			processEmojisCategorization(data) {
				if (data.emojis && data.emojisKeywords) {
					let categories = []
					let subcategories = []
					let processedCategories = []
					let processedSubCategories = []

					// CUSTOM BLACKLIST
					let emojiBlacklist = [
						'Component',
						'Symbols',
						'Flags',
						'hand-prop',
						'keycap',
						'person-symbol',
						'family',
						'person-gesture',
						'person-resting',
						'person-sport',
						'person-activity',
						'person-fantasy',
						'person-role',
						'person',
						'transport-sign'
					]

					// GET CATEGORIES AND SUBCATEGORIES AND INSERT KEYWORDS ON EXISTING EMOJIS
					let emojiKeywords = Object.keys(data.emojisKeywords)
					for (let emoji of data.emojis) {
						let catRX = /.+?(?= \()/g
						let tempCategory = catRX.exec(emoji.category)
						let subCatRX = /(?<=\().*?(?=\))/g // OR: /\((.*?)\)/g
						let tempSubCategory = subCatRX.exec(emoji.category)

						if (tempCategory && tempSubCategory && tempCategory[0] && tempSubCategory[0]) {
							if (!categories.includes(tempCategory[0])) {
								categories.push(tempCategory[0])
							}

							if (!subcategories.includes(tempSubCategory[0])) {
								subcategories.push(tempSubCategory[0])
							}

							for (let keyword of emojiKeywords) {
								if (data.emojisKeywords[keyword] && data.emojisKeywords[keyword].char && emoji.char === data.emojisKeywords[keyword].char) {
									emoji.keywords = data.emojisKeywords[keyword].keywords
									emoji.frequency = 0
								}
							}
						}
					}

					// ADD A FREQUENTLY USED CATEGORY
					processedCategories.push({
						category: 'Frequently Used',
						content: []
					})

					// BUILD DEFAULT CATEGORY OBJECT
					for (let category of categories) {
						if (!emojiBlacklist.includes(category)) {
							processedCategories.push({
								category,
								content: []
							})
						}
					}

					// BUILD DEFAULT SUBCATEGORY OBJECT
					for (let subcategory of subcategories) {
						if (!emojiBlacklist.includes(subcategory)) {
							processedSubCategories.push({
								category: null,
								subcategory,
								emojis: []
							})
						}
					}

					// INSERT EMOJIS ON SUBCATEGORIES WHEN MATCHED BY CATEGORY AND SUBCATEGORY
					for (let category of processedCategories) {
						for (let emoji of data.emojis) {
							let subCatRX = /(?<=\().*?(?=\))/g // OR: /\((.*?)\)/g
							let tempSubCategory = subCatRX.exec(emoji.category)

							if ((emoji.category).includes(category.category)) {
								for (let subcategory of processedSubCategories) {
									if (tempSubCategory && tempSubCategory[0] && subcategory.subcategory === tempSubCategory[0]) {
										subcategory.category = category.category

										if (this.isValidEmoji(emoji.char)) {
											if (emoji.keywords && emoji.keywords.length > 0) {
												emoji.index = [emoji.name].concat(emoji.keywords)
											}
											else {
												emoji.index = [emoji.name]
											}

											subcategory.emojis.push(emoji)
										}
									}
								}
							}
						}
					}

					// MAKE SUBCATEGORY NAMES PRETTY
					for (let subcategory of processedSubCategories) {
						let subCat = this.replaceAll(subcategory.subcategory, '-', ' ')
						subCat = subCat.split(' ').map(w => w.substring(0, 1).toUpperCase() + w.substring(1)).join(' ')

						subcategory.subcategory = subCat
					}

					// INSERT SUBCATEGORIES CONTENT INTO THEIR RESPECTIVE CATEGORIES
					for (let category of processedCategories) {
						for (let subcategory of processedSubCategories) {
							if (subcategory.category === category.category) {
								category.content.push(subcategory)
							}
						}
					}

					return processedCategories
				}
			}
		}

		Vue.prototype.$utils = utilities
	}
}
