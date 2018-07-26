/**
 * Created by Staneyffer on 18-7-24.
 */

import postApi from '../api/post'

export const GET_POST_LIST = 'GET_POST_LIST'
export const SET_POST_LIST = 'SET_POST_LIST'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'

export const state = () => ({
  list: [],
  pagination: {
    currentPage: 1,
    totalPages: 0
  }
})
export const mutations = {
  SET_LIST (state, dataList) {
    state.list = dataList
  },
  SET_PAGE (state, currentPage) {
    state.pagination.currentPage = currentPage
  }
}

export const actions = {
  /**
   * 请求分页文章
   * @param commit
   * @param state
   * @param page 前端页面标号以1开始, 如果为 page 则说明希望使用 state.pagination.currentPage
   * @returns {Promise<void>}
   */
  async [GET_POST_LIST] ({commit, state}, page = 0) {
    if (page === 0) {
      page = state.pagination.currentPage
    }
    let data = await postApi.allPost(page)
      .then(res => {
        return res.data.body
      })
      .catch(err => {
        console.log(err)
      })
    commit('SET_LIST', data || [])
    return data // add
  },
  [SET_POST_LIST] ({commit}, data) {
    commit('SET_LIST', data || [])
  },
  [SET_CURRENT_PAGE] ({commit}, currentPage) {
    commit('SET_PAGE', currentPage)
  }
}
