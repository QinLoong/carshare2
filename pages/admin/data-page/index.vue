<template>
	<view class="data-record-container">
		<ScrollTolower ref="scrollTolowerRef" @request="findDataList" :loadmoreMarginTop="20"
			:loadmoreMarginBottom="20">
			<template slot="main">
				<view class="data-image">
					<image src="@/static/images/data-page/data.svg"></image>
				</view>
				<view class="data-list">
					<u-cell-group :title="`数据列表`" :border="false">
            </u-cell-group>
				</view>
			</template>
		</ScrollTolower>
		<u-collapse-item v-for="data in dataList" :key="data.id" :title="`【${data.A1}】`" :label="$format(data.ctime)">

<view slot="title" :style="{ color: data.D1 == 0 ? '#5ac725' : '#f56c6c', display: 'flex' }">
  {{ `【${data.A1}】` }}
  <text v-if="data.D1 != 0">{{ vStatus[data.D1] }}</text>
  <u-tag v-if="data.connection" text="重连数据" plain size="mini" style="width: 130rpx"></u-tag>
</view>

<view>
  <dataInfo :data="data"></dataInfo>
</view>
</u-collapse-item>
</u-collapse>
	</view>
	<u-collapse-item :title="`订单列表（共${orderList.length}条）`">
						<view>
							<u-cell title="订单1号" v-for="item in orderList" :key="item.id">
								<view slot="title" class="u-slot-title">
									<view style="margin-bottom: 15rpx;">订单号：{{item.id}}</view>
									<view class="order-payment" v-if="true"> 电车号：{{item.bike_number}} </view>
							
									<view style="margin-top: 25rpx;">
										<u-tag text="开始时间" plain size="mini" type="success" style="width: 120rpx;"></u-tag>
										<view style="margin-left: 130rpx;margin-top: -45rpx;">{{item.start_time}}</view>
									</view>
								</view>
								<view slot="value" class="order-value">
									<view style="margin-top: -6rpx;">
										<view style="margin-bottom: 15rpx;">金额：{{item.money}}</view>
										<view class="order-payment" v-if="true"> 用户名：{{item.user_name}} </view>
										
										<view style="margin-top: 25rpx;">
											<u-tag text="结束时间" plain size="mini" type="error" style="width: 120rpx;"></u-tag>
											<view style="margin-left: 130rpx;margin-top: -45rpx;">{{item.end_time}}</view>
										</view>
									</view>
								</view>
							</u-cell>
						</view>
						</u-collapse-item>
</template>


<script name="dataRecord">
	import {
		findDataList
	} from '@/common/api/data.js'
	import {
		vStatus,
		dataDisplay
	} from '@/common/utils/dict.js'
	import dataInfo from '@/components/data-info/index.vue'
	export default {
		components: {
			dataInfo
		},
		data() {
			return {
				orderList: [],
				vStatus,
				dataList: [],
				total: 0,
				interval: null,
				time: 5000,
				listValue: [], // 存储分段器的选项
				pageSize: 6, // 分页大小，每页显示的记录数
				hasMore: false, // 是否还有更多数据
			}
		},