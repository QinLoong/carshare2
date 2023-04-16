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
							<view slot="value" class="order-value">
								<view style="margin-top: -40rpx;">
									<view style="margin-bottom: 15rpx;">金额：{{item.money}}</view>
									<view class="order-payment" v-if="true"> 用户名：{{item.user_name}} </view>
									
									<view style="margin-top: 25rpx;">
										<u-tag text="结束时间" plain size="mini" type="error" style="width: 120rpx;"></u-tag>
										<view style="margin-left: 130rpx;margin-top: -45rpx;">{{item.end_time}}</view>
									</view>
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
			},
			dictDisplay,
			async findOrderList({
				page,
				size
			}, handleRequest) {
				try {
					const res = await findOrderList({
						userId: this.userId
					})
					if (res.code === 200) {
						this.orderList = handleRequest(res.data.slice((page - 1) * size, page * size), res.data.length)
					} else {
						this.$toast.error('请求失败!')
					}
				} catch (err) {
					this.$toast.error(err)
				}
			},
			navTo(url, order) {
				const toUrl = order.status === '1' ? `${url}?page=homePage&orderId=${order.id}&id=${order.device_id}` :
					`${url}?page=orderPage&orderId=${order.id}&id=${order.device_id}`
				uni.navigateTo({
					url: toUrl
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.order-record-container {
		height: calc(100vh - 90rpx);

		.order-image {
			width: 100%;
			height: 300rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: linear-gradient($color1, $color2);

			image {
				padding: 30rpx;
				width: 210rpx;
				height: 70%;
				margin: auto;
				background: rgba(255, 255, 255, 0.2);
				border-radius: 50%;
			}
		}

		.order-btn {
			display: flex;
			margin-bottom: 15rpx;

			&.order-btn__1 {

				::v-deep .u-icon__icon,
				.text {
					color: $uni-color-primary !important;
				}
			}

			&.order-btn__2 {

				::v-deep .u-icon__icon,
				.text {
					color: $uni-color-success !important;
				}
			}

			&.order-btn__3 {

				::v-deep .u-icon__icon,
				.text {
					color: $uni-color-warning !important;
				}
			}
		}

		.order-payment {
			display: flex;
			align-items: flex-end;

			::v-deep .u-icon__icon,
			& {
				color: $uni-color-primary !important;
			}
		}

		::v-deep {
			.u-cell-group__title {
				background: $app-background-grey;
			}
		}
	}
</style>