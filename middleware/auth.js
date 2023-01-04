export default function ({ app, store, redirect }) {
  const cookieValue = app.$cookiz.get('jwt')
  if (cookieValue !== undefined) {
    store.dispatch('login', cookieValue)
  } else {
    store.dispatch('logout')
  }
  if (!store.getters.hasToken) {
    redirect('/')
  }
}
