<template>
	<v-app>
		<v-app-bar app clipped-left :color="$vuetify.theme.dark ? '#303030' : 'grey lighten-5'">
			<v-app-bar-nav-icon @click.stop="setMenu()" class="grey--text text--darken-2"></v-app-bar-nav-icon>
			<span class="ml-2 mt-1 primary--text truco-font" style="font-size: 36px;">{{ $t('app.title') }}</span>
			<v-spacer></v-spacer>

			<v-btn icon color="primary" v-if="$route.path === '/play'">
				<v-icon @click="$alert('RESET_SCORE')">mdi-history</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer app v-model="menu" :mini-variant="mini" clipped width="220" dark :src="bgPhoto">
			<template v-slot:img="{ src, height }">
				<v-img v-bind="{ src, height }" :gradient="themeGradient"></v-img>
			</template>
			<v-list shaped class="py-0">
				<v-list-item-group v-model="menuSelected">
					<template v-for="(item, id) in menuItems">
						<v-divider v-if="item.divider" :key="'div_' + id"></v-divider>
						<v-list-item active-class="" @click="item.path ? changePath(item.path) : item.action ? processAction(item.action) : ''" :key="id">
							<v-list-item-action><v-icon>{{ item.icon }}</v-icon></v-list-item-action>
							<v-list-item-content>{{ item.doNotTranslate ? item.title : $t(item.title) }}</v-list-item-content>
						</v-list-item>
					</template>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>

		<v-content>
			<v-slide-y-transition mode="out-in">
				<router-view></router-view>
			</v-slide-y-transition>
		</v-content>

		<truco-alert></truco-alert>
	</v-app>
</template>

<script>
import backgroundPicture from '../assets/img/dt_bg.jpg'
import TrucoAlert from '../components/core/alert/Alert'

export default {
	components: {
		'truco-alert': TrucoAlert
	},
	data() {
		return {
			menuSelected: 0,
			active: 1,
			bgPhoto: backgroundPicture,
			menu: null,
			mini: false,
			menuItem: 0,
			menuItems: [
				{
					title: 'menu.play',
					path: '/play',
					icon: 'mdi-play'
				},
				{
					title: 'menu.matchs',
					path: '/matchs',
					icon: 'mdi-cards-playing-outline'
				},
				{
					title: 'menu.ranking',
					path: '/ranking',
					icon: 'mdi-account-group'
				},
				{
					title: 'menu.settings',
					path: '/settings',
					icon: 'mdi-settings'
				},
				{
					title: 'menu.about',
					path: '/about',
					icon: 'mdi-information'
				}
			]
		}
	},
	mounted() {
		this.processMenuSelected()
	},
	computed: {
		themeGradient() {
			return this.$store.getters.themeGradient
		}
	},
	methods: {
		setMenu() {
			if (this.$vuetify.breakpoint.lgAndUp) {
				this.mini = !this.mini
			}
			else {
				this.mini = false
				this.menu = !this.menu
			}
		},
		processAction(action) {
		},
		changePath(path) {
			if (this.$route.path !== path) {
				this.$router.push(path)
			}
		},
		processMenuSelected() {
			this.menuItems.forEach((item, index) => {
				if (this.$route.path === item.path) {
					this.menuSelected = index
				}
			})
		}
	},
	watch: {
		'$route.path'() {
			this.processMenuSelected()
		}
	}
}
</script>

<style scoped>
.grad {
	background-image: linear-gradient(#AD4242, #D45050);
}
.grad-img {
	background: rgb(149,84,232);
	background: linear-gradient(90deg, rgba(149,84,232,1) 0%, rgba(119,67,210,0.8) 100%);
}
</style>
