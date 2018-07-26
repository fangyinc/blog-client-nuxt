import cookie from 'cookie'
import {setAuthToken, resetAuthToken} from '../utils/auth'

import {GET_CATE_LIST} from './category'
import {GET_TAG_LIST} from './tag'
import {GET_SEC_LIST} from './section'
// import {GET_POST_LIST} from './post'
import {FETCH_USER, SET_TOKEN} from './user'

export const state = () => ({
  sidebar: false
})

export const actions = {
  /**
   * 仅仅是在服务器端被调用
   * @param store
   * @param context
   */
  nuxtServerInit (store, context) {
    // return new Promise((resolve, reject) => {
    //   const cookies = cookie.parse(context.req.headers.cookie || '')
    //   if (cookies.hasOwnProperty('access-token')) {
    //     console.log('收到客户端的cookies')
    //     console.log(cookies['access-token'])
    //     setAuthToken(cookies['Authorization'])
    //     resolve(true)
    //   } else {
    //     resetAuthToken()
    //     resolve(false)
    //   }
    // })
    const cookies = cookie.parse(context.req.headers.cookie || '')
    let userId = null
    if (cookies.hasOwnProperty('access-token')) {
      // console.log('收到客户端的cookies')
      // console.log(cookies['access-token'])
      setAuthToken(cookies['access-token'])
      userId = cookies['user-id']
      store.commit('user/' + SET_TOKEN, {token: cookies['access-token'], isLogin: true})
    } else {
      resetAuthToken()
    }
    const initAppData = [
      store.dispatch('category/' + GET_CATE_LIST),
      store.dispatch('tag/' + GET_TAG_LIST),
      store.dispatch('section/' + GET_SEC_LIST),
      // store.dispatch('post/' + GET_POST_LIST),
      store.dispatch('user/' + FETCH_USER, userId)
    ]
    return Promise.all(initAppData)
  }
}

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  }
}
