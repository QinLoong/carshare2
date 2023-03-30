<template>
    <view class="login-wrap">
      <view class="top-status-bar" />
      <view class="login-logo">
        <image mode="" src="~@/static/images/logo.svg" />
      </view>
      <view class="login-title">账号密码登录</view>
      <view class="login-form">
        <u--form ref="loginForm" error-type="toast" label-position="left" :model="loginInfo" :rules="rules">
          <view :class="{ 'form-item': true }">
            <u-form-item prop="userPhone">
              <u-input v-model="loginInfo.userPhone" placeholder="账号" @blur="blurHandle('userPhone')" @focus="focusHandle('userPhone')">
                <template slot="prefix">
                  <text class="iconfont icon-account prefix-icon" />
                </template>
              </u-input>
            </u-form-item>
          </view>
  
          <view :class="{ 'form-item': true }">
            <u-form-item prop="password">
              <u-input v-model="loginInfo.password" placeholder="密码" :type="pwdShow ? 'text' : 'password'" @blur="blurHandle('password')" @focus="focusHandle('password')">
                <template slot="prefix">
                  <text class="iconfont icon-password prefix-icon" />
                </template>
                <template slot="suffix">
                  <text class="iconfont prefix-icon" :class="pwdShow ? 'icon-pwdyc' : 'icon-pwdxs'" @click="pwdShow = !pwdShow" />
                </template>
              </u-input>
            </u-form-item>
          </view>
  
          <view class="form-item">
            <view class="toggle-login flex-c" @click="isLogin = !isLogin"> {{ !isLogin ?  '登录' : '注册'}}</view>
            <u-form-item>
              <u-button shape="circle" :text="isLogin ? '登录' : '注册'" type="primary" @click="submit" />
            </u-form-item>
          </view>
        </u--form>
      </view>
    </view>
  </template>
  
  <script>
  export default {
    data() {
      return {
        loginInfo: {
          userPhone: '',
          password: ''
        },
        rules: {
          userPhone: [
            {
              required: true,
              message: '请输入账号'
            }
          ],
          password: [
            {
              required: true,
              message: '请输入密码'
            }
          ]
        },
        codeFocus: false,
        passwordFocus: false,
        pwdShow: false,
        isLogin: true
      }
    },
    onReady() {
        // 表单验证
      this.$refs.loginForm.setRules(this.rules)
    },
    watch: {
      isLogin() {
        Object.assign(this.loginInfo, this.$options.data.call(this).loginInfo)
      }
    },
    mounted(){
       // this.submit()
    },
    methods: {
      submit() {
        this.$refs.loginForm
          .validate()
          .then(async res => {
            const msg = this.isLogin ? '登录': '注册'
            try {
              const res = await this.$store.dispatch('login', {...this.loginInfo, isLogin: this.isLogin} )
              if (res) {
                this.$toast.success(`${msg}成功!`)
                setTimeout(() => {
                  uni.redirectTo({
                    url: res.role === '2' ? '/pages/user/index' : '/pages/admin/index'
                  })
                }, 600);
                var app= getApp();
                app.globalData=this.loginInfo;
                console.log(app.globalData);
              } else {
                this.$toast.error(`${msg}失败!`)
              }
            } catch (e) {
              uni.$u.toast(`${msg}失败`)
            }
          })
          .catch(errors => {})
      },
      focusHandle(key) {
        this[key + 'Focus'] = true
      },
      blurHandle(key) {
        this[key + 'Focus'] = false
      }
    }
  }
  </script>