<template>
	<v-app>
		<v-app-bar app clipped-left :color="$vuetify.theme.dark ? '#303030' : 'grey lighten-5'">
			<v-app-bar-nav-icon @click.stop="setMenu()" class="grey--text text--darken-2"></v-app-bar-nav-icon>
			<span class="ml-2 mt-1 primary--text dt-font" style="font-size: 36px;">{{ $t('app.title') }}</span>
		</v-app-bar>

		<v-navigation-drawer v-model="menu" :mini-variant="mini" app clipped width="220" dark :src="bgPhoto">
			<template v-slot:img="{ src, height }">
				<v-img v-bind="{ src, height }" :gradient="theme"></v-img>
				<!--
					gradient="to top bottom, rgba(149, 84, 232, 1), rgba(119, 67, 210, 1)"
					background: linear-gradient(90deg, rgba(149,84,232,1) 0%, rgba(119,67,210,0.8) 100%);
				-->
			</template>
			
			<v-card flat class="pb-4 transparent" style="cursor: pointer;" @click="$router.push('/profile')">
				<v-layout row wrap align-center justify-center>
					<v-flex xs12 text-center>
						<v-avatar :size="mini ? '52' : '64'" class="mt-4">
							<img :src="user && user.image ? user.image : noPhoto" style="cursor: pointer;">
						</v-avatar>
					</v-flex>

					<v-flex v-if="user && user.email && !mini" xs12 sm12 class="mt-4 text-center">
						<div class="subheading">{{ user.name }}</div>
						<div class="caption grey--text text--lighten-1 mt-n2">{{ user.email }}</div>
					</v-flex>
				</v-layout>
			</v-card>

			<v-divider></v-divider>

			<v-list shaped class="py-0">
				<template v-for="(item, id) in menuItems">
					<v-divider v-if="item.divider" :key="'div_' + id"></v-divider>
					<v-list-item @click="item.path ? $router.push(item.path) : item.action ? processAction(item.action) : ''" :key="id">
						<v-list-item-action><v-icon>{{ item.icon }}</v-icon></v-list-item-action>
						<v-list-item-content>{{ item.doNotTranslate ? item.title : $t(item.title) }}</v-list-item-content>
					</v-list-item>
				</template>
			</v-list>
		</v-navigation-drawer>

		<v-content>
			<v-container fluid class="py-0">
				<v-slide-y-transition mode="out-in">
					<router-view></router-view>
				</v-slide-y-transition>
			</v-container>
		</v-content>

		<dt-alert :message="alertMessage"></dt-alert>
	</v-app>
</template>

<script>
import defaultPicture from '../assets/img/nopicture.jpg'
import backgroundPicture from '../assets/img/dt_bg.jpg'
import Alert from '../components/core/Alert'

export default {
	components: {
		'dt-alert': Alert
	},
	data() {
		return {
			noPhoto: defaultPicture,
			bgPhoto: backgroundPicture,
			menu: null,
			mini: false,
			alertMessage: '',
			menuItem: 0,
			menuItems: [
				{
					title: 'menu.people',
					path: '/people',
					icon: 'mdi-account-group'
				},
				/*{
					title: 'menu.calendar',
					path: '/calendar',
					icon: 'mdi-calendar'
				},
				{
					title: 'menu.dates',
					path: '/dates',
					icon: 'mdi-account-heart'
				},
				{
					title: 'common.emoji',
					path: '/emojis',
					icon: 'mdi-emoticon'
				},*/
				{
					title: 'common.categories',
					path: '/categories',
					icon: 'mdi-tag-multiple'
				},
				{
					title: 'common.locals',
					path: '/locals',
					icon: 'mdi-map-marker'
				},
				{
					title: 'menu.settings',
					path: '/profile',
					icon: 'mdi-settings'
				},
				{
					title: 'menu.about',
					path: '/about',
					icon: 'mdi-information'
				},
				/*{
					title: 'menu.colors',
					path: '/colors',
					icon: 'mdi-palette'
				},
				{
					title: '404',
					path: '/404',
					icon: 'mdi-alert-outline',
					doNotTranslate: true
				},*/
				{
					divider: true,
					title: 'menu.exit',
					path: null,
					action: 'doLogout',
					icon: 'mdi-logout'
				}
			]
		}
	},
	mounted() {
	},
	computed: {
		user() {
			return this.$store.getters.user
		},
		alert() {
			return this.$store.getters.alert
		},
		theme() {
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
			if (action === 'doLogout') {
				this.$store.dispatch('setAlert', 'CONFIRM_LOGOUT')
			}
		}
	},
	watch: {
		'$store.getters.alert'() {
			this.alertMessage = this.$store.getters.alert
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
