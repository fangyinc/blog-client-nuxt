/**
 * Created by Staneyffer on 18-7-25.
 */

import postApi from '../api/post'

export const GET_TAG_LIST = 'GET_TAG_LIST'

export const state = () => ({
  list: []
})

export const mutations = {
  SET_LIST (state, dataList) {
    state.list = dataList
  }
}

export const actions = {
  async [GET_TAG_LIST] ({ commit }) {
    let data = await postApi.getAllTag()
      .then(res => {
        return res.data.body
      })
      .catch(err => {
        console.log(err)
      })
    commit('SET_LIST', data || [])
  }
}
