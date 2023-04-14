<template>
	<view class="order-record-container">
		<ScrollTolower @request="findOrderList" :loadmoreMarginTop="20" :loadmoreMarginBottom="20">
			<template slot="main">
				<view class="order-image">
					<image src="@/static/images/order-page/order.svg"></image>
				</view>
				<view class="order-list">
					<u-cell-group :border="false" title="订单列表">
						<u-cell title="订单1号" v-for="item in orderList" :key="item.id">
							<view slot="title" class="u-slot-title">
								<view style="margin-bottom: 15rpx;">订单号：{{item.id}}</view>
								<view class="order-payment" v-if="true"> 电车号：{{item.bike_number}} </view>

								<view style="margin-top: 25rpx;">
									<u-tag text="开始时间" plain size="mini" type="success" style="width: 120rpx;"></u-tag>
									<view style="margin-left: 130rpx;margin-top: -45rpx;">{{item.start_time}}</view>
								</view>
							</view>
						</u-cell>
					</u-cell-group>

				</view>
			</template>
		</ScrollTolower>
	</view>
</template>
<script name="PaymentRecord">
	import {
		findOrderList
	} from '@/common/api/order.js'
	import {
		dictDisplay,
		orderStatus
	} from '@/common/utils/dict'
	export default {
		data() {
			return {
				userId: this.$store.state.userInfo.id,
				orderList: [],
				orderStatus,
				loginInfo: {}
			}
		},
		mounted() {
			//拿到用户名  
			var app = getApp();
			this.loginInfo = app.globalData
			// console.log(this.loginInfo);
			this.getOrder1ByUser()
		},
		methods: {
			getOrder1ByUser() {
				// 向后端请求数据
				const user_name = this.loginInfo
				// console.log(user_name);
				uni.request({
					url: this.$global.baseUrl + '/order1/getOrder1ByUser',
					method: 'POST',
					data: user_name,
					success: (res) => {
						// this.batteryList1 = res.data.data;
						this.orderList = res.data.data;
						console.log(this.orderList);
					},
					fail: (error) => {
						console.error('请求失败:', error);
					},
				});
			}
			
</script>
