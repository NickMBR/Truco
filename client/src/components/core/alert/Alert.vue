<template>
	<v-dialog v-model="active" :persistent="activeAlert.options ? activeAlert.options.persistent : false" :max-width="activeAlert.options ? activeAlert.options.width : 300" @input="v => dismissAlert(v)">
		<v-card flat v-if="activeAlert && activeAlert.id">
			<v-card-title>
				{{ $t(activeAlert.title) }}
			</v-card-title>

			<v-card-text>
				<v-card-text class="py-12 px-4 text-center">
					<v-icon size="86" class="animated flash red--text text--darken-2">{{ formatIcon(activeAlert.type) }}</v-icon>
					<p class="body-2 mt-4">{{ formatDescription(activeAlert) }}</p>
				</v-card-text>
			</v-card-text>

			<v-card-actions class="pa-4 mt-4" v-if="activeAlert.buttons.length > 0">
				<v-spacer></v-spacer>

				<template v-for="(btn, id) of activeAlert.buttons">
					<v-btn :dark="btn.dark" :color="btn.type" @click="performAction(btn.action)" :key="id">{{ $t(btn.title) }}</v-btn>
				</template>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import AlertMessages from './alert.messages'
import MatchService from '../../../services/match'

export default {
	name: 'truco-alert',
	data() {
		return {
			active: false,
			queue: [],
			activeAlert: [],
			activeIndex: 0
		}
	},
	mounted() {
		this.$bus.$on('TRIGGER_ALERT', (data, content) => {
			for (const alert of AlertMessages) {
				if (data === alert.id) {
					alert.content = content
					this.queue.push(alert)
				}
			}
		})
	},
	beforeDestroy() {
		this.$bus.$off('TRIGGER_ALERT')
	},
	methods: {
		dismissAlert(v) {
			this.active = false

			if (this.queue.length > 0) {
				setTimeout(() => {
					this.queue.splice(this.activeIndex, 1)
				}, 500)
			}
		},
		processQueue() {
			if (this.queue.length > 0) {
				this.queue.forEach((alert, index) => {
					if (!this.active && alert && alert.id) {
						this.activeAlert = alert
						this.activeIndex = index
						this.active = true
					}
				})
			}
		},
		formatIcon(type) {
			if (type === 'DANGER') {
				return 'mdi-alert-outline'
			}
			else {
				return ''
			}
		},
		formatDescription(data) {
			if (data && data.id) {
				const translatedDescription = this.$t(data.description)
				let formattedDescription = ''

				if (!this.$utils.isEmpty(translatedDescription) && translatedDescription.toString().includes('§')) {
					if (data.id === 'MATCH_WINNER' && data.content && data.content.winner) {
						formattedDescription = this.$utils.format(translatedDescription, [data.content.winner.name])
					}
				}
				else {
					formattedDescription = translatedDescription
				}

				return formattedDescription
			}
			else {
				return ''
			}
		},
		performAction(val) {
			if (val === 'CLOSE_ALERT') {
				this.dismissAlert()
			}
			else if (val === 'RESET_MATCH') {
				this.$bus.$emit('RESET_MATCH')
				this.dismissAlert()
			}
			else if (val === 'SAVE_AND_RESET_MATCH') {
				this.$bus.$emit('SAVE_AND_RESET_MATCH')
				this.dismissAlert()
			}
			else if (val === 'DELETE_MATCH_INFO') {
				MatchService.removeAllMatches().catch(() => {})
				this.dismissAlert()
			}
		}
	},
	watch: {
		queue() {
			this.processQueue()
		}
	}
}
</script>

<style scoped src="../../../assets/css/animate.min.css">
</style>
