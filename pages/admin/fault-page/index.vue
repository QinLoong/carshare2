<template>
    <view class="fault-record-container">
      <ScrollTolower ref="scrollTolowerRef" @request="findFaultList" :loadmoreMarginTop="20" :loadmoreMarginBottom="20">
        <template slot="main">
          <view class="fault-image">
            <image src="@/static/images/data-page/fault.svg"></image>
          </view>
          <view class="fault-list">
            <u-cell-group :title="`查询列表`" :border="false">
              <u-cell v-for="fault in faultList" :title="`【${fault.A1}】${vStatus[fault.D1]}`" :label="$format(fault.ctime)" titleStyle="color:#f56c6c">
              </u-cell>
            </u-cell-group>
            <view class="card">
              <u-cell-group :border="false">
                <u-cell v-for="cell in cellList" :key="cell.title" size="large" iconStyle="margin-right:12rpx" :border="false" isLink :icon="cell.icon" :title="cell.title" @click="changeRoute(cell)" />
              </u-cell-group>
            </view>
          </view>
        </template>
      </ScrollTolower>
    </view>
  </template>