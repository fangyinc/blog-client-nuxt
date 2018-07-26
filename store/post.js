/**
 * Created by Staneyffer on 18-7-24.
 */

import postApi from '../api/post'

export const GET_POST_LIST = 'GET_POST_LIST'
export const SET_POST_LIST = 'SET_POST_LIST'

export const state = () => ({
  list: []
})
export const mutations = {
  SET_LIST (state, dataList) {
    state.list = dataList
  }
}

export const actions = {
  async [GET_POST_LIST] ({ commit }, page = 1) {
    let data = await postApi.allPost(page)
      .then(res => {
        return res.data.body
      })
      .catch(err => {
        console.log(err)
      })
    commit('SET_LIST', data || [])
  },
  [SET_POST_LIST] ({commit}, data) {
    commit('SET_LIST', data || [])
  }
}
