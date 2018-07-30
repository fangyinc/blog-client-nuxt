<template>
  <v-card>
    <v-card-title>
      <div class="headline mx-auto">新建文章</div>
    </v-card-title>
    <v-divider></v-divider>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex lg2>
          <v-card class="elevation-8">
            <v-card-title>
              <div class="headline mx-auto">文章信息</div>
            </v-card-title>

            <new-info :items="categories" :size="1" label="选择或新建一个分类" @change="handleCateChanged"/>
            <new-info :items="tags" :size="5" label="选择或新建标签" @change="handleTagChanged"/>
            <new-info :items="sections" :size="5" label="选择或新建专栏" @change="handleSecChanged"
                      style="position: relative"/>
            <!--<new-info/>-->
            <!--<v-spacer></v-spacer>-->
            <v-text-field
                label="图片URL"
                v-model="post.img"
                required
            ></v-text-field>
          </v-card>
        </v-flex>
        <v-flex lg10>
          <v-text-field
              label="标题"
              v-model="post.title"
              required
          ></v-text-field>

          <v-text-field
              name="input-1"
              label="文章简述"
              v-model="post.summary"
              required
          ></v-text-field>
          <v-card class="elevation-8">
            <!--<mavon-editor v-model="mdValue" code-style="monokai" ref="mavon"></mavon-editor>-->
            <editor @change="handleChange">
            </editor>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <br/>
    <div>
      <!--<div ref="editor" style="text-align:le ft"></div>-->
      <!--<button v-on:click="upload">上传</button>-->
      <v-btn color="info" @click="upload">上传文章</v-btn>

    </div>
  </v-card>

</template>

<script>
  import mdEditor from '../../components/common/MdEditor'
  import InfoCreate from '../../components/common/InfoCreate'
  import postApi from '../../api/post'

  export default {
    name: 'createPost',
    layout: 'simple',
    head () {
      return {
        title: '新建文章'
      }
    },
    data () {
      return {
        // mdValue: '',
        // htmlValue: '',
        post: {
          title: '',
          content: '',
          contentHtml: '',
          summary: '',
          img: ''
        },
        tags: [],
        categories: [],
        sections: [],
        tagsParams: [],
        categoryParam: {},
        sectionsParams: [],
        htmlData: null,
        postUrl: '/post/'
      }
    },
    methods: {
      handleChange (val, html) {
        this.post.content = val
        this.post.contentHtml = html
      },
      upload () {
        let params = {
          post: this.post,
          category: this.categoryParam,
          sections: this.sectionsParams,
          tags: this.tagsParams
        }
        postApi.newPost(params)
          .then(res => {
            this.$log.debug('新建文章成功')
            this.$log.debug(res)
            this.$notify({
              group: 'post',
              title: '文章新建成功',
              text: '查看文章详情'
            })
            this.$router.push({
              path: this.postUrl + res.data.body.id
            })
          })
          .catch(res => {
            this.$log.debug('新建文章失败')
            this.$log.debug(res)
          })
      },
      handleTagChanged (data) {
        this.tagsParams = data
      },
      handleCateChanged (data) {
        this.$log.debug(data)
        if (data.length > 0) {
          this.categoryParam = data[0]
        }
      },
      handleSecChanged (data) {
        this.sectionsParams = data
      },
      initInfo () {
        postApi.getAllTag()
          .then(res => {
            this.tags = this.getData(res.data.body)
            this.$log.debug('Got all tags successfully')
          })
          .catch(res => {
            this.$log.debug(res)
          })
        postApi.getALlCate()
          .then(res => {
            this.categories = this.getData(res.data.body)
            this.$log.debug('Get all categories successfully')
          })
          .catch(res => {
            this.$log.debug(res)
          })
        postApi.getAllSection()
          .then(res => {
            this.sections = this.getData(res.data.body)
            this.$log.debug('Got all sections successfully')
          })
          .catch(res => {
            this.$log.debug(res)
          })
      },
      getData (data) {
        let items = []
        items.push({header: 'Select an option or create one'})
        data.forEach((val) => {
          items.push({text: val.info.name})
        })
        return items
      }
    },
    mounted () {
      this.initInfo()
    },
    components: {
      NewInfo: InfoCreate,
      Editor: mdEditor
    }
  }
</script>

<style scoped>

</style>