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
					<u-table  class="uitable" >
						<u-tr class="u-tr">
							<u-th class="u-th">ID</u-th>
							<u-th class="u-th">电车ID</u-th>
							<u-th class="u-th">电车速度</u-th>
							<u-th class="u-th">光照强度</u-th>
							<u-th class="u-th">实时</u-th>
							<u-th class="u-th" width="128rpx">时间</u-th>
						</u-tr>
						<u-tr class="u-tr" v-for="item in bikeList" :key="item.id">
							<u-td class="u-td">{{ item.id }}</u-td>
							<u-td class="u-td">{{ item.bike_id }}</u-td>
							<u-td class="u-td">{{ item.speed }}</u-td>
							<u-td class="u-td">{{ item.light }}</u-td>
							<u-td class="u-td">{{ item.real_time }}</u-td>
							<u-td class="u-td">{{  item.time }}</u-td>
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
				bikeList: [],
				listValue: [], // 存储分段器的选项
				pageSize: 6, // 分页大小，每页显示的记录数
				totalPage:1,
				currentPage:1,
				inputTime:'',
				length:0
			}
		},
		methods: {
          			// 更新分页器的当前页
			sectionChange(index) {
				// console.log(index);
				this.currentPage = index.current;
				// console.log('this.currentValue: ',this.currentValue);
			   // 每当分页器的当前页变化时，重新获取数据
			   this.findData1ListByTime()
			   
			},
			findData1ListByTime() {
				// console.log(this.inputTime);
				// 向后端请求数据
				uni.request({
					url: this.$global.baseUrl+'/data1/findData1ListByTime',
					method: 'POST',
					data: {
						page: this.currentPage,
						size: this.pageSize,
						time: this.inputTime
					},
					success: (res) => {
						const data = res.data;
						// console.log(data);
						this.bikeList = data.data.records || [];
						const total = Math.ceil(data.data.total/this.pageSize) || 0
						this.totalPage=total*10
						 this.length=data.data.total
						// console.log(this.totalPage);
						this.listValue = Array.from({
							length: total
						}, (v, k) => ({
							name: `第${k + 1}页`,
						}));
						// console.log(this.batteryList1);
					},
					fail: (error) => {
						console.error('请求失败:', error);
					},
				});
				this.show = false
			},
			formatTimestampToCustomString(timestamp) {
			  const date = new Date(timestamp);
			  const year = date.getFullYear();
			  const month = date.getMonth() + 1; // 月份从0开始，需要加1
			  const day = date.getDate();
			  const hours = date.getHours();
			  const minutes = String(date.getMinutes()).padStart(2, '0'); // 使用padStart确保两位数格式
			  const seconds = String(date.getSeconds()).padStart(2, '0'); // 使用padStart确保两位数格式
			
			  const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
			
			  return formattedDate;
			},
			confirm2(e) {
				
				this.inputTime = this.formatTimestampToCustomString(e.value),
				this.findData1ListByTime()
			 //     const data1= {
				// 	 time: this.formatTimestampToCustomString(e.value)
				//  }
				//  uni.request({
				//  	url: this.$global.baseUrl + '/data1/getDataByTime',
				//  	method: 'POST',
				// 	data: data1,
				//  	success: (res) => {
				//  		this.bikeList = res.data.data;
				//  		console.log(this.bikeList);
				//  	},
				//  	fail: (error) => {
				//  		console.error('请求失败:', error);
				//  	},
				//  });
				// // console.log(e );
				// this.show = false
			
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