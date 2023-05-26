<template>
	<view class="user-record-container">
		<ScrollTolower ref="scrollTolowerRef" @request="findUserList" :loadmoreMarginTop="20"
			:loadmoreMarginBottom="20">
			<template slot="main">
				<view class="user-image">
					<image src="@/static/images/user-page/user.svg"></image>
				</view>
                <view class="user-list">
					  <view style="display: flex; align-items: center;margin-top: 100rpx;margin-left: -15rpx;">
					    <u--input placeholder="请输入用户名或电车ID" border="surround" v-model="inputValue" style="flex: 1; height: 40rpx; margin: 0 50rpx"> </u--input>
					    <u-button  type="primary" text="确定" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" style="width: 100rpx;height: 65rpx;margin-right: 20rpx;" @click="confirm2(inputValue)"></u-button>
					  </view>
					
					<view style="margin-top: 80rpx;">共{{orderList.length}}条数据</view>
					<u-table  class="uitable">
						<u-tr class="u-tr">
							<u-th class="u-th">ID</u-th>
							<u-th class="u-th">用户名</u-th>
							<u-th class="u-th">电车ID</u-th>
							<u-th class="u-th">金额</u-th>
							<u-th class="u-th" width="125rpx">开始时间</u-th>
							<u-th class="u-th" width="128rpx">结束时间</u-th>
							<!-- <u-th class="u-th" width="105rpx">时间</u-th> -->
						</u-tr>
						<u-tr class="u-tr" v-for="item in orderList" :key="item.id">
							<u-td class="u-td">{{ item.id }}</u-td>
							<u-td class="u-td">{{ item.user_name }}</u-td>
							<u-td class="u-td">{{ item.bike_number }}</u-td>
							<u-td class="u-td">{{ item.money }}</u-td>
							<u-td class="u-td" >{{ item.start_time}}</u-td>
							<u-td class="u-td" >{{ item.end_time }}</u-td>
							<!-- <u-td class="u-td" fontsize="1">{{  new Date(item.end_time).toLocaleString() }}</u-td> -->
						</u-tr>
					</u-table>
				</view>
			</template>
		</ScrollTolower>
	</view>
</template>
<script name="userRecord">
	import {
		findUserList,
		deleteUser
	} from '@/common/api/user.js'
	export default {
		data() {
			return {
				userList: [],
				userId: this.$store.state.userInfo.id,
				show: false,
				value1: Number(new Date()),
				orderList: [],
				inputValue: '',
			}
		},
		mounted(){
            this.getAllOrder1()
		},
		methods: {
            getAllOrder1() {
				// 向后端请求数据
				uni.request({
					url: this.$global.baseUrl + '/order1/getAllOrder1',
					method: 'POST',
					success: (res) => {
						// this.batteryList1 = res.data.data;
						this.orderList = res.data.data;
						// console.log(this.orderList);
					},
					fail: (error) => {
						console.error('请求失败:', error);
					},
				});
			},
            confirm2(e) {
			     const data1= {
					 user_name: this.inputValue,
					 bike_number: this.inputValue
				 }
				 uni.request({
				 	url: this.$global.baseUrl + '/order1/getOrder1ByLimit',
				 	method: 'POST',
					data: data1,
				 	success: (res) => {
				 		this.orderList = res.data.data;
				 		console.log(this.orderList);
				 	},
				 	fail: (error) => {
				 		console.error('请求失败:', error);
				 	},
				 });
			
			},
            async findUserList({
				page,
				size
			}, handleRequest) {
				try {
					const res = await findUserList({
						page,
						size
					})
					if (res.code === 200) {
						this.userList = handleRequest(res.data.records, res.data.total)
					} else {
						this.$toast.error('请求失败!')
					}
				} catch (err) {
					this.$toast.error(err)
				}
			},
            async deleteUser(id) {
				try {
					const res = await deleteUser({
						id
					})
					if (res.code === 200) {
						this.$toast.success('删除成功!')
						setTimeout(() => {
							this.$refs.scrollTolowerRef.resetRequest()
						}, 200)
					} else {
						this.$toast.error('请求失败!')
					}
				} catch (err) {
					this.$toast.error(err)
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	.user-record-container {
		height: calc(100vh - 90rpx);

		.user-image {
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

		.user-value {
			color: $uni-color-primary;
		}

		::v-deep {
			.u-cell-group__title {
				background: $app-background-grey;
			}
		}
	}
</style>