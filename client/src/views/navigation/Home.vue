<template>
	<v-layout row wrap :class="$vuetify.breakpoint.mdAndUp ? 'pa-12' : 'py-6 px-4'">
		<v-flex xs12>
			<v-toolbar flat color="transparent">
				<p class="truco-font sz-title-4 primary--text mt-6">{{ $t('menu.home') }}</p>
				<v-spacer></v-spacer>

				<v-btn fab color="primary">
					<v-icon :color="$store.getters.colorMode ? 'grey darken-4' : ''" light>mdi-plus</v-icon>
				</v-btn>
			</v-toolbar>
		</v-flex>

		<v-flex xs12 class="mt-6">
			<v-btn @click="testAlert()">{{ $t('alerts.test.button') }}</v-btn>
		</v-flex>
	</v-layout>
</template>

<script>
export default {
	data() {
		return {
		}
	},
	methods: {
		testAlert() {
			this.$store.dispatch('setAlert', 'TEST_ALERT')
		}
	},
	watch: {
		'$store.getters.alert'() {
			this.alertMessage = this.$store.getters.alert
		},
		'$store.getters.action'() {
			if (this.$store.getters.action == 'CONSOLE_TEST') {
				console.log('ALERT ACTION WAS PERFORMED')
				this.$store.dispatch('setAction', '')
			}
		}
	}
}
</script>

<style scoped>
.noselect {
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
</style>
