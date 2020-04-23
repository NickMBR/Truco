<template>
	<v-container fluid class="pa-0">
		<v-row no-gutters style="height: 100%;">
			<v-col sm="12" cols="12" class="pa-5">
				<v-toolbar flat color="transparent">
					<p class="truco-font sz-title-4 primary--text mt-6">{{ $t('menu.ranking') }}</p>
				</v-toolbar>
			</v-col>

			<v-col sm="12" cols="12" class="pa-5" v-if="processedTeams && Object.keys(processedTeams) && Object.keys(processedTeams).length > 0">
				<v-card>
					<v-toolbar color="primary" :class="$store.getters.colorMode ? 'grey--text text--darken-4' : 'white--text'">
						<v-toolbar-title class="">{{ $t('common.table') }}</v-toolbar-title>
					</v-toolbar>

					<v-simple-table>
						<template v-slot:default>
							<thead>
								<tr>
									<th class="text-left">{{ $t('common.rank') }}</th>
									<th class="text-left" width="50%">{{ $t('common.name') }}</th>
									<th class="text-left">{{ $t('common.wins') }}</th>
									<th class="text-left">{{ $t('common.losses') }}</th>
									<th class="text-left">{{ $t('common.winLossRatio') }}</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(team, index) in Object.keys(processedTeams)" :key="index">
									<td>#{{ index + 1 }}</td>
									<td>{{ processedTeams[team].name }}</td>
									<td>{{ processedTeams[team].wins }}</td>
									<td>{{ processedTeams[team].losses }}</td>
									<td>{{ (Number(processedTeams[team].wins) / (Number(processedTeams[team].losses) === 0 ? 1 : Number(processedTeams[team].losses))).toFixed(2) }}</td>
								</tr>
							</tbody>
						</template>
					</v-simple-table>
				</v-card>
			</v-col>

			<v-col sm="12" cols="12" class="pa-5" v-if="processedTeams && Object.keys(processedTeams).length == 0">
				<v-alert type="info" color="primary" text>{{ $t('errors.content.noTeams') }}</v-alert>
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
			processedTeams: []
		}
	},
	mounted() {
		this.laodMatchHistory()
	},
	methods: {
		laodMatchHistory() {
			matchService.processMatchTeams().then(result => {
				if (result && Object.keys(result) && Object.keys(result).length > 0) {
					let orderedTeams = []
					for (const team of Object.keys(result)) {
						result[team].ratio = (Number(result[team].wins) / (Number(result[team].losses) === 0 ? 1 : Number(result[team].losses))).toFixed(2)
						orderedTeams.push(result[team])
					}

					orderedTeams = orderedTeams.sort((a, b) => {
						return b.ratio - a.ratio
					})

					this.processedTeams = orderedTeams
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
