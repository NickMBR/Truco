<template>
	<v-card flat color="transparent" :class="$vuetify.breakpoint.smAndDown ? 'pa-4' : 'pa-12'">
		<v-layout row wrap align-center justify-center>
			<v-flex xs12 sm12 md5 class="mt-4">
				<v-layout row wrap class="pa-4">
					<v-flex xs4>
						<v-subheader>{{ $t('forms.language') }}</v-subheader>
					</v-flex>
					<v-flex xs8 class="mb-2">
						<v-select v-model="language" class="py-0 my-0" :items="languages" item-text="value" solo hide-details return-object single-line menu-props="offsetY"></v-select>
					</v-flex>

					<v-flex xs4>
						<v-subheader>{{ $t('forms.theme') }}</v-subheader>
					</v-flex>
					<v-flex xs8>
						<v-select v-model="theme" class="py-0" :items="themes" solo hide-details return-object single-line menu-props="offsetY">
							<template v-slot:item="{ item, index }">
								<span>{{ $t(item.value) }}</span>
							</template>
							<template v-slot:selection="{ item, index }">
								<span>{{ $t(item.value) }}</span>
							</template>
						</v-select>
					</v-flex>

					<v-flex xs4 class="pt-2">
						<v-subheader>{{ $t('forms.darkMode') }}</v-subheader>
					</v-flex>
					<v-flex xs8 class="mb-2">
						<v-switch color="primary" v-model="darkMode"></v-switch>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</v-card>
</template>

<script>
import SettingsService from '../../services/settings'

export default {
	data() {
		return {
			language: [],
			languages: [
				{
					id: 'en',
					value: 'English'
				},
				{
					id: 'pt_BR',
					value: 'Português'
				}
			],
			theme: [],
			themes: [
				{
					id: 'default',
					value: 'themes.default'
				},
				{
					id: 'forest',
					value: 'themes.forest'
				},
				{
					id: 'wine',
					value: 'themes.wine'
				},
				{
					id: 'orchid',
					value: 'themes.orchid'
				}
			],
			darkMode: false
		}
	},
	mounted() {
		this.getSettings()
		/*
		// SYSTEM NOTIFICATIONS
		if (!('Notification' in window)) {
			console.log('NO NOTIFICATION SUPPORT')
		}
		else if (Notification.permission === "granted") {
			let notification = new Notification("Hi there!")
		}
		else if (Notification.permission !== "denied") {
			Notification.requestPermission(permission => {
				if (permission === "granted") {
					var notification = new Notification("Hi there!")
				}
			})
		}
		*/
	},
	methods: {
		async getSettings() {
			let localSettings = await SettingsService.getSettings()
			if (localSettings && localSettings.version) {
				if (localSettings.language) {
					for (let language of this.languages) {
						if (language.id === localSettings.language) {
							this.language = language
						}
					}
				}

				if (localSettings.theme) {
					for (let theme of this.themes) {
						if (theme.id === localSettings.theme) {
							this.theme = theme
						}
					}
				}

				if (!this.$utils.isEmpty(localSettings.darkMode)) {
					this.darkMode = localSettings.darkMode
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
				if (this.darkMode) {
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
		}
	},
	watch: {
		language() {
			if (this.language && this.language.id) {
				SettingsService.updateSettings(this.language.id, 'LANG')
				this.$i18n.locale = this.language.id
			}
		},
		theme() {
			if (this.theme && this.theme.id) {
				SettingsService.updateSettings(this.theme.id, 'THEME')
				this.processTheme(this.theme.id)
			}
		},
		darkMode() {
			SettingsService.updateSettings(this.darkMode, 'DARK')
			this.$vuetify.theme.dark = this.darkMode

			if (this.theme.id === 'default') {
				if (this.darkMode) {
					this.changeTheme('#FFFFFF', '#EDEDED')
				}
				else {
					this.changeTheme('#282A2E', '#181A1C')
				}
			}
		}
	}
}
</script>
