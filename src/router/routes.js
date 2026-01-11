const routes = [
  {
    path: '/',
    component: () => import('layouts/default.vue'),
    children: [{ path: '', component: () => import('pages/posts.vue') }],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/layouts/not-found-404.vue'),
  },
]

export default routes
