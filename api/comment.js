/**
 * Created by Staneyffer on 18-7-23.
 */

import {request} from './init'

const uploadComment = (postId, comment) => {
  return request('/comments/' + postId, comment, 'post')
}

const replyComment = (commentId, reply) => {
  return request('/comments/reply/' + commentId, reply, 'post')
}

const deleteCommentById = (id) => {
  return request('/comments/' + id, {}, 'delete')
}
export default {
  uploadComment,
  replyComment,
  deleteCommentById
}
