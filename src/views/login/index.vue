<template>
  <div class="login-container">
    <el-container>
      <el-header style="height:100px;padding: 0 100px;
  line-height: 100px;"><div style="font-size: 26px;text-align:center;color: #fda0a9;">食物营养膳食咨询平台</div></el-header>
      <el-container class="bottomBox">
        <el-aside width=50%;>
          <img style="height:300px" src="../../assets/imglogin.jpg" alt="">
        </el-aside>
        <el-main width=50%;>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="right">
            <el-form-item class="form-title">用户密码登录</el-form-item>

            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="Username"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="password" 
                class="form-input">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="Password"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>

            <el-button :loading="loading" class="login-button" @click.native.prevent="handleLogin" >Login</el-button>

          </el-form>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
     
        callback()
     
    }
    const validatePassword = (rule, value, callback) => {
      
        callback()
      
    }
    return {
      loginForm: {
        username: 'admin1',
        password: '123321'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bottomBox{
  overflow: hidden; 
  padding: 80px 100px 80px 150px; 
  position: relative;
  background-color: peachpuff;
}
.login-form{
  float: right;
  width: 360px;
  height: 300px;
  // padding: 20px 35px 0;
  margin: 0 auto;
  overflow: hidden;
  background-color: transparent !important;
  border-radius: 5px;
}
.login-button{
  background-color: transparent;
  width:95%;
  margin: 0 auto;
  border:1px solid  #fda0a9;
  border-radius: 5%;
	color: #fda0a9;
  cursor: pointer;
}
.login-form .el-input{
  width: 85%;
  height: 36px;
  display: inline-block;
  color: #ff9aa4;
}
.form-input{
  margin-left: 3%;
}
.show-pwd{
  position: relative;
  right: 27px;
  // top: 5px;
  font-size: 16px;
  color: #ff9aa4;
  cursor: pointer;
}
</style>
