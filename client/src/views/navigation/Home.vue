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
											<v-list-item-title>
												<v-icon :color="$store.getters.colorMode ? active ? 'grey darken-4' : 'white' : $vuetify.theme.dark || active ? 'white' : ''">{{ item.icon }}</v-icon>
											</v-list-item-title>
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
				<v-row no-gutters align="center" justify="center" class="pa-5 text-center">
					<!--<v-col sm="12" class="pa-5 text-center">
						<v-row no-gutters class="noselect">
							<v-col sm="5" cols="5" @click="teamOneClick()" style="cursor: pointer;">
								<p class="truco-font sz-title-4 text-capitalize">{{ teamOneName }}</p>
								<div v-if="animateTeamOneScore" class="animated rubberBand">
									<span class="display-4 primary--text">{{ teamOneScore }}</span>
								</div>
							</v-col>
							<v-col sm="2" cols="2">
								<v-divider vertical></v-divider>
							</v-col>
							<v-col sm="5" cols="5" @click="teamTwoClick()" style="cursor: pointer;">
								<p class="truco-font sz-title-4 text-capitalize">{{ teamTwoName }}</p>
								<div v-if="animateTeamTwoScore" class="animated rubberBand">
									<span class="display-4 primary--text">{{ teamTwoScore }}</span>
								</div>
							</v-col>
						</v-row>
					</v-col>-->
					<v-col sm="12" cols="12" @click="teamOneClick()" style="cursor: pointer;">
						<p class="truco-font sz-title-4 text-capitalize">{{ teamOneName }}</p>
						<div v-if="animateTeamOneScore" class="animated rubberBand">
							<span class="display-4 primary--text">{{ teamOneScore }}</span>
						</div>
					</v-col>
					<v-col sm="12" cols="12">
						<v-divider></v-divider>
					</v-col>
					<v-col sm="12" cols="12" @click="teamTwoClick()" style="cursor: pointer;">
						<p class="truco-font sz-title-4 text-capitalize">{{ teamTwoName }}</p>
						<div v-if="animateTeamTwoScore" class="animated rubberBand">
							<span class="display-4 primary--text">{{ teamTwoScore }}</span>
						</div>
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
			winnerTeam: '',
			teamOneName: 'Team 1',
			teamTwoName: 'Team 2',

			// SCORE
			toggleScoreMode: 0,
			teamOneScore: 0,
			teamTwoScore: 0,

			// ANIMATIONS
			animateTeamOneScore: true,
			animateTeamTwoScore: true
		}
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
		sumScore(val, team) {
			let totalScore = Number(val) + Number(this.formatScoreMode(this.toggleScoreMode))

			if (this.$utils.isEmpty(this.winnerTeam)) {
				if (totalScore >= 12) {
					// TEAM WON
					console.log('WINNER IS', team)
					this.winnerTeam = team
					if (team === 'TEAM_ONE') {
						this.teamOneScore = 12
					}
					else if (team === 'TEAM_TWO') {
						this.teamTwoScore = 12
					}

					this.$store.dispatch('setAlert', 'MATCH_WINNER')
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
				console.log('WINNER IS', this.winnerTeam)
				this.$store.dispatch('setAlert', 'MATCH_WINNER')
			}

			// RESET SCORE MODE
			if (this.toggleScoreMode != 0) {
				this.toggleScoreMode = 0
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
		}
	},
	watch: {
		'$store.getters.action'() {
			if (this.$store.getters.action == 'RESET_MATCH') {
				this.winnerTeam = ''
				this.toggleScoreMode = 0
				this.teamOneScore = 0
				this.teamTwoScore = 0
				this.$store.dispatch('setAction', '')
			}
			else if (this.$store.getters.action == 'SAVE_MATCH') {
				console.log('SAVE_MATCH')
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

<style scoped src="../../assets/css/animate.min.css">
</style>