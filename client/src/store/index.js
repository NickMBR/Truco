import Vue from 'vue'
import Vuex from 'vuex'

import AlertModule from './modules/alert'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		AlertModule
	}
})

export default store
