/**
 * Created by Staneyffer on 18-7-24.
 */

import authApi from '../api/user'
import {setAuthToken, resetAuthToken} from '../utils/auth'
import cookies from 'js-cookie'

export const FETCH_USER = 'FETCH_USER'
export const SET_TOKEN = 'SET_TOKEN'

const SET_USER = 'SET_USER'

export const state = () => ({
  authUser: {
    backgroundImg: null,
    avatarImg: null,
    username: null,
    signature: null
  },
  token: null,
  isLogin: false
})

export const getters = {
  user: (state) => {
    return state.authUser
  }
}
export const mutations = {
  [SET_USER] (state, user) {
    state.authUser = user
  },
  [SET_TOKEN] (state, payload) {
    state.token = payload.token
    state.isLogin = payload.isLogin
  }
}

export const actions = {
  login ({commit}, params) {
    return authApi.userLogin(params)
      .then(res => {
        commit(SET_USER, res.data.user)
        commit(SET_TOKEN, {token: res.data.token, isLogin: true})
        setAuthToken(res.data.token)
        cookies.set('access-token', res.data.token, {expires: 2}) // expires: 2days
        cookies.set('user-id', res.data.user.id, {expires: 2}) // expires: 2days
        return res
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  logout ({commit}) {
    commit(SET_USER, {})
    commit(SET_TOKEN, {token: null, isLogin: false})
    resetAuthToken()
    cookies.remove('access-token')
    cookies.remove('user-id')
    return Promise.resolve('注销成功')
  },
  async [FETCH_USER] ({commit}, userId) {
    let data = await authApi.getUser(userId || process.env.defaultUserId)
      .then(res => {
        return res.data.body
      })
      .catch(err => { console.log(err) })
    commit(SET_USER, data)
  }
}
