/**
 * Created by Staneyffer on 18-7-27.
 */

export default function ({redirect, route, query}) {
  const isPagination = /^\/pagination(\/|$)/.test(route.fullPath)
  console.log('进入pagination中间件')
  if (process.server) {
    console.log('这是服务端中间件')
  } else {
    console.log('这是客户端中间件')
  }
  if (!isPagination) {
    console.log('不使用中间件')
    // 不是使用分页
    return Promise.resolve()
  }
  console.log('使用中间件, 先打印query')
  console.log(route.fullPath)

  if (query.to) {
    console.log('使用middleware: query is : ')
    console.log(query)
    return redirect(query.to + '?page=' + query.page)
  }
  return Promise.resolve()
}
