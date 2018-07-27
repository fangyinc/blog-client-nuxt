/**
 * Created by Staneyffer on 18-7-24.
 */

var requiresAuthPath = [
  '/new-post',
  '/post/update',
  '/post/create',
  '/friend/create',
  '/friend/update'
]

function needAuth (fullPath) {
  let items = requiresAuthPath.filter(p => {
    const regex = new RegExp('^' + p)
    if (regex.test(fullPath)) {
      return p
    }
  })
  return items.length > 0
}

export default function ({store, redirect, route}) {
  const userIsLoggedIn = !!store.state.user.isLogin
  const urlRequiresAuth = needAuth(route.fullPath)
  const urlRequiresNonAuth = /^\/login(\/|$)/.test(route.fullPath)
  if (userIsLoggedIn && route.path === '/logout') {
    store.dispatch('user/logout')
    return redirect('/')
  }
  if (!userIsLoggedIn && urlRequiresAuth) {
    // 需要登录且没登录重定向至登录页面
    return redirect('/login')
  }
  if (userIsLoggedIn && urlRequiresNonAuth) {
    // 已经登录但仍然访问登录页面的重定向到 '/'
    return redirect('/')
  }
  // rejected or resolve
  return Promise.resolve()
}
