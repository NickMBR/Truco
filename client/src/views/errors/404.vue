<template>
	<v-content>
		<v-container fluid fill-height>
			<v-row no-gutters style="height: 100%;">
				<v-col sm="12" cols="12" class="pa-12">
					<p class="mb-0 font-weight-thin primary--text truco-font" :style="$vuetify.breakpoint.mdAndUp ? 'font-size: 60px;' : 'font-size: 54px;'">
						<b>{{ $t('app.title') }}</b>
					</p>

					<v-btn icon large color="primary" dark @click="$router.push('/')" class="ml-0 pl-0"><v-icon>mdi-arrow-left</v-icon></v-btn>

					<div class="text-center mt-12">
						<p class="mb-0 text-uppercase font-weight-medium display-4 grey--text" style="letter-spacing: 8px !important;">
							404
						</p>
						<p class="mb-0 text-uppercase font-weight-thin headline grey--text" style="letter-spacing: 2px !important;">
							{{ $t('errors.pages.P404') }}
						</p>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</v-content>
</template>

<script>
export default {
}
</script>
