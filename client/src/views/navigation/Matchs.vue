<template>
	<div>
		<v-layout row wrap :class="$vuetify.breakpoint.mdAndUp ? 'pa-12' : 'py-6 px-4'">
			<v-flex xs12>
				<v-toolbar flat color="transparent">
					<p class="truco-font sz-title-4 primary--text mt-6">{{ $t('menu.matchs') }}</p>
				</v-toolbar>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
export default {
	data() {
		return {
		}
	},
	methods: {
	},
	watch: {
	}
}
</script>
