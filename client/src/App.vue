<template>
	<v-app id="app">
		<router-view></router-view>
	</v-app>
</template>

<script>
import moment from 'moment'

export default {
	data() {
		return {
			routeBlacklist: ['Person']
		}
	},
	created() {
		this.setTitle()
	},
	mounted() {
		this.setLocalLanguage()
		this.setLocalTheme()
		this.setLocalDarkMode()
	},
	methods: {
		setTitle() {
			if (!this.routeBlacklist.includes(this.$route.meta.title)) {
				if (this.$route.meta && this.$route.meta.title) {
					document.title = 'SmartDating - ' + this.$route.meta.title
				}
				else {
					document.title = 'SmartDating'
				}
			}
		},
		setLocalLanguage() {
			let localLang = localStorage.getItem('dt-lang') || navigator.language || navigator.userLanguage

			if (localLang) {
				if (localLang.includes('en')) {
					localStorage.setItem('dt-lang', 'en')
					this.$i18n.locale = 'en'
					moment.locale('en')
				}
				else if (localLang.includes('pt') && localLang.includes('BR')) {
					localStorage.setItem('dt-lang', 'pt_BR')
					this.$i18n.locale = 'pt_BR'
					moment.locale('pt')
				}
			}
			else {
				localStorage.setItem('dt-lang', 'en')
				moment.locale('en')
			}
		},
		changeTheme(primary, secondary) {
			this.$vuetify.theme.themes.light.primary = primary
			this.$vuetify.theme.themes.light.secondary = secondary
			this.$vuetify.theme.themes.dark.primary = primary
			this.$vuetify.theme.themes.dark.secondary = secondary
		},
		processTheme(theme) {
			if (theme === 'default') {
				/*
					this.$vuetify.theme.dark = false
					PRIMARY: #9554E8
					SECONDARY: #7743D2
				*/
				this.changeTheme('#9554E8', '#7743D2')
				this.$store.commit('updateThemeGradient', 'to top, rgba(119,67,210,.4), rgba(88,49,156,.6)')
			}
			else if (theme === 'forest') {
				/*
					this.$vuetify.theme.dark = false
					PRIMARY: #3A955D
					SECONDARY: #26623D
				*/
				this.changeTheme('#3A955D', '#26623D')
				this.$store.commit('updateThemeGradient', 'to top, rgba(58,149,93,.4), rgba(38,98,61,.6)')
			}
			else if (theme === 'love') {
				/*
					this.$vuetify.theme.dark = false
					PRIMARY: #D45050
					SECONDARY: #AD4242
				*/
				this.changeTheme('#D45050', '#AD4242')
				this.$store.commit('updateThemeGradient', 'to top, rgba(212,80,80,.4), rgba(173,66,66,.6)')
			}
		},
		setLocalTheme() {
			let localTheme = localStorage.getItem('dt-theme')

			if (localTheme) {
				this.processTheme(localTheme)
			}
			else {
				localStorage.setItem('dt-theme', 'default')
			}
		},
		setLocalDarkMode() {
			let localDarkMode = localStorage.getItem('dt-dark')

			if (!this.$utils.isEmpty(localDarkMode)) {
				this.$vuetify.theme.dark = localDarkMode === 'true' || localDarkMode === true
			}
		}
	},
	watch: {
		'$route'() {
			this.setTitle()
		}
	}
}
</script>

<style>
@font-face {
  font-family: SmartDatingFont;
  src: url(./assets/fonts/SignPainter-Regular.ttf);
}

/*body {
	overflow: auto;
}*/

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
::-webkit-scrollbar-thumb {
  background: #9554E8; 
}

::-webkit-scrollbar-thumb:hover {
  background: #7743D2; 
}

.v-sheet--offset {
	top: -24px;
	position: relative;
}

.dt-font {
	font-family: SmartDatingFont;
}

.dt-font.sz-title-4 {
	font-size: 60px;
}
.dt-font.sz-title-3 {
	font-size: 54px;
}
.dt-font.sz-title-2 {
	font-size: 48px;
}
.dt-font.sz-title-1 {
	font-size: 36px;
}
</style>
