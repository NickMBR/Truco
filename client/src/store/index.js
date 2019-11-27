import Vue from 'vue'
import Vuex from 'vuex'

import AlertModule from './modules/alert'
import SettingsModule from './modules/settings'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		AlertModule,
		SettingsModule
	}
})

export default store
