<template>
	<view class="user-record-container">
		<ScrollTolower ref="scrollTolowerRef" @request="findUserList" :loadmoreMarginTop="20"
			:loadmoreMarginBottom="20">
			<template slot="main">
				<view class="user-image">
					<image src="@/static/images/user-page/user.svg"></image>
				</view>
				<view class="user-list">
					<u-datetime-picker :show="show" v-model="value1" mode="datetime" @cancel="show = false" @confirm="confirm2" itemHeight="90"></u-datetime-picker>
					<u-tag text="开始时间" plain  type="warning" style="width: 150rpx; margin-top: 80rpx;margin-left: 30rpx;"></u-tag>
					<u-button @click="show = true" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" style="width: 110rpx;margin-top: -60rpx;height: 60rpx;">选择</u-button>
					
					<view style="margin-top: 80rpx;">共{{length}}条数据</view>
					<u-table class="uitable">
						<u-tr class="u-tr">
							<u-th class="u-th">ID</u-th>
							<u-th class="u-th">电池编号</u-th>
							<u-th class="u-th">电量</u-th>
							<u-th class="u-th">工作温升</u-th>
							<u-th class="u-th">电压</u-th>
							<u-th class="u-th">充放电流</u-th>
							<u-th class="u-th">实时</u-th>
							<u-th class="u-th"  width="126rpx">时间</u-th>
					
						</u-tr>
						<u-tr class="u-tr" v-for="item in batteryList" :key="item.id">
							<u-td class="u-td">{{ item.id }}</u-td>
							<u-td class="u-td">{{ item.number }}</u-td>
							<u-td class="u-td">{{ item.power*100+'%' }}</u-td>
							<u-td class="u-td">{{ item.t }}</u-td>
							<u-td class="u-td">{{ item.v1 }}</u-td>
							<u-td class="u-td">{{ item.i }}</u-td>
							<u-td class="u-td">{{ item.real_time }}</u-td>
							<u-td class="u-td" >{{ item.ctime }}</u-td>
						</u-tr>
						<uni-pagination :show-icon="true" :total="totalPage" :current="currentPage" @change="sectionChange" style="margin-top: 5px; "/>
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
				batteryList: [],
				listValue: [], // 存储分段器的选项
				pageSize: 6, // 分页大小，每页显示的记录数
				totalPage:1,
				currentPage:1,
				inputTime:'',
				length:0
			}
		},
</script>