import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Vuetify from 'vuetify'
import './registerServiceWorker'

// PLUGINS
import VueI18n from 'vue-i18n'
import Locales from './plugins/locale'
import Alerts from './plugins/core/alert'
import Validator from './plugins/core/validator'
import Utilities from './plugins/core/utils'
import EventBus from './plugins/core/eventbus'

// CSS
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.min.css'
import 'typeface-roboto'

Vue.config.productionTip = false

// LOCALE
Vue.use(VueI18n)
const i18n = new VueI18n({
	locale: 'en',
	fallbackLocale: 'en',
	messages: Locales
})

// VUETIFY
Vue.use(Vuetify)
const VuetifyOptions = {
	theme: {
		dark: false,
		themes: {
			light: {
				primary: '#282A2E',
				secondary: '#181A1C',
				success: '#5E945A'
			},
			dark: {
				primary: '#282A2E',
				secondary: '#181A1C',
				success: '#5E945A'
			}
		}
	},
	lang: {
		t: (key, ...params) => i18n.t(key, params)
	},
	icons: {
		iconfont: 'mdi'
	}
}

// VALIDATOR AND UTILITIES
Vue.use(Validator, i18n)
Vue.use(Utilities, i18n)

// EVENTBUS
Vue.use(EventBus)

// ALERTS
Vue.use(Alerts)

new Vue({
	vuetify: new Vuetify(VuetifyOptions),
	router,
	store,
	i18n,
	render: h => h(App)
}).$mount('#app')
