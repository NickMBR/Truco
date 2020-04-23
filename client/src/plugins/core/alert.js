export default {
	install(Vue) {
		const instance = Vue.prototype.$alert = (params, content) => {
			Vue.prototype.$bus.$emit('TRIGGER_ALERT', params, content)
		}

		return instance
	}
}