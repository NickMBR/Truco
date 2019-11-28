import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
	scrollBehavior: () => ({ y: 0 }),
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Main',
			redirect: '/home',
			component: () => import('./views/Main.vue'),
			children: [
				{
					path: '/home',
					name: 'Home',
					meta: {
						title: 'Home'
					},
					component: () => import('./views/navigation/Home.vue')
				},
				{
					path: '/settings',
					name: 'Settings',
					meta: {
						title: 'Settings'
					},
					component: () => import('./views/navigation/Settings.vue')
				},
				{
					path: '/about',
					name: 'About',
					meta: {
						title: 'About'
					},
					component: () => import('./views/navigation/About.vue')
				},
				{
					path: '/matchs',
					name: 'Matchs',
					meta: {
						title: 'Matchs'
					},
					component: () => import('./views/navigation/Matchs.vue')
				}
			]
		},
		{
			path: '*',
			name: '404',
			meta: {
				title: '404'
			},
			component: () => import('./views/errors/404.vue')
		}
	]
})

export default router
