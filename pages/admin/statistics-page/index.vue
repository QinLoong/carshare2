<template>
	<view class="body window">
		<view class="data_body">
			<h3 class="title-king">数据驾驶舱</h3>
			<view class="scroll_list" :style="{ marginTop: '20rpx' }">
				<u-button text="切换图表" size="mini" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" style="width: 80px; margin-top: 20px;"  @click="toggleTable3"></u-button>
				<!-- 上周订单数量 -->
				<view class="view_block" v-if="showIndex">
					<view class="title">电车1号 <text class="font-small" style="color: #ccc"></text></view>
					<view class="charts-box" style="height: 850px">
						<line-chart canvasId="index_line_2" :dataAs="lineData2" style="margin-left: -20px;"/>
						<view class="illegal">
							<view class="">
								<text style="font-size: 17px; margin-right: 15px;">
									实时速度光照显示
								</text>
								<u-button text="显示/隐藏图表" size="mini" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" style="width: 80px; margin-top: 20px;"  @click="toggleTable"></u-button>
							</view>
							<u-table v-if="showTable" class="uitable" style="margin-top: 10px; ">
								<u-tr class="u-tr">
									<u-th class="u-th">ID</u-th>
									<u-th class="u-th">电车ID</u-th>
									<u-th class="u-th">电车速度</u-th>
									<u-th class="u-th">光照强度</u-th>
									<u-th class="u-th">实时</u-th>
									<u-th class="u-th" width="143rpx">时间</u-th>
								</u-tr>
								<u-tr class="u-tr" v-for="item in sandl" :key="item.id">
									<u-td class="u-td">{{ item.id }}</u-td>
									<u-td class="u-td">{{ item.bike_id }}</u-td>
									<u-td class="u-td">{{ item.speed }}</u-td>
									<u-td class="u-td">{{ item.light }}</u-td>
									<u-td class="u-td">{{ item.real_time }}</u-td>
									<u-td class="u-td">{{ item.time }}</u-td>
								</u-tr>
							    <uni-pagination :show-icon="true" :total="totalPage" :current="currentPage" @change="sectionChange" style="margin-top: 5px; "/>
							</u-table>
						</view>
					</view>
				</view>
				<!-- 上周故障数量 -->
				<view class="view_block" v-else>
					<view class="title">电车2号 <text class="font-small" style="color: #ccc"></text></view>
					<view class="charts-box" style="height: 850px">
						<line-chart canvasId="index_line_3" :dataAs="lineData3" style="margin-left: -20px;"/>
						<view class="illegal">
							<view class="">
								<text style="font-size: 17px; margin-right: 15px;">
									实时速度光照显示
								</text>
								<u-button text="显示/隐藏图表" size="mini" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" style="width: 80px; margin-top: 20px;"  @click="toggleTable"></u-button>
							</view>
							<u-table v-if="showTable" class="uitable" style="margin-top: 10px;">
								<u-tr class="u-tr">
									<u-th class="u-th">ID</u-th>
									<u-th class="u-th">电车ID</u-th>
									<u-th class="u-th">电车速度</u-th>
									<u-th class="u-th">光照强度</u-th>
									<u-th class="u-th">实时</u-th>
									<u-th class="u-th" >时间</u-th>
								</u-tr>
								<u-tr class="u-tr" v-for="item in sandl2" :key="item.id">
									<u-td class="u-td">{{ item.id }}</u-td>
									<u-td class="u-td">{{ item.bike_id }}</u-td>
									<u-td class="u-td">{{ item.speed }}</u-td>
									<u-td class="u-td">{{ item.light }}</u-td>
									<u-td class="u-td">{{ item.real_time }}</u-td>
									<u-td class="u-td">{{ item.time }}</u-td>
								</u-tr>
								<uni-pagination :show-icon="true" :total="totalPage2" :current="currentPage2" @change="sectionChange2" style="margin-top: 5px; "/>
							</u-table>
							
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import LineChart from '@/components/stan-ucharts/LineChart.vue';
	export default {
		components: {
			LineChart,
		},
		data() {
			return {
				lineData2: {
					categories: [1,2,3,4], // 时间数组，根据后端数据动态生成
					series: [{
						name:'速度',
						data:[0,0,0,0]
					}], // 数据数组，根据后端数据动态生成
				},
				lineData3: {
					categories: [1,2,3,4], // 时间数组，根据查询历史数据动态生成
					series: [{
						name:'速度',
						data:[0,0,0,0]
					}]// 数据数组，根据查询历史数据动态生成
				},
				sandl: [],
				sandl2: [],
				top: '180', //下拉栏位置
				scrollHeight: '600px', //数据展示体高度
				showTable: true,
				showTable2: true,
				listValue: [], // 存储分段器的选项
				pageSize: 6, // 分页大小，每页显示的记录数
				hasMore: false, // 是否还有更多数据
				totalPage:1,
				currentPage:1,
				batteryList1:[],
				showIndex:1,
				listValue2: [], // 存储分段器的选项
				totalPage2:1,
				currentPage2:1,
			}
		},
		methods: {
			// 更新分页器的当前页
			sectionChange2(index) {
				// console.log(index);
				this.currentPage2 = index.current;
				console.log('this.currentPage2: ',this.currentPage2);
			   // 每当分页器的当前页变化时，重新获取数据
			   this.findData1List2()
			   
			},
			// 更新分页器的当前页
			sectionChange(index) {
				// console.log(index);
				this.currentPage = index.current;
				// console.log('this.currentValue: ',this.currentValue);
			   // 每当分页器的当前页变化时，重新获取数据
			   this.findData1List()
			   
			},
			// 获取数据
			findData1List2() {
				// 向后端请求数据
				uni.request({
					url: this.$global.baseUrl+'/data1/findData1List',
					method: 'POST',
					data: {
						page: this.currentPage2,
						size: this.pageSize,
						bike_id:2
					},
					success: (res) => {
						const data = res.data;
						// console.log(data);
						// const data = res.data;
						this.sandl2 = data.data.records || [];
						const total = Math.ceil(data.data.total/this.pageSize) || 0
						this.totalPage2=total*10
						// console.log(data.data.total);
						this.listValue2 = Array.from({
							length: total
						}, (v, k) => ({
							name: `第${k + 1}页`,
						}));
						// console.log(this.batteryList1);
						// this.hasMore = data.hasMore || false;
					},
					fail: (error) => {
						console.error('请求失败:', error);
					},
				});
			},
			// getData3(){
			// 	// 向后端请求数据
			// 	uni.request({
			// 		url: this.$global.baseUrl+'/data1/getAllData1',
			// 		method: 'POST',
			// 		success: (res) => {
			// 				// this.batteryList1 = res.data.data;
			// 				const data = res.data.data;
			// 				const total=Math.ceil(data.length/this.pageSize)
			// 				// console.log(total);
			// 				this.totalPage=total*10
			// 				// console.log(this.totalPage);
			// 				this.listValue = Array.from({
			// 					length: total
			// 				}, (v, k) => ({
			// 					name: `第${k + 1}页`,
			// 				}));
			// 				// console.log(this.listValue);
			// 				this.findData1List();
			// 		},
			// 		fail: (error) => {
			// 			console.error('请求失败:', error);
			// 		},
			// 	});
			// },
			// 获取数据
			findData1List() {
				// 向后端请求数据
				uni.request({
					url: this.$global.baseUrl+'/data1/findData1List',
					method: 'POST',
					data: {
						page: this.currentPage,
						size: this.pageSize,
						bike_id:1
					},
					success: (res) => {
						const data = res.data;
						// console.log(data);
						// const data = res.data;
						this.sandl = data.data.records || [];
						const total = Math.ceil(data.data.total/this.pageSize) || 0
						this.totalPage=total*10
						// console.log(this.totalPage);
						this.listValue = Array.from({
							length: total
						}, (v, k) => ({
							name: `第${k + 1}页`,
						}));
						// console.log(this.batteryList1);
						// this.hasMore = data.hasMore || false;
					},
					fail: (error) => {
						console.error('请求失败:', error);
					},
				});
			},
			toggleTable() {
				this.showTable = !this.showTable; // 切换showTable的值来控制表格的显示与隐藏
			},
			toggleTable2() {
				this.showTable = !this.showTable; // 切换showTable的值来控制表格的显示与隐藏
			},
			toggleTable3() {
				this.showIndex = !this.showIndex; // 切换showTable的值来控制表格的显示与隐藏
			},
			getData1() {
				uni.request({
					url: this.$global.baseUrl+"/data1/getData1",
					method: "POST",
					success: (res) => {
						const data1 = res.data.data;
						// this.sandl= data1;
						// console.log('data:',data1);
						// 使用浅拷贝，避免修改原始数据
						const sortedData = [...data1].sort((a, b) => a.id - b.id);
						// console.log('sandl:',this.sandl);
						// 对接收到的数据按ID从小到大排序
						// data1.sort((a, b) => a.id - b.id);
						// this.sandl= data;		
					    // console.log('data:',data1);
						const categories = [];
						const dataSpeed= [];
						const dataLight = [];
			
						sortedData.forEach((item) => {
							categories.push(item.time);
							dataSpeed.push(item.speed);
							dataLight.push(item.light);
						});
			
						this.lineData2 = {
							categories,
							series: [{
									name: '电车速度',
									data: dataSpeed
								},
								{
									name: '光照',
									data: dataLight
								}
							],
						};
						this.$forceUpdate();
					},
					fail: (err) => {
						console.error("获取后端数据出错:", err);
					},
				});
			},
			getData2() {
				uni.request({
					// url: "http://127.0.0.1:3000/data",
					url: this.$global.baseUrl+"/data1/getData2",
					method: "POST",
					success: (res) => {
						const data = res.data.data;
						// this.sandl2= data;
						const sortedData = [...data].sort((a, b) => a.id - b.id);
						// console.log(data);
						// 对接收到的数据按ID从小到大排序
						// data.sort((a, b) => a.id - b.id);
			   //          this.sandl2= data;
						const categories = [];
						const dataSpeed= [];
						const dataLight = [];
			
						sortedData.forEach((item) => {
							categories.push(item.time);
							dataSpeed.push(item.speed);
							dataLight.push(item.light);
						});
			
						this.lineData3 = {
							categories,
							series: [{
									name: '电车速度',
									data: dataSpeed
								},
								{
									name: '光照',
									data: dataLight
								}
							],
						};
						this.$forceUpdate();
					},
					fail: (err) => {
						console.error("获取后端数据出错:", err);
					},
				});
			},
	    },		
		mounted(){
			this.findData1List2()
			this.findData1List()
			this.getData1();
			this.getData2();
			// this.getData3();
			setInterval(() => {
				this.getData1();
				this.getData2();
				this.findData1List2();
				this.findData1List();
				// this.getData3();
			}, 3000);
		}	
	}
