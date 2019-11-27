export default {
	install(Vue) {
		const bus = new Vue()
		Vue.prototype.$bus = bus
	}
}
