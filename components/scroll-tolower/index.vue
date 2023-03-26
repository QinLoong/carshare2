<template>
    <view class="scroll-tolower">
      <view v-if="pageLoading" class="skeleton">
        <u-skeleton
          :animate="pageLoadingOptions.animate"
          :avatar="pageLoadingOptions.avatar"
          :avatar-shape="pageLoadingOptions.avatarShape"
          :avatar-size="pageLoadingOptions.avatarSize"
          :loading="pageLoading"
          :rows="pageLoadingOptions.rows"
          :rows-height="pageLoadingOptions.rowsHeight"
          :rows-width="pageLoadingOptions.rowsWidth"
          :title="pageLoadingOptions.title"
          :title-height="pageLoadingOptions.titleHeight"
        />
      </view>
  
      <scroll-view
        v-show="!pageLoading"
        enable-flex
        :refresher-enabled="openRefresher"
        :refresher-triggered="refresher.isRefresher"
        :scroll-top="scrollViewTop"
        class="scroll-Y"
        :scroll-y="true"
        style="display: flex; flex-direction: column; justify-content: space-between"
        @refresherabort="refresherabort"
        @refresherpulling="refresherpulling"
        @refresherrefresh="refresherrefresh"
        @refresherrestore="refresherrestore"
        @scrolltolower="handleScrolltolower"
      >
        <view id="scrollMain">
          <template v-show="loadList.length">
            <slot :list="loadList" name="main" />
          </template>
          <view v-if="showEmpty" class="empty-container">
            <img src="@/static/images/empty.png" />
            <text style="color: gray">{{ emptyText }}</text>
          </view>
        </view>
        <view v-if="showLoadmore && !showEmpty" class="box-buttom">
          <u-loadmore
            v-if="showStatus.findIndex((i) => load.status == i) !== -1"
            line
            :margin-bottom="loadmoreMarginBottom"
            :margin-top="loadmoreMarginTop"
            :nomore-text="load.nomoreText"
            :status="load.status"
          />
        </view>
      </scroll-view>
    </view>
  </template>