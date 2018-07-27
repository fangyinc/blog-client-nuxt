<template>
  <v-card>
    <v-card-title>
      <span class="headline mx-auto">账户信息</span>
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
            label="用户名"
            v-model="user.username"
            required
        ></v-text-field>
        <v-text-field
            label="真名"
            v-model="user.name"
            required
        ></v-text-field>
        <v-text-field
            label="密码"
            v-model="user.password"
            type="password"
        ></v-text-field>
        <v-text-field
            label="个性签名"
            v-model="user.signature"
            required
        ></v-text-field>
        <v-text-field
            label="邮箱"
            v-model="user.email"
            required
        ></v-text-field>
        <v-text-field
            label="头像地址"
            v-model="user.avatarImg"
            required
        ></v-text-field>
        <v-text-field
            label="背景图地址"
            v-model="user.backgroundImg"
            required
        ></v-text-field>
        <v-text-field
            v-model="user.about"
            label="关于我"
            clearable
        ></v-text-field>
        <v-text-field
            v-model="user.address"
            label="地址"
            clearable
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <!--<v-spacer></v-spacer>-->
      <v-card-title>
        <div class="mx-auto">
          <v-btn  color="blue darken-1" flat @click.native="summit">更新</v-btn>
        </div>
      </v-card-title>
    </v-card-actions>
  </v-card>
</template>

<script>
  import authApi from '../../api/user'

  export default {
    name: 'userId',
    data () {
      return {
        valid: true,
        user: {
          username: '',
          name: '',
          signature: '',
          email: '',
          avatarImg: '',
          backgroundImg: '',
          age: '',
          about: '',
          address: '',
          password: ''
        }
      }
    },
    mounted () {
      this.getUser()
    },
    methods: {
      getUser () {
        authApi.getUser(this.$route.params.id)
          .then(res => {
            let u = res.data.body
            this.user.username = u.username || ''
            this.user.name = u.name || ''
            this.user.signature = u.signature || ''
            this.user.email = u.email || ''
            this.user.avatarImg = u.avatarImg || ''
            this.user.backgroundImg = u.backgroundImg || ''
            this.user.age = u.age || ''
            this.user.about = u.about || ''
            this.user.address = u.address || ''
          })
      },
      summit () {
        authApi.updateUserById(this.$route.params.id, this.user)
          .then(res => {
            this.$notify({
              group: 'user',
              title: '用户修改成功'
            })
            this.getUser()
          })
          .catch(err => {
            console.debug(err)
            this.$notify({
              group: 'user',
              title: '修改失败'
            })
          })
      }
    }
  }
</script>

<style scoped>

</style>