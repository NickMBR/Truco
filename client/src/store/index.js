import Vue from 'vue'
import Vuex from 'vuex'

import UserModule from './modules/user'
import AlertModule from './modules/alert'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		UserModule,
		AlertModule
	}
})

export default store
