<template>
    <view class="home-page">
      <view class="map"></view>
      <view class="search-box">
        <view>电车列表</view>
        <u-button style="width: 100rpx; margin: 0 20rpx" plain type="primary" size="mini" @click="location.show = true">位置</u-button>
      </view>
      <view class="list-cell" v-for="(cyc, index) in cycList" :key="cyc.id">
        <cyc :cyc="cyc" @navTo="navTo('/pages/user/cycling-page/index', cyc.id)"></cyc>
      </view>
      <u-picker :show="location.show" :columns="[location.locations]" itemHeight="60" closeOnClickOverlay @close="location.show = false" @cancel="location.show = false" @confirm="findBikeList"></u-picker>
    </view>
  </template>
  
  <script name="OrderPage">
  import { findBikeList } from '@/common/api/device.js'
  import { locations } from '@/common/utils/dict'
  import cyc from '../cycling-page/cyc.vue'
  export default {
    components: { cyc },
    data() {
      return {
        userId: this.$store.state.userInfo.id,
        cycList: [],
        location: {
          locations,
          show: false
        }
      }
    },
    mounted() {
      this.findBikeList()
    },
    methods: {
      async findBikeList(v) {
        try {
          const location = v?.value?.length ? v.value[0] : null
          const res = await findBikeList({ page: 1, size: 1000, ...(!location || location === '' || location === '全部' ? {} : { location }) })
          if (res.code === 200) {
            this.cycList = res.data.records
          } else {
            this.$toast.error('请求失败!')
          }
        } catch (err) {
          this.$toast.error(err)
        } finally {
          this.location.show = false
        }
      },
      navTo(url, id) {
        uni.redirectTo({
          url: url + '?page=homePage&id=' + id
        })
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .home-page {
    height: 100vh;
    background-color: $app-background-grey;
    .search-box {
      background: #fff;
      height: 70rpx;
      line-height: 70rpx;
      padding-left: 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  </style>
  