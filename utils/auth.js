/**
 * Created by Staneyffer on 18-7-24.
 */

import axios from 'axios'

export function setAuthToken (token) {
  let jwtHeader = 'Bearer '
  // console.log('setAuthToken: ' + jwtHeader + token)
  axios.defaults.headers.common['Authorization'] = jwtHeader + token
}
export function resetAuthToken () {
  delete axios.defaults.headers.common['Authorization']
}
