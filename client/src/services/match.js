import cache from '../plugins/core/cache'
// import moment from 'moment'

const matchService = {
	getRunningMatch() {
		return new Promise((resolve, reject) => {
			let runningMatch = []
			Promise.resolve().then(() => {
				return cache.getCache('truco-running-match').then(result => {
					if (result && result.length > 0) {
						runningMatch = result
					}
				}).catch(error => {
					throw new Error('RUNNING_MATCH_EMPTY, ERROR:', error)
				})
			}).then(() => {
				resolve(runningMatch)
			}).catch(error => {
				reject(error)
			})
		})
	},
	saveRunningMatch(data) {
		return new Promise((resolve, reject) => {
			Promise.resolve().then(() => {
				if (data && data.length > 0) {
					let validMatch = true
					for (const match of data) {
						if (!match.date || !match.teamAdded || !match.teamName) {
							validMatch = false
						}
					}

					if (validMatch) {
						return cache.setCache('truco-running-match', data, false).catch(error => {
							throw new Error('CANNOT_SAVE_MATCH, ERROR:', error)
						})
					}
					else {
						throw new Error('CANNOT_SAVE_RUNNING_MATCH_INVALID_DATA')
					}
				}
				else {
					return true
				}
			}).then(() => {
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},
	removeRunningMatch() {
		return new Promise((resolve, reject) => {
			Promise.resolve().then(() => {
				return cache.removeCache('truco-running-match').catch(error => {
					throw new Error('CANNOT_REMOVE_RUNNING_MATCH, ERROR:', error)
				})
			}).then(() => {
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},
	removeAllMatches() {
		return new Promise((resolve, reject) => {
			Promise.resolve().then(() => {
				return cache.removeCache('truco-running-match').then(() => {
					return cache.removeCache('truco-matchs')
				}).catch(error => {
					throw new Error('CANNOT_REMOVE_ALL_MATCHES, ERROR:', error)
				})
			}).then(() => {
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},
	getSavedMatchs() {
		return new Promise((resolve, reject) => {
			let savedMatchs = []
			Promise.resolve().then(() => {
				return cache.getCache('truco-matchs').then(result => {
					if (result && result.length > 0) {
						savedMatchs = result
					}
				}).catch(error => {
					throw new Error('NO_SAVED_MATCHS, ERROR:', error)
				})
			}).then(() => {
				resolve(savedMatchs)
			}).catch(error => {
				reject(error)
			})
		})
	},
	saveFinishedMatch(data) {
		return new Promise((resolve, reject) => {
			let savedMatchs = []
			Promise.resolve().then(() => {
				// GET MATCHS
				return this.getSavedMatchs().then(result => {
					if (result && result.length > 0) {
						savedMatchs = result
					}
				}).catch(error => {
					if (error) {
						const errorStr = error.toString()
						if (!errorStr.includes('NO_SAVED_MATCHS')) {
							throw error
						}
					}
					else {
						throw error
					}
				})
			}).then(() => {
				if (data && data.length > 0) {
					let validMatch = true
					for (const match of data) {
						if (!match.date || !match.teamAdded || !match.teamName) {
							validMatch = false
						}
					}

					if (validMatch) {
						savedMatchs.push(data)
						return cache.setCache('truco-matchs', savedMatchs, false).catch(error => {
							throw new Error('CANNOT_SAVE_MATCH, ERROR:', error)
						})
					}
				}
				else {
					throw new Error('CANNOT_SAVE_FINISHED_MATCH_INVALID_DATA')
				}
			}).then(() => {
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},
	saveMatchTeamNames(data) {
		return new Promise((resolve, reject) => {
			if (data && data.teamOneName && data.teamTwoName) {
				Promise.resolve().then(() => {
					return cache.setCache('truco-team-names', data, false).catch(error => {
						throw new Error('CANNOT_SAVE_TEAM_NAMES, ERROR:', error)
					})
				}).then(() => {
					resolve()
				}).catch(error => {
					reject(error)
				})
			}
			else {
				throw new Error('CANNOT_SAVE_TEAM_NAMES_INVALID_DATA')
			}
		})
	},
	getMatchTeamNames() {
		return new Promise((resolve, reject) => {
			let teamNames = []
			Promise.resolve().then(() => {
				return cache.getCache('truco-team-names').then(result => {
					if (result && result.teamOneName && result.teamTwoName) {
						teamNames = result
					}
				}).catch(error => {
					throw new Error('NO_TEAM_NAMES_SAVED, ERROR:', error)
				})
			}).then(() => {
				resolve(teamNames)
			}).catch(error => {
				reject(error)
			})
		})
	},
	processMatchTeams() {
		return new Promise((resolve, reject) => {
			let matchHistory = []
			const processedTeams = []

			Promise.resolve().then(() => {
				return this.getSavedMatchs().then(matchs => {
					if (matchs && matchs.length > 0) {
						matchHistory = matchs
					}
				})
			}).then(() => {
				if (matchHistory && matchHistory.length > 0) {
					const lastMatchs = []

					// CLEAR RESULTS
					for (const match of matchHistory) {
						if (match && match.length > 0) {
							const tempMatch = match[match.length - 1]
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

					const existingTeams = []
					if (lastMatchs && lastMatchs.length > 0) {
						// BUILD DEFAULT
						for (const match of lastMatchs) {
							if (!existingTeams.includes(match.teamOneName)) {
								existingTeams.push(match.teamOneName)
								processedTeams[match.teamOneName] = {
									name: match.teamOneName,
									wins: 0,
									losses: 0,
									matchs: []
								}
							}

							if (!existingTeams.includes(match.teamTwoName)) {
								existingTeams.push(match.teamTwoName)
								processedTeams[match.teamTwoName] = {
									name: match.teamTwoName,
									wins: 0,
									losses: 0,
									matchs: []
								}
							}
						}

						// SET DATA
						for (const match of lastMatchs) {
							if (processedTeams[match.teamOneName]) {
								if (match.winner === match.teamOneName) {
									processedTeams[match.teamOneName].wins = processedTeams[match.teamOneName].wins + 1
								}
								else {
									processedTeams[match.teamOneName].losses = processedTeams[match.teamOneName].losses + 1
								}

								processedTeams[match.teamOneName].matchs.push(match)
							}

							if (processedTeams[match.teamTwoName]) {
								if (match.winner === match.teamTwoName) {
									processedTeams[match.teamTwoName].wins = processedTeams[match.teamTwoName].wins + 1
								}
								else {
									processedTeams[match.teamTwoName].losses = processedTeams[match.teamTwoName].losses + 1
								}

								processedTeams[match.teamTwoName].matchs.push(match)
							}
						}
					}

					return true
				}
				else {
					throw new Error('NO_SAVED_MATCHS_EMPTY')
				}
			}).then(() => {
				resolve(processedTeams)
			}).catch(error => {
				reject(error)
			})
		})
	}
}

export default matchService
