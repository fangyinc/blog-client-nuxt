/**
 *  Create by staneyffer
 *  18-2-22
 */

import {request} from './init'

const userLogin = params => {
  return request('/login', params, 'post')
}

const userRegister = params => {
  return request('/users', params, 'post')
}
const getUser = (id) => {
  return request('/users/' + id)
}

const getAllFriend = (page = 1) => {
  return request('/friend?page=' + (page - 1))
}

const newFriend = (params) => {
  return request('/friend', params, 'post')
}

const getFriendById = (id) => {
  return request('/friend/' + id)
}
const updateFriendById = (id, params) => {
  return request('/friend/' + id, params, 'put')
}

const deleteFriendById = (id) => {
  return request('/friend/' + id, {}, 'delete')
}
export default {
  userRegister,
  userLogin,
  getUser,
  getAllFriend,
  newFriend,
  updateFriendById,
  getFriendById,
  deleteFriendById
}
