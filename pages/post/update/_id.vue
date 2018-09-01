<template>
  <v-card>
    <v-card-title>
      <div class="headline mx-auto">修改文章</div>
    </v-card-title>
    <v-divider></v-divider>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex lg2>
          <v-card class="elevation-8">
            <v-card-title>
              <div class="headline mx-auto">文章信息</div>
            </v-card-title>

            <new-info :items="categories" :size="1" label="选择或新建一个分类"
                      :model="cateModel" @change="handleCateChanged"/>
            <new-info :items="tags" :size="5" label="选择或新建标签"
                      :model="tagModel" @change="handleTagChanged"/>
            <new-info :items="sections" :size="5" label="选择或新建专栏"
                      :model="secModel" @change="handleSecChanged"
                      style="position: relative"/>
            <!--<new-info/>-->
            <!--<v-spacer></v-spacer>-->
            <v-text-field
                label="图片URL"
                v-model="post.img"
                required
            ></v-text-field>
            <v-select
                :items="visibleSelects"
                v-model="post.visible"
                label="是否发布"
            ></v-select>
            <v-btn @click="insertCopyright">插入版权说明</v-btn>
          </v-card>
        </v-flex>
        <v-flex lg10>
          <v-text-field
              label="标题"
              v-model="post.title"
              required
              readonly
          ></v-text-field>

          <v-text-field
              name="input-1"
              label="文章简述"
              v-model="post.summary"
              required
          ></v-text-field>
          <v-card class="elevation-8">
            <editor
                :mdValue="post.content" @change="handleChange">
            </editor>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>


    <br/>
    <div>
      <v-btn color="info" @click="upload">更新文章</v-btn>
    </div>
    <no-ssr>
      <vm-back-top></vm-back-top>
    </no-ssr>
  </v-card>

</template>

<script>
  // import mdEditor from '../../../components/common/MdEditor'
  import NewEditor from '../../../components/common/NewEditor'
  import InfoCreate from '../../../components/common/InfoCreate'
  import postApi from '../../../api/post'

  export default {
    name: 'updatePostById',
    layout: 'simple',
    head () {
      return {
        title: '更新文章'
      }
    },
    data () {
      return {
        visibleSelects: [true, false],
        post: {},
        codeStyle: '',
        htmlValue: '',
        mdValue: '',
        tags: [],
        categories: [],
        sections: [],
        tagsParams: [],
        categoryParam: {},
        sectionsParams: [],
        postUrl: '/post/'
      }
    },
    mounted () {
      this.getPost()
      this.initInfo()
    },
    computed: {
      cateModel () {
        if (!this.post.category) {
          return []
        }
        let temp = []
        temp.push({text: this.post.category.name})
        return temp
      },
      tagModel () {
        if (!this.post.tags) {
          return []
        }
        return this.post.tags.map(t => {
          return {text: t.name}
        })
      },
      secModel () {
        if (!this.post.sections) {
          return []
        }
        return this.post.sections.map(t => {
          return {text: t.name}
        })
      }
    },
    methods: {
      insertCopyright () {
        this.post.content = this.post.content + process.env.copyrightText
      },
      getPost () {
        let $vm = this
        postApi.getPostById(this.$route.params.id)
          .then(res => {
            $vm.post = res.data.body
          })
          .catch(res => {
            this.$log.debug(res)
          })
      },
      upload () {
        this.post.contentHtml = this.htmlValue
        this.post.content = this.mdValue
        let params = {
          post: this.post,
          category: this.categoryParam,
          sections: this.sectionsParams,
          tags: this.tagsParams
        }
        postApi.updatePostById(this.$route.params.id, params)
          .then(res => {
            this.$log.debug(res.data)
            this.$notify({
              group: 'post',
              title: '文章修改成功',
              text: '查看文章详情'
            })
            this.$router.push({
              path: this.postUrl + this.post.id
            })
          })
          .catch(res => {
            console.log('文章修改失败')
            console.log(res)
          })
      },
      handleChange (val, html) {
        this.mdValue = val
        this.htmlValue = html
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
    components: {
      Editor: NewEditor,
      NewInfo: InfoCreate
    }
  }
</script>

<style scoped>

</style>