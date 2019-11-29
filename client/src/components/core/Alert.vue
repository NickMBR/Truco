<template>
	<v-dialog v-model="active" :persistent="content.options ? content.options.persistent : false" :max-width="content.options ? content.options.width : 300" @input="v => closed(v)">
		<v-card flat v-if="content && content.id">
			<v-toolbar dense :class="alertToolbarColor(content.type)">
				<v-toolbar-title>
					{{ $t(content.title) }}
				</v-toolbar-title>
			</v-toolbar>

			<v-card-text class="py-12 px-4 text-center">
				<v-icon size="86" class="animated flash red--text text--darken-2">{{ alertToolbarIcon(content.type) }}</v-icon>
				<p class="body-2 mt-4">{{ $t(content.description) }}</p>
			</v-card-text>

			<v-card-actions class="pa-4" v-if="content.buttons.length > 0">
				<v-spacer></v-spacer>

				<template v-for="(btn, id) of content.buttons">
					<v-btn dark :color="btn.type" @click="performAction(btn.action)" :key="id">{{ $t(btn.title) }}</v-btn>
				</template>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import AlertMessages from '../../plugins/core/alerts'

export default {
	name: 'dt-login',
	props: ['message'],
	data() {
		return {
			content: [],
			active: false
		}
	},
	methods: {
		closed(v) {
			this.$store.dispatch('setAlert', '')
			console.log('ALERT WAS CLOSED')
		},
		reset() {
			this.active = false
			this.$store.dispatch('setAlert', '')
			console.log('ALERT WAS RESET')
		},
		performAction(val) {
			if (val === 'CLOSE_ALERT') {
				this.reset()
			}
			else if (val === 'CONSOLE_TEST') {
				this.$store.dispatch('setAction', 'CONSOLE_TEST')
				this.reset()
			}
			else if (val === 'RESET_MATCH') {
				this.$store.dispatch('setAction', 'RESET_MATCH')
				this.reset()
			}
			else if (val === 'SAVE_MATCH') {
				this.$store.dispatch('setAction', 'SAVE_MATCH')
				this.reset()
			}
		},
		alertToolbarColor(type) {
			if (type === 'DANGER') {
				if (this.$store.getters.colorMode) {
					return 'primary grey--text text--darken-4'
				}
				else {
					return 'primary white--text'
				}
			}
			else {
				return ''
			}
		},
		alertToolbarIcon(type) {
			if (type === 'DANGER') {
				return 'mdi-alert-outline'
			}
			else {
				return ''
			}
		},
		buildAlert(val) {
			if (val) {
				for (let alert of AlertMessages) {
					if (alert.id === val) {
						this.content = alert
						this.active = true
					}
				}
			}
		}
	},
	watch: {
		message(newMessage, oldMessage) {
			if (this.message) {
				if (this.active) {
					this.reset()
					this.$nextTick(() => {
						setTimeout(() => {
							this.buildAlert(newMessage)
						}, 500)
					})
				}
				else {
					this.reset()
					this.$nextTick(() => {
						this.buildAlert(newMessage)
					})
				}
			}
		}
	}
}
</script>

<style scoped src="../../assets/css/animate.min.css">
</style>
