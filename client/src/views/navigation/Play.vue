<template>
	<v-container fluid class="pa-0">
		<v-card elevation="4">
			<v-item-group mandatory v-model="toggleScoreMode">
				<v-row no-gutters align="center" justify="space-between">
					<v-col v-for="item in scoreItems" :key="item.name" cols="2" md="2">
						<v-item v-slot:default="{ active, toggle }">
							<v-card flat :color="active ? $store.getters.colorMode ? 'primary' : 'primary' : 'transparent'" class="text-center" @click="toggle">
								<v-list dense disabled color="transparent">
									<v-list-item>
										<v-list-item-content>
											<v-icon small :color="$store.getters.colorMode ? active ? 'grey darken-4' : 'white' : $vuetify.theme.dark || active ? 'white' : ''">{{ item.icon }}</v-icon>
											<v-list-item-title :class="$store.getters.colorMode ? active ? 'grey--text text--darken-4' : 'white--text' : $vuetify.theme.dark || active ? 'white--text' : ''">
												{{ item.name }}
											</v-list-item-title>
										</v-list-item-content>
									</v-list-item>
								</v-list>
							</v-card>
						</v-item>
					</v-col>
				</v-row>
			</v-item-group>
		</v-card>

		<v-row no-gutters style="height: 100%;">
			<v-col sm="12" cols="12" class="mt-5">
				<v-row no-gutters align="center" justify="center" class="text-center">
					<v-col sm="12" class="pa-5 text-center">
						<v-row no-gutters class="noselect text-no-wrap">
							<v-col sm="5" cols="5" @click="changeName('TEAM_ONE', true)" style="cursor: pointer;">
								<v-badge v-model="teamOneBadge" class="align-self-center" color="primary">
									<template v-slot:badge>
										<span :class="$store.getters.colorMode ? 'grey--text text--darken-4' : 'white--text'"><strong>{{ teamOneBadgeScore }}</strong></span>
									</template>
									<p class="mb-0 truco-font text-capitalize" :class="$vuetify.breakpoint.mdAndUp ? 'sz-title-2' : 'sz-title-05'">{{ $utils.formatLength(teamOneName, 10, true) }}</p>
								</v-badge>
							</v-col>
							<v-col sm="2" cols="2">
								<p class="mb-0 truco-font" :class="$vuetify.breakpoint.mdAndUp ? 'sz-title-2' : 'sz-title-05'">vs</p>
							</v-col>
							<v-col sm="5" cols="5" @click="changeName('TEAM_TWO', true)" style="cursor: pointer;">
								<v-badge v-model="teamTwoBadge" class="align-self-center" color="primary">
									<template v-slot:badge>
										<span :class="$store.getters.colorMode ? 'grey--text text--darken-4' : 'white--text'"><strong>{{ teamTwoBadgeScore }}</strong></span>
									</template>
									<p class="mb-0 truco-font text-capitalize" :class="$vuetify.breakpoint.mdAndUp ? 'sz-title-2' : 'sz-title-05'">{{ $utils.formatLength(teamTwoName, 10, true) }}</p>
								</v-badge>
							</v-col>

							<v-col sm="5" cols="5" @click="teamOneClick()" style="cursor: pointer;" class="pa-5">
								<div v-if="animateTeamOneScore" class="animated rubberBand">
									<span class="display-4 primary--text">{{ teamOneScore }}</span>
								</div>
							</v-col>
							<v-col sm="2" cols="2">
								<v-divider vertical></v-divider>
							</v-col>
							<v-col sm="5" cols="5" @click="teamTwoClick()" style="cursor: pointer;" class="pa-5">
								<div v-if="animateTeamTwoScore" class="animated rubberBand">
									<span class="display-4 primary--text">{{ teamTwoScore }}</span>
								</div>
							</v-col>

							<v-col sm="12" cols="12" class="mt-12" v-if="matchHistory && matchHistory.length > 0">
								<v-btn large rounded :disabled="disableUndo" @click="undoScore()">{{ $t('actions.undo') }}</v-btn>
							</v-col>

							<v-col sm="12" cols="12" class="mt-12" v-if="showMatchHistory && processHistoryDisplay()">
								<p class="caption grey--text">{{ $t('common.history') }}</p>
								<template v-for="(history, index) in matchHistory" class="mt-5">
									<p :key="index" class="caption grey--text mb-0">
										<template v-if="history.type === 'SCORE' && history.pointsAdded > 0">
											{{ `${history.teamName} ${$t('common.scored')} ${history.pointsAdded} ${history.pointsAdded > 1 ? $t('common.points') : $t('common.point')}` }}
										</template>
										<template v-if="history.type === 'NAME'">
											{{ `${history.teamOldName} ${$t('game.changedName')} ${history.teamName}` }}
										</template>
									</p>
								</template>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-col>
		</v-row>

		<v-dialog v-model="teamChangingName" persistent max-width="400">
			<v-card flat>
				<v-card-title>
					{{ $t('forms.teamName') }}
				</v-card-title>

				<v-card-text class="py-12 px-4 text-center">
					<v-form @submit.prevent="validateName" ref="nameForm">
						<v-text-field outlined :label="$t('forms.teamName')" v-model="teamNameChange" maxlength="25" :rules="[$rules.required, $rules.alphaNumeric]"></v-text-field>
					</v-form>
				</v-card-text>

				<v-card-actions class="pa-4">
					<v-spacer></v-spacer>

					<v-btn :class="$store.getters.colorMode ? 'grey--text text--darken-4' : 'white--text'" color="primary" @click="validateName()">{{ $t('actions.save') }}</v-btn>
					<v-btn class="" color="" @click="teamChangingName = false">{{ $t('actions.cancel') }}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
