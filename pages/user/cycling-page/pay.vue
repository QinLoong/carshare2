<template>
  <view class="direct">
    <view class="pay-box">
      <view class="content">
        <view class="money">
          <image style="width: 100rpx; height: 100rpx" src="@/static/images/order-page/location.svg"></image>
        </view>
        <view>起始位置： {{ order.start_location }}</view>
        <view style="margin: 40rpx 0">最终位置： {{ order.end_location }}</view>
      </view>
    </view>
    <view class="pay-box" v-if="order">
      <view class="content">
        <view>开锁时间： {{ $format(order.ctime) }}</view>
        <view style="margin: 40rpx 0">还车时间： {{ $format(order.start_time) }}</view>
        <view class="money">
          <image style="width: 100rpx; height: 100rpx" src="@/static/images/order-page/pay.svg"></image>
          <view>金额： {{ order.payment }}元</view>
        </view>
      </view>
      <view class="footer">
        <u-button type="error" text="去支付" v-if="order.status == '2'" @click="show = true"></u-button>
        <u-button type="primary" text="返回" @click="back"></u-button>
      </view>
    </view>
    <u-modal :show="show" title="支付订单" :closeOnClickOverlay="true" confirmText="支付" :showCancelButton="true" @close="show = false" @cancel="show = false" @confirm="confirm">
      <view class="slot-content" style="text-align: center">
        <image style="width: 100rpx; height: 100rpx" src="@/static/images/order-page/pay.svg"></image>
        <view>当前金额为 {{ order.payment }}元</view>
      </view>
    </u-modal>
  </view>
</template>

<script name="PayPage">
import { dictDisplay, bikeStatus } from '@/common/utils/dict'
import { findOrderById } from '@/common/api/order.js'
import { addPay } from '@/common/api/pay.js'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      userId: this.$store.state.userInfo.id,
      order: {},
      show: false,
      bikeStatus
    }
  },
  mounted() {
    this.findOrderById()
  },
  methods: {
    dictDisplay,
    async findOrderById() {
      try {
        const res = await findOrderById({ id: this.id })
        if (res.code === 200) {
          this.order = res.data
        } else {
          this.$toast.error('请求失败!')
        }
      } catch (err) {
        this.$toast.error(err)
      }
    },
    back() {
      this.$emit('back')
    },
    async addPay() {
      try {
        const res = await addPay({
          orderId: this.order.id,
          userId: this.userId,
          payMoney: this.order.payment
        })
        if (res.code === 200) {
          this.$toast.success('支付成功!')
          this.$emit('back')
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
      } catch (e) {
        console.log(e)
        uni.$u.toast(e)
      } finally {
        this.show = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.direct {
  .pay-box {
    box-sizing: border-box;
    background-color: #fff;
    margin: 20rpx 20rpx;
    padding: 10rpx 15rpx;
    border-radius: 20rpx;
    border-top: 10rpx solid $color1;
    .title {
      font-weight: bold;
      font-size: 150%;
      margin-top: 10rpx;
    }
    .content {
      text-align: center;
      margin-top: 20rpx;
      view {
        margin-bottom: 10rpx;
      }
      .money {
        font-weight: bold;
        font-size: 150%;
      }
    }
    .footer {
      display: flex;
      justify-content: space-around;
      padding: 20rpx 50rpx;
      .u-button {
        width: 200rpx;
      }
    }
  }
}
</style>
