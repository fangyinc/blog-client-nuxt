/**
 *  Create by staneyffer
 *  18-3-15
 */

import {request} from './init'

const newPost = params => {
  return request('/posts', params, 'post')
}

const allPost = (page = 1) => {
  // 服务端分页是从0开始， 前端分页是从1开始，故需要减1
  return request('/posts?page=' + (page - 1))
}

const getPostById = (id) => {
  return request('/posts/' + id)
}
const deletePostById = (id) => {
  return request('/posts/' + id, {}, 'delete')
}

const updatePostById = (id, params) => {
  return request('/posts/' + id, params, 'put')
}

const getAllTag = () => {
  return request('/tags')
}
const deleteTagById = (id) => {
  return request('/tags/' + id, {}, 'delete')
}
const getTagById = (id) => {
  return request('/tags/' + id)
}
const getALlCate = () => {
  return request('/cates')
}
const getCateById = (id) => {
  return request('/cates/' + id)
}
const deleteCateById = (id) => {
  return request('/cates/' + id, {}, 'delete')
}
const getAllSection = () => {
  return request('/sections')
}
const deleteSectionById = (id) => {
  return request('/sections/' + id, {}, 'delete')
}
const getSectionById = (id) => {
  return request('/sections/' + id)
}
const getPostByCateId = (id, page = 1) => {
  return request('/cates/posts/' + id + '?page=' + (page - 1))
}

const getPostByTagId = (id, page = 1) => {
  return request('/tags/posts/' + id + '?page=' + (page - 1))
}

const getPostBySecId = (id, page = 1) => {
  return request('/sections/posts/' + id + '?page=' + (page - 1))
}

const queryPostByContent = (qStr) => {
  return request('/posts/query/' + qStr)
}
const archive = () => {
  return request('/posts/archive')
}
const getPostByTime = (date) => {
  return request('/posts/archive/query', date)
}
const getSignature = () => {
  return request('/oss/sig')
}

export default {
  newPost,
  allPost,
  getPostById,
  getAllTag,
  getALlCate,
  getAllSection,
  updatePostById,
  getPostByCateId,
  getPostByTagId,
  getPostBySecId,
  queryPostByContent,
  archive,
  getPostByTime,
  getSignature,
  deletePostById,
  deleteCateById,
  deleteTagById,
  deleteSectionById,
  getTagById,
  getCateById,
  getSectionById
}
