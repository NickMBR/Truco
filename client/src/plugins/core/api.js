import axios from 'axios'

let api = {
	get: (path, payload, timeout) => {
		return new Promise((resolve, reject) => {
			axios.get(path, { params: payload }, { timeout: timeout || 5000 }).then(response => {
				if (response && response.data && response.status === 200) {
					let content = response.data && response.data.content ? response.data.content : null
					resolve(content)
				}
				else {
					reject(response)
				}
			}).catch(error => {
				reject(error)
			})
		})
	},
	post: (path, payload, timeout) => {
		return new Promise((resolve, reject) => {
			axios.post(path, payload, { timeout: timeout || 5000 }).then(response => {
				if (response && response.data && response.status === 200) {
					let content = response.data && response.data.content ? response.data.content : null
					resolve(content)
				}
				else {
					reject(response)
				}
			}).catch(error => {
				reject(error)
			})
		})
	},
	getExternal: (path, payload, timeout) => {
		return new Promise((resolve, reject) => {
			axios.get(path, { params: payload }, { timeout: timeout || 5000 }).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	}
}

export default api
