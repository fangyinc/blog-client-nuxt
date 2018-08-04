## 简介
这是一个基于[Vue.js](https://vuejs.org/)和[Nuxt](https://nuxtjs.org/)，采用[Vuetify](https://vuetifyjs.com)作为UI库，具有文章在线新建、更新、删除等功能的博客前端。
在线预览: [我的的博客](https://chengfy.com)

## 主要功能
- 用户管理： 用户的注册、登录以及个人信息的编辑
- 基于Nuxt和cookie，实现与后台提供的JWT认证对接并保存用户登录状态
- 文章管理： 文章的增删改查
- markdown编辑器： 默认支持emoji、highlight、katex等大部分常用的markdown扩展包，还结合阿里云的OSS实现图片上传
- 分类、标签、专栏的增删查改
- 随时可将文章加入、移出草稿箱（草稿箱的文章仅管理员及作者可见）
- 友链的增删查改
- 良好的移动端自适应
- 文章归档信息
- 根据关键字搜索文章
- 集成[来必力](http://www.laibili.com.cn/) 评论系统
- 集成[谷歌分析](https://marketingplatform.google.com/about/)

## 依赖
- Node >= 6.0
- Vue.js >= 2.5

## 快速开始
1. **安装**  
```shell
$ git clone git@github.com:staneyffer/blog-client-nuxt.git
$ cd blog-client-nuxt
$ npm install
```
2. **修改部分配置文件**  
[axios](https://github.com/axios/axios)的主要配置文件在 ```api/init.js```下，根据实际情况修改对应的后端接口的地址。

3. **启动项目**  
```shell
$ npm run dev
``` 
## 截图
大部分页面均可以在 [我的博客](https://chengfy.com)中看到，这里截一部分管理员的页面。
1. 文章新建  
![new post page](https://my-blog-images.oss-cn-qingdao.aliyuncs.com/15334009565057479.png)

2. 文章修改  
![update post page](https://my-blog-images.oss-cn-qingdao.aliyuncs.com/15334011133841108.png)

3. 添加友链  
![add friend link](https://my-blog-images.oss-cn-qingdao.aliyuncs.com/15334011918762759.png)

4. 个人信息的修改  
![深度截图_选择区域_20180805005925.png](https://my-blog-images.oss-cn-qingdao.aliyuncs.com/15334019965515967.png)

5. 草稿箱  
![draft page](https://my-blog-images.oss-cn-qingdao.aliyuncs.com/15334013214517655.png)

6. 移动端首页  
![移动端首页](https://my-blog-images.oss-cn-qingdao.aliyuncs.com/15334017369086047.png)

7. 移动端侧栏  
![移动端侧栏](https://my-blog-images.oss-cn-qingdao.aliyuncs.com/15334017769925693.png)

8. 移动端文章浏览  
![移动端文章浏览](https://my-blog-images.oss-cn-qingdao.aliyuncs.com/15334018082389555.png)