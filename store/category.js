/**
 * Created by Staneyffer on 18-7-25.
 */

import postApi from '../api/post'

export const GET_CATE_LIST = 'GET_CATE_LIST'
export const GET_CATE_ID_POST = 'GET_CATE_ID_POST'
export const GET_CATE_BY_ID = 'GET_CATE_BY_ID'

export const state = () => ({
  list: [],
  postList: {
    list: [], // 文章列表
    totalPages: 0,
    totalElements: 0
  },
  info: {}
})

export const mutations = {
  SET_LIST (state, dataList) {
    state.list = dataList
  },
  SET_POST_LIST (state, postList) {
    state.postList = postList
  },
  SET_INFO (state, info) {
    state.info = info
  }
}

export const actions = {
  async [GET_CATE_LIST] ({ commit }) {
    let data = await postApi.getALlCate()
      .then(res => {
        return res.data.body
      })
      .catch(err => {
        console.log(err)
      })
    commit('SET_LIST', data || [])
  },
  async [GET_CATE_ID_POST] ({commit}, {id, page}) {
    let data = await postApi.getPostByCateId(id, page)
      .then(res => { return res.data.body })
      .catch(err => {
        console.log(err)
      })
    if (data) {
      commit('SET_POST_LIST', {
        list: data.content || [],
        totalPages: data.totalPages || 0,
        totalElements: data.totalElements || 0
      })
    }
    return data
  },
  async [GET_CATE_BY_ID] ({commit}, id) {
    let data = await postApi.getCateById(id)
      .then(res => { return res.data.body })
      .catch(res => console.log(res))
    commit('SET_INFO', data || {})
    return data
  }
}
