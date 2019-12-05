<template>
	<v-container fluid class="pa-0">
		<v-row no-gutters style="height: 100%;">
			<v-col sm="12" cols="12" class="pa-5">
				<v-toolbar flat color="transparent">
					<p class="truco-font sz-title-4 primary--text mt-6">{{ $t('menu.about') }}</p>
				</v-toolbar>
			</v-col>

			<v-col sm="12" cols="12" class="mt-12">
				<v-row no-gutters align="center" justify="center">
					<v-col sm="12" md="6" class="pa-5 text-center">
						<v-row no-gutters>
							<v-col cols="12">
								<img :src="mainLogo" />
							</v-col>

							<v-col cols="12">
								<p class="mb-0 font-weight-thin primary--text truco-font" style="font-size: 54px;">
									<b>{{ $t('app.title') }}</b>
								</p>
							</v-col>

							<v-col cols="12" class="mt-12">
								<p class="grey--text caption mb-0">{{ $t('app.madeBy') }}:</p>
								<span class="title text-uppercase primary--text">Niko</span>
								<span class="title text-uppercase font-weight-light primary--text">Works</span>
							</v-col>

							<v-col cols="12" class="mt-12">
								<p class="grey--text caption mb-0">{{ 'v0.0.2' }}</p>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-col>
		</v-row>

		<!--<v-col sm="12" class="mt-12">
			<v-row no-gutters align="center" justify="center" class="text-center">
				<v-col sm="12" class="pa-5">
					<v-row no-gutters>
						<v-col sm="12">
							<p class="mb-0 font-weight-thin primary--text truco-font" style="font-size: 54px;">
								<b>{{ $t('app.title') }}</b>
							</p>
						</v-col>

						<v-col sm="12" class="mt-12">
							<p class="grey--text caption mb-0">{{ $t('app.madeBy') }}:</p>
							<span class="title text-uppercase primary--text">Niko</span>
							<span class="title text-uppercase font-weight-light primary--text">Works</span>
						</v-col>

						<v-col sm="12" class="mt-12">
							<p class="grey--text caption mb-0">{{ 'v0.0.1' }}</p>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-col>-->
	</v-container>
</template>

<script>
import trucoLogo from '../../assets/img/dt_logo_256.png'

export default {
	data() {
		return {
			mainLogo: trucoLogo
		}
	}
}
</script>
