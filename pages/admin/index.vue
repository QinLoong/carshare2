<template>
    <view class="content">
      <view class="top-status-bar" />
      <view class="main">
        <StatisticsPage v-if="this.routeActive === 0" />
        <DevicePage v-if="this.routeActive === 1" />
        <DataPage v-if="this.routeActive === 2" />
        <FaultPage v-if="this.routeActive === 3" />
        <MyPage v-if="this.routeActive === 4" />
      </view>
  
      <view class="tabbar">
        <u-tabbar :value="routeActive" :fixed="true">
          <u-tabbar-item v-for="(route, index) in routeList" :name="index" :key="route.name" :text="route.text" :icon="route.icon" @click="routeChange" />
        </u-tabbar>
      </view>
    </view>
  </template>
  
  <script>
  import StatisticsPage from './statistics-page/index'
  import DevicePage from './device-page/index'
  import MyPage from './my-page/index'
  import FaultPage from './fault-page/index'
  import DataPage from './data-page/index'
  
  export default {
    components: {
      StatisticsPage,
      DevicePage,
      MyPage,
      FaultPage,
      DataPage
    },
    data() {
      return {
        routeActive: 0,
        routeList: [
          {
            name: 'statistics',
            text: '统计',
            icon: 'grid'
          },
          {
            name: 'bike',
            text: '设备',
            icon: 'bookmark'
          },
          {
            name: 'data',
            text: '数据',
            icon: 'order'
          },
          {
            name: 'fault',
            text: '查询',
            icon: 'info-circle'
          },
          {
            name: 'battery',
            text: '我的',
            icon: 'account'
          },
        ]
      }
    },
    // 页面加载时,根据传递的参数 options 来初始化 routeActive 属性的值
    onLoad(options) {
      if(options.active) {
        this.routeActive = Number(options.active)
      }
    },
    methods: {
      routeChange(active) {
        uni.redirectTo({
          url: `/pages/admin/index?active=${active}`
        })
      }
    }
  }
  </script>
  
  <style lang="scss" scoped></style>
  