import moment from 'moment'
import matchService from '../../services/match'
import settingsService from '../../services/settings'

export default {
	data() {
		return {
			active: 1,
			bottomMenu: true,

			// SCORE MENU
			scoreItems: [
				{
					name: '1',
					icon: '●',
					value: 1
				},
				{
					name: '3',
					icon: '♦',
					value: 3
				},
				{
					name: '6',
					icon: '♠',
					value: 6
				},
				{
					name: '9',
					icon: '♥',
					value: 9
				},
				{
					name: '12',
					icon: '♣',
					value: 12
				}
			],

			// TEAMS
			teamChangingName: false,
			teamNameChange: '',
			winnerTeam: '',
			teamOneName: 'A',
			teamTwoName: 'B',

			// SCORE
			toggleScoreMode: 0,
			teamOneScore: 0,
			teamTwoScore: 0,

			// HISTORY
			disableUndo: true,
			matchHistory: [],
			matchHistoryPointer: -1,

			// TEAM SCORES HISTORY
			matchTeamsHistory: [],
			teamOneBadge: false,
			teamTwoBadge: false,
			teamOneBadgeScore: 0,
			teamTwoBadgeScore: 0,

			// ANIMATIONS
			animateTeamOneScore: true,
			animateTeamTwoScore: true,

			// SETTINGS
			showMatchHistory: true,
			keepNames: true
		}
	},
	created() {
		window.addEventListener('beforeunload', this.saveRunningMatch)
	},
	mounted() {
		this.$bus.$on('RESET_MATCH', () => {
			this.resetMatch()
		})
		this.$bus.$on('SAVE_AND_RESET_MATCH', () => {
			matchService.saveFinishedMatch(this.matchHistory).then(() => {
				this.resetMatch()
			}).catch(() => {})
		})

		this.loadTemporaryMatch()
	},
	beforeDestroy() {
		this.$bus.$off('RESET_MATCH')
		this.$bus.$off('SAVE_AND_RESET_MATCH')
		window.removeEventListener('beforeunload', this.saveRunningMatch)
		this.saveRunningMatch()
	},
	methods: {
		formatScoreMode(mode) {
			if (mode === 0) {
				return 1
			}
			else if (mode === 1) {
				return 3
			}
			else if (mode === 2) {
				return 6
			}
			else if (mode === 3) {
				return 9
			}
			else if (mode === 4) {
				return 12
			}
		},
		getWinnerTeam(team) {
			if (team === 'TEAM_ONE') {
				return {
					winner: {
						name: this.teamOneName,
						score: this.teamOneScore
					},
					loser: {
						name: this.teamTwoName,
						score: this.teamTwoScore
					}
				}
			}
			else if (team === 'TEAM_TWO') {
				return {
					winner: {
						name: this.teamTwoName,
						score: this.teamTwoScore
					},
					loser: {
						name: this.teamOneName,
						score: this.teamOneScore
					}
				}
			}
		},
		sumScore(val, team) {
			const totalScore = Number(val) + Number(this.formatScoreMode(this.toggleScoreMode))

			if (this.$utils.isEmpty(this.winnerTeam)) {
				if (totalScore >= 12) {
					this.winnerTeam = team
					if (team === 'TEAM_ONE') {
						this.teamOneScore = 12
					}
					else if (team === 'TEAM_TWO') {
						this.teamTwoScore = 12
					}

					this.$alert('MATCH_WINNER', this.getWinnerTeam(this.winnerTeam))
				}
				else {
					if (team === 'TEAM_ONE') {
						this.teamOneScore = totalScore
					}
					else if (team === 'TEAM_TWO') {
						this.teamTwoScore = totalScore
					}
				}
			}
			else {
				this.$alert('MATCH_WINNER', this.getWinnerTeam(this.winnerTeam))
			}

			// SET HISTORY
			this.matchHistoryPointer++
			this.matchHistory.push({
				id: Math.random().toString(36).substr(2, 8).toUpperCase(),
				type: 'SCORE',
				date: moment().format('YYYY-MM-DD HH:mm'),
				teamAdded: team,
				teamName: team === 'TEAM_ONE' ? this.teamOneName : this.teamTwoName,
				teamOldName: team === 'TEAM_ONE' ? this.teamOneName : this.teamTwoName,
				teamOldScore: Number(val),
				teamNewScore: totalScore >= 12 ? 12 : totalScore,
				pointsAdded: Number(this.formatScoreMode(this.toggleScoreMode)),
				matchHistoryPointer: this.matchHistoryPointer,
				teams: {
					teamOneName: this.teamOneName,
					teamOneScore: this.teamOneScore,
					teamTwoName: this.teamTwoName,
					teamTwoScore: this.teamTwoScore
				}
			})

			// RESET SCORE MODE
			if (this.toggleScoreMode !== 0) {
				this.toggleScoreMode = 0
			}
		},
		changeName(team, shouldEdit) {
			if (team === 'TEAM_ONE') {
				this.teamChange = team
				this.teamNameChange = this.teamOneName
			}
			else if (team === 'TEAM_TWO') {
				this.teamChange = team
				this.teamNameChange = this.teamTwoName
			}

			this.teamChangingName = true
		},
		validateName() {
			if (this.$refs.nameForm.validate() && !this.$utils.isEmpty(this.teamNameChange)) {
				// CHECK CHANGES
				let hasChanges = false
				if (this.teamChange === 'TEAM_ONE') {
					if (this.teamNameChange !== this.teamOneName) {
						hasChanges = true
					}
				}
				else if (this.teamChange === 'TEAM_TWO') {
					if (this.teamNameChange !== this.teamTwoName) {
						hasChanges = true
					}
				}

				if (hasChanges) {
					if (this.teamChange === 'TEAM_ONE') {
						this.teamOneName = this.teamNameChange
					}
					else if (this.teamChange === 'TEAM_TWO') {
						this.teamTwoName = this.teamNameChange
					}

					this.$nextTick(() => {
						// SET HISTORY
						this.matchHistory.push({
							id: Math.random().toString(36).substr(2, 8).toUpperCase(),
							type: 'NAME',
							date: moment().format('YYYY-MM-DD HH:mm'),
							teamAdded: this.teamChange,
							teamName: this.teamNameChange,
							teamOldName: this.teamChange === 'TEAM_ONE' ? this.teamOneName : this.teamTwoName,
							teamOldScore: null,
							teamNewScore: null,
							pointsAdded: null,
							matchHistoryPointer: this.matchHistoryPointer,
							teams: {
								teamOneName: this.teamOneName,
								teamOneScore: this.teamOneScore,
								teamTwoName: this.teamTwoName,
								teamTwoScore: this.teamTwoScore
							}
						})

						this.teamChangingName = false
						this.teamNameChange = ''

						if (this.keepNames) {
							matchService.saveMatchTeamNames({
								teamOneName: this.teamOneName,
								teamTwoName: this.teamTwoName
							}).then(() => {
								this.loadSavedMatchs()
							}).catch(() => {})
						}
					})
				}
				else {
					this.teamNameChange = ''
					this.teamChangingName = false
				}
			}
		},
		teamOneClick() {
			this.sumScore(this.teamOneScore, 'TEAM_ONE')
			this.animateTeamOneScore = false
			this.$nextTick(() => {
				this.animateTeamOneScore = true
			})
		},
		teamTwoClick() {
			this.sumScore(this.teamTwoScore, 'TEAM_TWO')
			this.animateTeamTwoScore = false
			this.$nextTick(() => {
				this.animateTeamTwoScore = true
			})
		},
		saveRunningMatch() {
			if (this.matchHistory && this.matchHistory.length > 0) {
				matchService.saveRunningMatch(this.matchHistory)
			}
		},
		setHardResetNames() {
			if (this.teamOneName === 'A') {
				this.teamOneName = this.$t('game.teamA')
			}
			if (this.teamTwoName === 'B') {
				this.teamTwoName = this.$t('game.teamB')
			}

			this.loadSavedMatchs()
		},
		setDefaultNames() {
			settingsService.getSettings().then(result => {
				if (result && result.author) {
					if (!this.$utils.isEmpty(result.showHistory)) {
						this.showMatchHistory = result.showHistory
					}

					if (!this.$utils.isEmpty(result.keepNames)) {
						this.keepNames = result.keepNames
					}

					this.$nextTick(async () => {
						if (this.keepNames) {
							matchService.getMatchTeamNames().then(result => {
								if (result && result.teamOneName && result.teamTwoName) {
									this.teamOneName = result.teamOneName
									this.teamTwoName = result.teamTwoName
									this.loadSavedMatchs()
								}
							}).catch(error => {
								if (error && error.toString().includes('NO_TEAM_NAMES_SAVED')) {
									this.setHardResetNames()
								}
							})
						}
						else {
							this.setHardResetNames()
						}
					})
				}
				else {
					this.setHardResetNames()
				}
			}).catch(() => {
				this.setHardResetNames()
			})
		},
		loadTemporaryMatch() {
			matchService.getRunningMatch().then(match => {
				if (match && match.length > 0) {
					const data = match[match.length - 1]
					this.matchHistory = match

					if (data && data.teams) {
						this.matchHistoryPointer = data.matchHistoryPointer

						const matchs = this.getMatchPointsHistory()
						let selectedMatch = []
						for (const match of matchs) {
							if (match.matchHistoryPointer === data.matchHistoryPointer) {
								selectedMatch = match
							}
						}

						if (selectedMatch && selectedMatch.id && selectedMatch.teams) {
							this.teamOneName = selectedMatch.teams.teamOneName
							this.teamOneScore = selectedMatch.teams.teamOneScore
							this.teamTwoName = selectedMatch.teams.teamTwoName
							this.teamTwoScore = selectedMatch.teams.teamTwoScore
						}

						this.setDefaultNames()
					}
				}
				else {
					this.resetMatch()
					this.setDefaultNames()
				}
			}).catch(() => {
				this.setDefaultNames()
			})
		},
		processHistoryDisplay() {
			const matchScores = this.getMatchPointsHistory()
			const ammount = []
			for (const match of this.matchHistory) {
				if (match.type === 'SCORE' || match.type === 'NAME') {
					ammount.push(match)
				}
			}

			if (matchScores && matchScores.length > 1) {
				this.disableUndo = false
			}
			else {
				this.disableUndo = true
			}

			if (ammount && ammount.length > 1) {
				return true
			}
			else {
				return false
			}
		},
		loadSavedMatchs() {
			this.teamOneBadge = false
			this.teamTwoBadge = false
			this.teamOneBadgeScore = 0
			this.teamTwoBadgeScore = 0

			matchService.processMatchTeams().then(result => {
				if (result && Object.keys(result) && Object.keys(result).length > 0) {
					this.matchTeamsHistory = result

					// CHECK IF BOTH TEAMS EXISTS
					let teamOneExists = false
					let teamTwoExists = false
					let teamsPlayedAgainst = false
					const teamMatchs = []
					const alreadySeenMatch = []
					for (const team of Object.keys(this.matchTeamsHistory)) {
						if (team === this.teamOneName) {
							teamOneExists = true
						}

						if (team === this.teamTwoName) {
							teamTwoExists = true
						}

						// NOW CHECK IF BOTH TEAMS PLAYED AGAINST EACH OTHER
						for (const match of this.matchTeamsHistory[team].matchs) {
							if ((match.teamOneName === this.teamOneName || match.teamOneName === this.teamTwoName) && (match.teamTwoName === this.teamOneName || match.teamTwoName === this.teamTwoName)) {
								teamsPlayedAgainst = true
								if (!alreadySeenMatch.includes(match.id)) {
									teamMatchs.push(match)
									alreadySeenMatch.push(match.id)
								}
							}
						}
					}

					if (teamOneExists && teamTwoExists && teamsPlayedAgainst) {
						// NOW SET SCORE FOR BOTH TEAMS
						if (teamMatchs.length > 0) {
							for (const match of teamMatchs) {
								if (match.winner === this.teamOneName) {
									this.teamOneBadgeScore = this.teamOneBadgeScore + 1
								}
								if (match.winner === this.teamTwoName) {
									this.teamTwoBadgeScore = this.teamTwoBadgeScore + 1
								}
							}

							this.teamOneBadge = true
							this.teamTwoBadge = true
						}
					}
				}
			}).catch(() => {})
		},
		resetMatch() {
			this.matchHistory = []
			this.winnerTeam = ''
			this.toggleScoreMode = 0
			this.teamOneScore = 0
			this.teamTwoScore = 0
			this.matchHistoryPointer = -1
			this.teamNameChange = ''

			// REMOVE SAVED MATCH
			matchService.removeRunningMatch().then(() => {
				this.setDefaultNames()

				this.matchHistoryPointer++
				this.matchHistory.push({
					id: Math.random().toString(36).substr(2, 8).toUpperCase(),
					type: 'SCORE',
					date: moment().format('YYYY-MM-DD HH:mm'),
					teamAdded: 'TEAM_ONE',
					teamName: this.teamOneName,
					teamOldName: this.teamOneName,
					teamOldScore: 0,
					teamNewScore: 0,
					pointsAdded: 0,
					matchHistoryPointer: this.matchHistoryPointer,
					teams: {
						teamOneName: this.teamOneName,
						teamOneScore: this.teamOneScore,
						teamTwoName: this.teamTwoName,
						teamTwoScore: this.teamTwoScore
					}
				})
			}).catch(() => {})
		},
		getMatchPointsHistory() {
			if (this.matchHistory && this.matchHistory.length > 0) {
				const pointsHistory = []

				for (const match of this.matchHistory) {
					if (match.type === 'SCORE') {
						pointsHistory.push(match)
					}
				}

				return pointsHistory
			}
		},
		undoScore() {
			const matchs = this.getMatchPointsHistory()
			if (matchs && matchs.length > 0) {
				this.showMatchHistory = true
				let selectedMatch = []
				if (this.matchHistoryPointer > 0) {
					this.matchHistory.forEach((history, index) => {
						if (history.type === 'SCORE' && history.matchHistoryPointer === this.matchHistoryPointer) {
							console.log('SHOULD REMOVE')
							this.matchHistory.splice(index, 1)
						}
					})

					this.matchHistoryPointer--

					for (const match of matchs) {
						if (Number(match.matchHistoryPointer) === Number(this.matchHistoryPointer)) {
							selectedMatch = match
						}
					}

					if (selectedMatch && selectedMatch.id && selectedMatch.teams) {
						this.teamOneScore = selectedMatch.teams.teamOneScore
						this.teamTwoScore = selectedMatch.teams.teamTwoScore

						this.matchHistory.push({
							id: Math.random().toString(36).substr(2, 8).toUpperCase(),
							type: 'UNDO',
							date: moment().format('YYYY-MM-DD HH:mm'),
							teamAdded: selectedMatch.teamAdded,
							teamName: selectedMatch.teamAdded === 'TEAM_ONE' ? this.teamOneName : this.teamTwoName,
							teamOldName: selectedMatch.teamAdded === 'TEAM_ONE' ? this.teamOneName : this.teamTwoName,
							teamOldScore: Number(selectedMatch.teamOldScore),
							teamNewScore: Number(selectedMatch.teamNewScore),
							pointsAdded: selectedMatch.pointsAdded,
							matchHistoryPointer: this.matchHistoryPointer,
							teams: {
								teamOneName: this.teamOneName,
								teamOneScore: this.teamOneScore,
								teamTwoName: this.teamTwoName,
								teamTwoScore: this.teamTwoScore
							}
						})
					}
				}
			}
			else {
				this.showMatchHistory = false
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

<style scoped src="../../assets/css/animate.min.css">
</style>
