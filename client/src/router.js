import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import api from './plugins/core/api'

Vue.use(Router)

function authorize(path, next) {
	let token = localStorage.getItem('token') || sessionStorage.getItem('token')

	if (token) {
		api.post('http://localhost:1131/users/auth', { token }).then(result => {
			if (result && result.id) {
				store.dispatch('setUser', result)
				next()
			}
			else {
				localStorage.removeItem('token')
				sessionStorage.removeItem('token')
				next('/')
			}
		}).catch(() => {
			localStorage.removeItem('token')
			sessionStorage.removeItem('token')
			next('/')
		})
	}
	else {
		next('/')
	}
}

const router = new Router({
	scrollBehavior: () => ({ y: 0 }),
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Login',
			meta: {
				title: 'Login'
			},
			component: () => import('./views/Login.vue'),
			beforeEnter: (to, from, next) => {
				let token = localStorage.getItem('token') || sessionStorage.getItem('token')

				if (token) {
					api.post('http://localhost:1131/users/auth', { token }).then(() => {
						next('/people')
					}).catch(() => {
						localStorage.removeItem('token')
						sessionStorage.removeItem('token')
						next()
					})
				}
				else {
					next()
				}
			}
		},
		{
			path: '/main',
			name: 'Main',
			redirect: '/people',
			component: () => import('./views/Main.vue'),
			children: [
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
				},
				{
					path: '/about',
					name: 'About',
					meta: {
						title: 'About'
					},
					component: () => import('./views/navigation/About.vue'),
					beforeEnter: (to, from, next) => {
						authorize(to.path, next)
					}
				},
				{
					path: '/colors',
					name: 'Colors',
					meta: {
						title: 'Colors'
					},
					component: () => import('./views/navigation/Colors.vue'),
					beforeEnter: (to, from, next) => {
						authorize(to.path, next)
					}
				},
				{
					path: '/dates/:person',
					name: 'Dates',
					meta: {
						title: 'Dates'
					},
					props: true,
					component: () => import('./views/navigation/user/Dates.vue'),
					beforeEnter: (to, from, next) => {
						authorize(to.path, next)
					}
				},
				{
					path: '/people',
					name: 'People',
					meta: {
						title: 'People'
					},
					component: () => import('./views/navigation/user/People.vue'),
					beforeEnter: (to, from, next) => {
						authorize(to.path, next)
					}
				},
				{
					path: '/people/:person',
					name: 'Person',
					meta: {
						title: 'Person'
					},
					props: true,
					component: () => import('./views/navigation/user/Persons.vue'),
					beforeEnter: (to, from, next) => {
						authorize(to.path, next)
					}
				},
				{
					path: '/calendar',
					name: 'Calendar',
					meta: {
						title: 'Calendar'
					},
					component: () => import('./views/navigation/user/Calendar.vue'),
					beforeEnter: (to, from, next) => {
						authorize(to.path, next)
					}
				},
				{
					path: '/emojis',
					name: 'Emojis',
					meta: {
						title: 'Emojis'
					},
					component: () => import('./components/pickers/Emoji.vue'),
					beforeEnter: (to, from, next) => {
						authorize(to.path, next)
					}
				},
				{
					path: '/categories',
					name: 'Categories',
					meta: {
						title: 'Categories'
					},
					component: () => import('./views/navigation/user/Categories.vue'),
					beforeEnter: (to, from, next) => {
						authorize(to.path, next)
					}
				},
				{
					path: '/locals',
					name: 'Locals',
					meta: {
						title: 'Locals'
					},
					component: () => import('./views/navigation/user/Locals.vue'),
					beforeEnter: (to, from, next) => {
						authorize(to.path, next)
					}
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
