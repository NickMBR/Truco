import Vue from 'vue'
import Vuex from 'vuex'

import SettingsModule from './modules/settings'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		SettingsModule
	}
})

export default store
