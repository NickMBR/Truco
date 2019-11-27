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
					reject(Error('KEY_REMOVE_ERROR: ' + error))
				})
			}).catch(error => {
				reject(Error('CACHE_DRIVER_ERROR: ' + error))
			})
		}
		else {
			reject(Error('NO_KEY_FOUND_TO_REMOVE'))
		}
	})
}

function setCache(name, value, expireTime) {
	return new Promise((resolve, reject) => {
		if (name && value) {
			localforage.setDriver([ localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE ]).then(() => {
				let cache = {
					content: value,
					expires: expireTime ? (new Date().getTime()) + (60000 * expireTime) : null
				}

				localforage.setItem(name, cache).then(() => {
					resolve()
				}).catch(error => {
					reject(Error('KEY_SET_ERROR: ' + error))
				})
			}).catch(error => {
				reject(Error('CACHE_DRIVER_ERROR: ' + error))
			})
		}
		else {
			reject(Error('KEY_NAME_VALUE_INVALID_TO_SET'))
		}
	})
}

function getCache(name) {
	return new Promise((resolve, reject) => {
		if (name) {
			localforage.setDriver([ localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE ]).then(() => {
				localforage.getItem(name).then(result => {
					if (result && result.content) {
						if (result.expires) {
							if (checkCacheExpiration(result.expires)) {
								resolve(result.content)
							}
							else {
								localforage.removeItem(name).then(() => {
									reject(Error('CACHE_IS_EXPIRED'))
								}).catch(error => {
									reject(Error('KEY_REMOVE_ON_EXPIRATION_ERROR: ' + error))
								})
							}
						}
						else {
							resolve(result.content)
						}
					}
					else {
						reject(Error('CACHE_DOES_NOT_EXISTS'))
					}
				}).catch(error => {
					reject(Error('KEY_GET_ERROR: ' + error))
				})
			}).catch(error => {
				reject(Error('CACHE_DRIVER_ERROR: ' + error))
			})
		}
		else {
			reject(Error('KEY_NAME_VALUE_INVALID_TO_GET'))
		}
	})
}

export default {
	setCache,
	getCache,
	removeCache
}