</script>
<style scoped lang="scss">
	.title-king {
		color: #63a4ff;
		text-align: center;
		// text-shadow: 0 0 0.1em, 0 0 0.3em;
	}

	.body {
		height: 100vh;
		margin: 0;
		padding: 0 20rpx;
		font-family: 'montserrat';
		background-image: linear-gradient(#83eaf1, #63a4ff);
		background-size: 400%;
		animation: bganimation 15s infinite;
	}

	li {
		list-style-type: none;
	}

	page,
	body {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
	}

	.window {
		height: 100vh;
		overflow: hidden;

		.topLine {
			width: 100%;
		}

		scroll-view {
			box-sizing: border-box;
		}

		.swiper {
			box-sizing: border-box;
		}

		.nav {
			background-size: 100% 100%;

			.back {
				font-size: 54rpx;
				padding: 20rpx 14rpx 15rpx 14rpx;
				color: #fff;
			}

			.title {
				color: #fff;
				font-size: 30rpx;
				flex: 1;
				text-align: center;
			}

			.hidden {
				visibility: hidden;
			}
		}

		.head {
			padding: 0 16rpx 14rpx 16rpx;
			color: #fff;
			background-color: #40a2ed;
			justify-content: space-between;
			font-size: 26rpx !important;

			.calendar_drag {
				width: 340rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.calendar_name {
					margin-right: 10rpx;
				}

				.icon-calendar {
					font-size: 26rpx;
					margin-top: 4rpx;
				}
			}
		}

		.data_body {
			overflow: auto;
			text-align: center;
			color: #333333;
			background-repeat: repeat;
			height: 100%;

			.scroll_list {
				.view_block {
					background-color: #fff;
					padding: 16rpx 20rpx 10rpx 20rpx;
					border-radius: 20rpx;
					margin-bottom: 40rpx;

					.title {
						text-align: left;
						margin-bottom: 30rpx;
						font-size: 30rpx;
					}

					.trend_title {
						text-align: right;
						font-size: 22rpx;
						color: #ff9900;
						margin-top: 50rpx;
					}
				}
			}
		}
	}

	@keyframes bganimation {
		0% {
			background-position: 0% 50%;
		}

		50% {
			background-position: 100% 50%;
		}

		100% {
			background-position: 0% 50%;
		}
	}
</style>