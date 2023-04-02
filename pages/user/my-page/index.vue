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