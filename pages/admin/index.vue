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
  }
}
</script>