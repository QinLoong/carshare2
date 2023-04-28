<template>
	<view class="device-record-container">
        <ScrollTolower ref="scrollTolowerRef" @request="findDeviceList" :loadmoreMarginTop="20"
			:loadmoreMarginBottom="20" :loadSize="1000">
			<template slot="main">
				<view class="device-image">
					<image src="@/static/images/device-page/device.svg"></image>
				</view>
				<view class="device-list">
					<u-cell-group title="设备列表" :border="false">
						<view slot="title">
							<text>设备列表</text>
							<!-- 添加设备 -->
							<u-button style="width: 160rpx; float: right" icon="plus" plain type="primary" size="mini"
								@click="newDeviceOpen()">添加设备</u-button>
							<!-- 筛选 -->
							<!-- <u-button style="width: 120rpx; float: right;margin-right: 10rpx;" icon="coupon" plain type="primary" size="mini" @click="filterDevice.show = true">筛选</u-button> -->
						</view>
                    </u-cell-group>
				</view>
			</template>
		</ScrollTolower>
                    </view>
                </template>