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
						<v-toolbar-title class="">{{ $t('game.runningMatchs') }}</v-toolbar-title>
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
									<p class="mb-0 truco-font text-capitalize" :class="$vuetify.breakpoint.mdAndUp ? 'sz-title-1' : 'sz-title-05'">{{ $utils.formatLength(temporaryMatch.teams.teamOneName, 10, true) }}</p>
								</v-col>
								<v-col sm="2" cols="2">
									<p class="mb-0 truco-font sz-title-1">vs</p>
								</v-col>
								<v-col sm="5" cols="5">
									<p class="mb-0 truco-font text-capitalize" :class="$vuetify.breakpoint.mdAndUp ? 'sz-title-1' : 'sz-title-05'">{{ $utils.formatLength(temporaryMatch.teams.teamTwoName, 10, true) }}</p>
								</v-col>

								<v-col sm="5" cols="5">
									<span class="display-2 primary--text">{{ temporaryMatch.teams.teamOneScore }}</span>
								</v-col>
								<v-col sm="2" cols="2">
									<v-divider vertical></v-divider>
								</v-col>
								<v-col sm="5" cols="5">
									<span class="display-2 primary--text">{{ temporaryMatch.teams.teamTwoScore }}</span>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-card>
			</v-col>

			<v-col sm="12" cols="12" class="pa-5" v-if="matchHistory && matchHistory.length > 0">
				<v-card>
					<v-toolbar color="primary" :class="$store.getters.colorMode ? 'grey--text text--darken-4' : 'white--text'">
						<v-toolbar-title class="">{{ $t('game.previousMatchs') }}</v-toolbar-title>
					</v-toolbar>

					<template v-for="(match, index) in matchHistory">
						<v-list class="py-0" :key="index + '_calendar'">
							<v-list-item>
								<v-list-item-content>
									<v-list-item-subtitle class="caption">
										<p class="mb-0">
											<v-icon size="12" class="">mdi-calendar-today</v-icon>
											{{ $utils.formatDateHour(match.date) }} {{ '(' + processDateAgo(match.date) + ')' }}
										</p>
									</v-list-item-subtitle>
								</v-list-item-content>

								<v-list-item-action v-if="keepNames">
									<v-btn small color="primary" icon @click.stop="setTeamNamesAndPlay(match)"><v-icon>mdi-play</v-icon></v-btn>
								</v-list-item-action>
							</v-list-item>
						</v-list>

						<v-row no-gutters align="center" justify="center" class="text-center" :key="index + '_score'">
							<v-col sm="12" class="pb-5 text-center">
								<v-row no-gutters class="noselect text-no-wrap">
									<v-col sm="5" cols="5">
										<p class="mb-0 truco-font text-capitalize" :class="$vuetify.breakpoint.mdAndUp ? 'sz-title-1' : 'sz-title-05'">{{ $utils.formatLength(match.teamOneName, 10, true) }}</p>
									</v-col>
									<v-col sm="2" cols="2">
										<p class="mb-0 truco-font sz-title-1">vs</p>
									</v-col>
									<v-col sm="5" cols="5">
										<p class="mb-0 truco-font text-capitalize" :class="$vuetify.breakpoint.mdAndUp ? 'sz-title-1' : 'sz-title-05'">{{ $utils.formatLength(match.teamTwoName, 10, true) }}</p>
									</v-col>

									<v-col sm="5" cols="5">
										<span class="display-2 primary--text">{{ match.teamOneScore }}</span>
									</v-col>
									<v-col sm="2" cols="2">
										<v-divider vertical></v-divider>
									</v-col>
									<v-col sm="5" cols="5">
										<span class="display-2 primary--text">{{ match.teamTwoScore }}</span>
									</v-col>
								</v-row>
							</v-col>
						</v-row>

						<v-divider :key="index + '_div'"></v-divider>
					</template>
				</v-card>
			</v-col>

			<v-col sm="12" cols="12" class="pa-5" v-if="$utils.isEmpty(temporaryMatch.id) && matchHistory.length == 0">
				<v-alert type="info" color="primary" text>{{ $t('errors.content.noTeams') }}</v-alert>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import moment from 'moment'
import matchService from '../../services/match'
import settingsService from '../../services/settings'

export default {
	data() {
		return {
			temporaryMatch: [],
			matchHistory: [],
			keepNames: false
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
				}
			}).catch(() => {})
		},
		loadSavedMatch() {
			this.matchHistory = []
			matchService.getSavedMatchs().then(matchs => {
				if (matchs && matchs.length > 0) {
					let lastMatchs = []
					for (let match of matchs) {
						if (match && match.length > 0) {
							let tempMatch = match[match.length - 1]
							if (tempMatch && tempMatch.teams) {
								let winnerTeam = ''
								if (tempMatch.teams.teamOneScore > tempMatch.teams.teamTwoScore) {
									winnerTeam = 'TEAM_ONE'
								}
								else {
									winnerTeam = 'TEAM_TWO'
								}

								lastMatchs.push({
									id: tempMatch.id,
									date: tempMatch.date,
									teamOneName: tempMatch.teams.teamOneName,
									teamOneScore: tempMatch.teams.teamOneScore,
									teamTwoName: tempMatch.teams.teamTwoName,
									teamTwoScore: tempMatch.teams.teamTwoScore,
									winner: winnerTeam === 'TEAM_ONE' ? tempMatch.teams.teamOneName : winnerTeam === 'TEAM_TWO' ? tempMatch.teams.teamTwoName : '',
									loser: winnerTeam === 'TEAM_ONE' ? tempMatch.teams.teamTwoName : winnerTeam === 'TEAM_TWO' ? tempMatch.teams.teamOneName : ''
								})
							}
						}
					}

					lastMatchs = lastMatchs.sort((a, b) => {
						return new Date(b.date) - new Date(a.date)
					})

					this.matchHistory = lastMatchs

					return settingsService.getSettings().then(result => {
						if (result && result.author) {
							if (!this.$utils.isEmpty(result.keepNames)) {
								this.keepNames = result.keepNames
							}
						}
					})
				}
			}).catch(() => {})
		},
		setTeamNamesAndPlay(data) {
			if (data && data.winner && data.loser) {
				matchService.saveMatchTeamNames({
					teamOneName: data.teamOneName,
					teamTwoName: data.teamTwoName
				}).then(() => {
					this.$router.push('/play')
				}).catch(() => {})
			}
		},
		processDateAgo(date) {
			if (date) {
				return moment(date).fromNow()
			}
		}
	}
}
</script>
