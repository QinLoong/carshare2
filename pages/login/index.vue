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
  
  <style lang="scss" scoped>
  .login-wrap {
    height: 100vh;
    position: relative;
    background: linear-gradient(#f6ebe6, #aee1f9);
  
    .code-class-disable {
      color: #c0c0c0 !important;
    }
  
    .login-logo {
      height: 600rpx;
      width: 85%;
      margin: 0 auto;
      padding-top: 80rpx;
      text-align: center;
  
      image {
        width: 50%;
        height: 50%;
        margin-top: 20%;
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0px 0px 20px 1px rgba(255, 255, 255, 1);
        border-radius: 50%;
        padding: 50rpx;
      }
    }
  
    .login-title {
      width: 100%;
      text-align: center;
      color: #333;
      font-size: 40rpx;
    }
  
    /deep/ .u-form {
      height: 100%;
    }
  
    .login-form {
      .form-item {
        margin: 20rpx 30rpx;
  
        /deep/ .u-input {
          border: 1rpx solid #fff;
          border-radius: 45rpx;
          background-color: #fff;
          padding: 20rpx 30rpx !important;
        }
  
        .prefix-icon {
          font-size: 38rpx;
          margin-right: 20rpx;
          color: #cecece;
        }
  
        .code-text {
          color: #2b85e4;
          font-size: 28rpx;
        }
      }
  
      .focus {
        /deep/ .u-input {
          border: 1rpx solid #1877f2 !important;
        }
  
        .prefix-icon {
          color: #1877f2;
        }
      }
    }
  
    .toggle-login {
      color: #1877f2;
      font-size: 30rpx;
      padding: 20rpx 10rpx;
      text-align: end;
  
      .forget-pwd {
        font-size: 26rpx;
        color: #a3a3a3;
      }
    }
  }
  </style>
  