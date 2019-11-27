import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
	scrollBehavior: () => ({ y: 0 }),
	mode: 'history',
	routes: [
		{
			path: '/main',
			name: 'Main',
			component: () => import('./views/Main.vue'),
			children: [
				/*
				{
					path: '/profile',
					name: 'Profile',
					meta: {
						title: 'Profile'
					},
					component: () => import('./views/navigation/user/Profile.vue'),
					beforeEnter: (to, from, next) => {
						authorize(to.path, next)
					}
				}
				*/
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
