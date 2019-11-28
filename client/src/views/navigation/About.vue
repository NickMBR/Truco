<template>
	<v-layout row wrap :class="$vuetify.breakpoint.mdAndUp ? 'pa-12' : 'py-6 px-4'">
		<v-flex xs12>
			<v-toolbar flat color="transparent">
				<p class="truco-font sz-title-4 primary--text mt-6">{{ $t('menu.about') }}</p>
			</v-toolbar>
		</v-flex>

		<v-flex xs12 text-center class="mt-5">
			<p class="mb-0 font-weight-thin primary--text truco-font" style="font-size: 54px;">
				<b>{{ $t('app.title') }}</b>
			</p>
		</v-flex>

		<v-flex xs12 text-center class="mt-8">
			<p class="grey--text caption mb-0">{{ $t('app.madeBy') }}:</p>
			<span class="title text-uppercase primary--text">Niko</span>
			<span class="title text-uppercase font-weight-light primary--text">Works</span>
		</v-flex>

		<v-flex xs12 text-center class="mt-12">
			<p class="grey--text caption mb-0">{{ 'v0.0.1' }}</p>
		</v-flex>
	</v-layout>
</template>

<script>
export default {
}
</script>
