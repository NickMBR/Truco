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

					<!--<v-row no-gutters align="center" justify="center">
						<v-col sm="12" cols="12" class="pl-3 elevation-3">
							<v-row no-gutters class="noselect text-no-wrap">
								<v-col sm="1" cols="1">
									<p class="mb-0 pt-2 truco-font sz-title-05 text-capitalize">{{ 'Rank' }}</p>
								</v-col>
								<v-col sm="5" cols="5">
									<p class="mb-0 pt-2 truco-font sz-title-05 text-capitalize">{{ 'Nome' }}</p>
								</v-col>
								<v-col sm="2" cols="2">
									<p class="mb-0 pt-2 truco-font sz-title-05">{{ 'Vitórias' }}</p>
								</v-col>
								<v-col sm="2" cols="2">
									<p class="mb-0 pt-2 truco-font sz-title-05 text-capitalize">{{ 'Derrotas' }}</p>
								</v-col>
								<v-col sm="2" cols="2">
									<p class="mb-0 pt-2 truco-font sz-title-05 text-capitalize">{{ 'V/D' }}</p>
								</v-col>
							</v-row>
						</v-col>

						<v-col sm="12" cols="12" class="px-3" v-for="(team, index) in Object.keys(processedTeams)" :key="index">
							<v-row no-gutters class="noselect text-no-wrap">
								<v-col sm="1" cols="1">
									<p class="mb-0 pt-2 truco-font sz-title-1 text-capitalize grey--text">#{{ index + 1 }}</p>
								</v-col>
								<v-col sm="5" cols="5">
									<p class="mb-0 pt-2 truco-font sz-title-1 text-capitalize">{{ processedTeams[team].name }}</p>
								</v-col>
								<v-col sm="2" cols="2">
									<p class="mb-0 pt-2 truco-font sz-title-1">{{ processedTeams[team].wins }}</p>
								</v-col>
								<v-col sm="2" cols="2">
									<p class="mb-0 pt-2 truco-font sz-title-1 text-capitalize">{{ processedTeams[team].losses }}</p>
								</v-col>
								<v-col sm="2" cols="2">
									<p class="mb-0 pt-2 truco-font sz-title-1 text-capitalize">{{ (Number(processedTeams[team].wins) / (Number(processedTeams[team].losses) === 0 ? 1 : Number(processedTeams[team].losses))).toFixed(2) }}</p>
								</v-col>
							</v-row>
							<v-divider v-if="index != Object.keys(processedTeams).length - 1"></v-divider>
						</v-col>
					</v-row>-->

					<!--<v-list class="py-0">
						<v-list-item v-for="(team, index) in Object.keys(processedTeams)" :key="index">
							<v-list-item-content>
								<v-list-item-subtitle class="caption">
									{{ processedTeams[team] }}
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</v-list>-->
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
					this.processedTeams = result
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
