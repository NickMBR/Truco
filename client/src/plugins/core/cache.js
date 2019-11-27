import localforage from 'localforage'

function checkCacheExpiration(expireTime) {
	if (expireTime) {
		return new Date().getTime() <= expireTime
	}
}

function removeCache(name) {
	return new Promise((resolve, reject) => {
		if (name) {
			localforage.setDriver([ localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE ]).then(() => {
				localforage.removeItem(name).then(() => {
					resolve()
				}).catch(error => {
					console.log('removeCache ERROR', name, error)
				})
			}).catch(error => {
				console.log('removeCache ERROR', error)
			})
		}
		else {
			reject(Error('Invalid name or expiration for caching value'))
		}
	})
}

function setCache(name, value, expireTime) {
	return new Promise((resolve, reject) => {
		if (name && expireTime) {
			localforage.setDriver([ localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE ]).then(() => {
				let cache = {
					content: value,
					expires: (new Date().getTime()) + (60000 * expireTime)
				}

				localforage.setItem(name, cache).then(() => {
					resolve()
				}).catch(error => {
					console.log('setCache ERROR', error)
				})
			}).catch(error => {
				console.log('setCache ERROR', error)
			})
		}
		else {
			reject(Error('Invalid name or expiration for caching value'))
		}
	})
}

function getCache(name) {
	return new Promise((resolve, reject) => {
		if (name) {
			localforage.setDriver([ localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE ]).then(() => {
				localforage.getItem(name).then(result => {
					if (result && result.content && result.expires) {
						if (checkCacheExpiration(result.expires)) {
							resolve(result.content)
						}
						else {
							localforage.removeItem(name).then(() => {
								reject(Error('Cached value is expired'))
							})
						}
					}
					else {
						reject(Error('Cached value do not exists'))
					}
				}).catch(error => {
					console.log('getCache ERROR', error)
				})
			}).catch(error => {
				console.log('getCache ERROR', error)
			})
		}
		else {
			reject(Error('Invalid name for get cached value'))
		}
	})
}

export default {
	setCache,
	getCache,
	removeCache
}
