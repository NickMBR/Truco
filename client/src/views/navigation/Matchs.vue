<template>
	<v-container fluid class="pa-0">
		<v-row no-gutters style="height: 100%;">
			<v-col sm="12" cols="12" class="pa-5">
				<v-toolbar flat color="transparent">
					<p class="truco-font sz-title-4 primary--text mt-6">{{ $t('menu.matchs') }}</p>
				</v-toolbar>
			</v-col>

			<v-col sm="12" cols="12" class="pa-5" v-if="temporaryMatch && temporaryMatch.id">
				<v-card>
					<v-toolbar color="primary" :class="$store.getters.colorMode ? 'grey--text text--darken-4' : 'white--text'">
						<v-toolbar-title class="">Partidas em Andamento</v-toolbar-title>
					</v-toolbar>
					<v-list class="py-0">
						<v-list-item>
							<v-list-item-content>
								<v-list-item-subtitle class="caption">
									<p class="mb-0">
										<v-icon size="12" class="">mdi-calendar-today</v-icon>
										{{ $utils.formatDateHour(temporaryMatch.date) }} {{ '(' + processDateAgo(temporaryMatch.date) + ')' }}
									</p>
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</v-list>

					<v-row no-gutters align="center" justify="center" class="text-center">
						<v-col sm="12" class="pb-5 text-center">
							<v-row no-gutters class="noselect text-no-wrap">
								<v-col sm="5" cols="5">
									<p class="truco-font sz-title-1 text-capitalize">{{ $utils.formatLength(temporaryMatch.teams.teamOneName, 10, true) }}</p>
								</v-col>
								<v-col sm="2" cols="2">
									<p class="truco-font sz-title-1">vs</p>
								</v-col>
								<v-col sm="5" cols="5">
									<p class="truco-font sz-title-1 text-capitalize">{{ $utils.formatLength(temporaryMatch.teams.teamTwoName, 10, true) }}</p>
								</v-col>

								<v-col sm="5" cols="5">
									<span class="display-3 primary--text">{{ temporaryMatch.teams.teamOneScore }}</span>
								</v-col>
								<v-col sm="2" cols="2">
									<v-divider vertical></v-divider>
								</v-col>
								<v-col sm="5" cols="5">
									<span class="display-3 primary--text">{{ temporaryMatch.teams.teamTwoScore }}</span>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-card>
			</v-col>

			<v-col sm="12" cols="12" class="pa-5" v-if="matchHistory && matchHistory.length > 0">
				<v-card>
					<v-toolbar color="primary" :class="$store.getters.colorMode ? 'grey--text text--darken-4' : 'white--text'">
						<v-toolbar-title class="">Partidas Anteriores</v-toolbar-title>
					</v-toolbar>

					<template v-for="(match, index) in matchHistory">
						<v-list class="py-0" :key="index + '_calendar'">
							<v-list-item>
								<v-list-item-content>
									<v-list-item-subtitle class="caption">
										<p class="mb-0">
											<v-icon size="12" class="">mdi-calendar-today</v-icon>
											{{ $utils.formatDateHour(match[match.length - 1].date) }} {{ '(' + processDateAgo(match[match.length - 1].date) + ')' }}
										</p>
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</v-list>

						<v-row no-gutters align="center" justify="center" class="text-center" :key="index + '_score'">
							<v-col sm="12" class="pb-5 text-center">
								<v-row no-gutters class="noselect text-no-wrap">
									<v-col sm="5" cols="5">
										<p class="truco-font sz-title-1 text-capitalize">{{ $utils.formatLength(match[match.length - 1].teams.teamOneName, 10, true) }}</p>
									</v-col>
									<v-col sm="2" cols="2">
										<p class="truco-font sz-title-1">vs</p>
									</v-col>
									<v-col sm="5" cols="5">
										<p class="truco-font sz-title-1 text-capitalize">{{ $utils.formatLength(match[match.length - 1].teams.teamTwoName, 10, true) }}</p>
									</v-col>

									<v-col sm="5" cols="5">
										<span class="display-3 primary--text">{{ match[match.length - 1].teams.teamOneScore }}</span>
									</v-col>
									<v-col sm="2" cols="2">
										<v-divider vertical></v-divider>
									</v-col>
									<v-col sm="5" cols="5">
										<span class="display-3 primary--text">{{ match[match.length - 1].teams.teamTwoScore }}</span>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
					</template>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import moment from 'moment'
import matchService from '../../services/match'

export default {
	data() {
		return {
			temporaryMatch: [],
			matchHistory: []
		}
	},
	mounted() {
		this.loadTemporaryMatch()
		this.loadSavedMatch()
	},
	methods: {
		loadTemporaryMatch() {
			matchService.getRunningMatch().then(match => {
				if (match && match.length > 0) {
					let data = match[match.length - 1]
					this.temporaryMatch = data
					console.log('TEMP MATCH', data)
				}
			}).catch(() => {})
		},
		loadSavedMatch() {
			matchService.getSavedMatchs().then(matchs => {
				if (matchs && matchs.length > 0) {
					this.matchHistory = matchs
					console.log('SAVED MATCHS', matchs)
				}
			}).catch(() => {})
		},
		processDateAgo(date) {
			if (date) {
				return moment(date).fromNow()
			}
		}
	}
}
</script>
