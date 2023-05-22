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
	
		},
		methods: {
	
	}
</script>