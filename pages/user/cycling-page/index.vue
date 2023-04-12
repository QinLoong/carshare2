<template>
    <view class="wrap">
      <u-navbar :safeAreaInsetTop="true" v-if="showtabar!=1" :placeholder="true" :border="true" class="navbar" @leftClick="backNav">
        <view  class="u-nav-slot" slot="left">
          <u-icon name="arrow-left" size="32"></u-icon>
          <span class="title">{{ titleMap[title] }}</span>
        </view>
      </u-navbar>
      <cyc-page :cyc="cyc" :showStatus="title !== 'orderPage'"></cyc-page>
      <view v-if="title !== 'orderPage'">
        <view class="box-title">电车信息</view>
        <Device :device="cyc" ref="deviceRef"></Device>
      </view>
      <view v-if="title === 'homePage'">
        <!-- <view v-if="cyc.status == '1'">
          <view class="box-title">电车指令</view>
          <direct-page :device="cyc" ></direct-page>
        </view> -->
        <!-- <view class="clock">
          <u-button type="error" text="开锁" v-if="cyc.status == '2'" @click="openBike"></u-button>
          <u-button type="warning" text="还车" v-else @click="exitDevice"></u-button>
        </view> -->
      </view>
      <pay-page :id="orderId" v-if="title === 'orderPage'" @back="backNav"></pay-page>
      <u-modal :show="isPayShow" title="支付订单" :closeOnClickOverlay="true" confirmText="支付" :showCancelButton="true" @close="isPayShow = false" @cancel="isPayShow = false" @confirm="confirm">
        <view class="slot-content" style="text-align: center">
          <image style="width: 100rpx; height: 100rpx" src="@/static/images/order-page/pay.svg"></image>
          <view>当前金额为 {{ order.pay_money }}元</view>
        </view>
      </u-modal>
    </view>
  </template>
  <script>
  import CycPage from './cyc.vue'
  import DirectPage from './direct.vue'
  import Device from './device.vue'
  import PayPage from './pay.vue'
  import { dictDisplay, batteryStatus, getRoundLocation } from '@/common/utils/dict'
  import { findBikeDetail, exitDevice, openBike } from '@/common/api/device.js'
  import { addPay } from '@/common/api/pay.js'
  import { connectionLoop } from '@/common/utils/connectionLoop'
  export default {
    components: { CycPage, DirectPage, PayPage, Device },
    data() {
      return {
        userId: this.$store.state.userInfo.id,
        batteryStatus,
        cyc: {},
        titleMap: {
          homePage: '电车详情',
          orderPage: '订单记录'
        },
        title: 'homePage',
        cycId: '',
        orderId: '',
        isPayShow: false,
        order: {},
        showtabar: 0
      }
    },
    onLoad(option) {
      this.cycId = option.id
      this.title = option.page
      this.orderId = option.orderId
    },
    mounted() {
      this.findBikeDetail(),
      // console.log(this.cyc),
      setInterval(()=>{
          this.showtabar=uni.getStorageSync('showTabar');
          // console.log(this.showtabar);
      },100)
    },
    methods: {
      dictDisplay,
      async findBikeDetail() {
        try {
          const res = await findBikeDetail({
            id: this.cycId
          })
          if (res.code === 200) {
            this.cyc = res.data
            // console.log(this.cyc);
          } else {
            this.$toast.error('请求失败!')
          }
        } catch (err) {
          this.$toast.error(err)
        }
      },
      // 开车
      async openBike() {
        try {
          if (!this.cyc.battery_id) {
            this.$toast.error('请联系管理员装载电池')
            return
          }
          const data = { id: this.cycId, userId: this.userId }
          const res = await openBike(data)
          if (res.code === 200) {
            this.$toast.success('成功!')
            this.findBikeDetail()
          } else {
            this.$toast.error('请求失败!')
          }
        } catch (err) {
          console.log('errerr')
          console.log(err)
          connectionLoop({ reset: this.openBike })
        }
      },
      // 还车
      async exitDevice() {
        try {
          const res = await exitDevice({ id: this.cycId, userId: this.userId, location: getRoundLocation(), power: this.$refs.deviceRef.nowDevice.data.A13 })
          if (res.code === 200) {
            this.$toast.success('成功!')
            this.findBikeDetail()
            this.order = res.data
            this.$nextTick(() => {
              this.isPayShow = true
            })
          } else {
            this.$toast.error('请求失败!')
          }
        } catch (err) {
          connectionLoop({ reset: this.exitDevice, isConnection: err === 'system error' })
        }
      },
      async addPay() {
        try {
          const res = await addPay({
            orderId: this.order.order_id,
            userId: this.order.user_id,
            payMoney: this.order.pay_money
          })
          if (res.code === 200) {
            this.$toast.success('支付成功!')
            this.backNav()
          } else {
            this.$toast.error('请求失败!')
          }
        } catch (err) {
          this.$toast.error(err)
        }
      },
      async confirm() {
        try {
          await this.addPay()
          this.backNav()
        } catch (e) {
          console.log(e)
          uni.$u.toast(e)
        } finally {
          this.show = false
        }
      },
      backNav() {
        setTimeout(() => {
          uni.redirectTo({
            url: '/pages/user/index' + (this.title === 'orderPage' ? '?active=1' : '')
          })
        }, 200)
      }
    }
  }
  </script>
  <style lang="scss" scoped>
  .wrap {
    min-height: 100vh;
    background-color: #f5f5f5;
    .navbar {
      .u-nav-slot {
        display: flex;
        .title {
          margin-left: 20rpx;
        }
      }
    }
    .box-title {
      margin: 30rpx 20rpx;
      padding: 10rpx 15rpx;
    }
    .cell-group {
      box-sizing: border-box;
      background-color: #fff;
      margin: 20rpx 20rpx;
      padding: 10rpx 15rpx;
      border-radius: 20rpx;
    }
    .clock {
      margin: 30rpx 20rpx;
    }
  }
  </style>
  