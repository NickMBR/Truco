<template>
	<v-container fluid class="pa-0">
		<v-row no-gutters style="height: 100%;">
			<v-col sm="12" cols="12" class="pa-5">
				<v-toolbar flat color="transparent">
					<p class="truco-font sz-title-4 primary--text mt-6">{{ $t('menu.about') }}</p>
				</v-toolbar>
			</v-col>

			<v-col sm="12" cols="12">
				<v-row no-gutters align="center" justify="center">
					<v-col sm="12" md="6" class="pa-5 text-center">
						<v-row no-gutters>
							<v-col cols="12">
								<img :src="mainLogo" width="192"/>
							</v-col>

							<v-col cols="12">
								<p class="mb-0 font-weight-thin primary--text truco-font" style="font-size: 54px;">
									<b>{{ $t('app.title') }}</b>
								</p>
							</v-col>

							<v-col cols="12" class="mt-12">
								<p class="grey--text caption mb-0">{{ $t('app.madeBy') }}:</p>
								<a @click="gotoPortfolio()"><span class="title text-uppercase primary--text">Niko</span>
								<span class="title text-uppercase font-weight-light primary--text">Works</span></a>
							</v-col>

							<v-col cols="12">
								<v-btn x-large icon @click="gotoGithub()"><v-icon x-large>mdi-github-circle</v-icon></v-btn>
							</v-col>

							<v-col cols="12" class="mt-12">
								<p class="grey--text caption mb-0">{{ 'v1.3.3' }}</p>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import trucoLogo from '../../assets/img/dt_logo_256.png'

export default {
	data() {
		return {
			mainLogo: trucoLogo
		}
	},
	methods: {
		gotoGithub() {
			window.open('https://github.com/NickMBR/Truco', '_blank')
		},
		gotoPortfolio() {
			window.open('https://niko.works', '_blank')
		}
	}
}
</script>
