<template>
	<v-container fluid class="pa-0">
		<v-row no-gutters style="height: 100%;">
			<v-col sm="12" cols="12" class="pa-5">
				<v-toolbar flat color="transparent">
					<p class="truco-font sz-title-4 primary--text mt-6">{{ $t('menu.home') }}</p>
				</v-toolbar>

				<v-menu open-on-hover top offset-y>
					<template v-slot:activator="{ on }">
						<v-btn fixed bottom v-on="on">
							<v-icon>mdi-account</v-icon>
						</v-btn>
					</template>

					<v-card class="pa-3">
						test 1
					</v-card>
				</v-menu>

				<v-menu open-on-hover top offset-y>
					<template v-slot:activator="{ on }">
						<v-btn fixed bottom right v-on="on">
							<v-icon>mdi-account</v-icon>
						</v-btn>
					</template>

					<v-card class="pa-3">
						test 1
					</v-card>
				</v-menu>
			</v-col>

			<v-col sm="12" cols="12" class="mt-12">
				<v-row no-gutters align="center" justify="center">
					<v-col sm="12" class="pa-5 text-center">
						<v-row no-gutters>
							<v-col sm="5" cols="5">
								<p class="truco-font sz-title-4 text-capitalize">time 1</p>
								<span class="display-4">0</span>
							</v-col>
							<v-col sm="2" cols="2">
								<v-divider vertical></v-divider>
							</v-col>
							<v-col sm="5" cols="5">
								<p class="truco-font sz-title-4 text-capitalize">time 2</p>
								<span class="display-4">0</span>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-col>
		</v-row>

		<!--<v-row no-gutters align="end" style="height: 15%;">
			<v-col>
				<div class="overflow-hidden">
					<v-bottom-navigation v-model="active" :input-value="bottomMenu" grow color="primary">
						<v-btn>
							<span>Time 1</span>
							<v-icon>mdi-account</v-icon>
						</v-btn>

						<v-btn>
							<span>Favorites</span>
							<v-icon>mdi-heart</v-icon>
						</v-btn>

						<v-btn>
							<span>Time 2</span>
							<v-icon>mdi-account</v-icon>
						</v-btn>
					</v-bottom-navigation>
				</div>
			</v-col>
		</v-row>-->
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			active: 1,
			bottomMenu: true
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
