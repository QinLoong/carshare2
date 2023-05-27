<template>
    <view class="fault-record-container">
      <ScrollTolower ref="scrollTolowerRef" @request="findFaultList" :loadmoreMarginTop="20" :loadmoreMarginBottom="20">
       
      </ScrollTolower>
    </view>
  </template>