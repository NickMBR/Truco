<template>
	<v-app id="app">
		<router-view></router-view>
	</v-app>
</template>

<script>
import moment from 'moment'
import SettingsService from './services/settings'

export default {
	data() {
		return {
			routeBlacklist: []
		}
	},
	created() {
		this.setTitle()
	},
	mounted() {
		this.getSettings()
	},
	methods: {
		setTitle() {
			if (!this.routeBlacklist.includes(this.$route.meta.title)) {
				if (this.$route.meta && this.$route.meta.title) {
					document.title = 'Truco - ' + this.$route.meta.title
				}
				else {
					document.title = 'Truco'
				}
			}
		},
		async getSettings() {
			let localSettings = await SettingsService.getSettings()
			if (localSettings && localSettings.author) {
				if (localSettings.language) {
					this.$i18n.locale = localSettings.language
					if (localSettings.language.includes('pt')) {
						moment.locale('pt')
					}
					else {
						moment.locale(localSettings.language)
					}
				}

				if (!this.$utils.isEmpty(localSettings.darkMode)) {
					this.$vuetify.theme.dark = localSettings.darkMode
				}

				if (!this.$utils.isEmpty(localSettings.theme)) {
					this.processTheme(localSettings.theme)
				}
			}
		},
		changeTheme(primary, secondary) {
			this.$vuetify.theme.themes.light.primary = primary
			this.$vuetify.theme.themes.light.secondary = secondary
			this.$vuetify.theme.themes.dark.primary = primary
			this.$vuetify.theme.themes.dark.secondary = secondary
		},
		processTheme(theme) {
			let themeGradient = 'to top, rgba(40,42,46,.4), rgba(24,26,28,.6)'

			if (theme === 'default') {
				if (this.$vuetify.theme.dark) {
					this.changeTheme('#FFFFFF', '#EDEDED')
				}
				else {
					this.changeTheme('#282A2E', '#181A1C')
				}
				themeGradient = 'to top, rgba(40,42,46,.4), rgba(24,26,28,.6)'
			}
			else if (theme === 'forest') {
				this.changeTheme('#3A955D', '#26623D')
				themeGradient = 'to top, rgba(58,149,93,.4), rgba(38,98,61,.6)'
			}
			else if (theme === 'wine') {
				this.changeTheme('#D45050', '#AD4242')
				themeGradient = 'to top, rgba(212,80,80,.4), rgba(173,66,66,.6)'
			}
			else if (theme === 'orchid') {
				this.changeTheme('#9554E8', '#7743D2')
				themeGradient = 'to top, rgba(119,67,210,.4), rgba(88,49,156,.6)'
			}

			if (themeGradient) {
				this.$store.commit('updateThemeGradient', themeGradient)
			}

			this.$store.commit('updateColorMode', { darkMode: this.$vuetify.theme.dark, theme: theme })
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

.truco-font {
	font-family: SmartDatingFont;
}

.truco-font.sz-title-4 {
	font-size: 60px;
}
.truco-font.sz-title-3 {
	font-size: 54px;
}
.truco-font.sz-title-2 {
	font-size: 48px;
}
.truco-font.sz-title-1 {
	font-size: 36px;
}
.truco-font.sz-title-05 {
	font-size: 28px;
}
.truco-font.sz-title-04 {
	font-size: 22px;
}
.truco-font.sz-title-03 {
	font-size: 18px;
}
.truco-font.sz-title-02 {
	font-size: 12px;
}
</style>
