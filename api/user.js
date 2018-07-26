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

export default {
  userRegister,
  userLogin,
  getUser,
  getAllFriend,
  newFriend
}
