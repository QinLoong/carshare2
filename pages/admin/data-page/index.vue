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
						<!-- <u-collapse>
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
            </u-collapse> -->
			<u-collapse >
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
						<u-collapse-item name="Docs guide">
							<view slot="title" class="device-title">
								<!-- <u-tag text="电池" plain size="mini" style="margin-right: 20rpx"></u-tag> -->
								<text> 警告列表（共{{alertLength}}条）</text>
							</view>
							<u-table class="uitable">
								<u-tr class="u-tr">
									<u-th class="u-th">ID</u-th>
									<u-th class="u-th">警告信息</u-th>
									<u-th class="u-th">时间</u-th>
						
								</u-tr>
								<u-tr class="u-tr" v-for="item in alertList" :key="item.id">
									<u-td class="u-td">{{ item.id }}</u-td>
									<u-td class="u-td">{{ item.message }}</u-td>
									<u-td class="u-td">{{ item.time }}</u-td>
								</u-tr>
							</u-table>
							<uni-pagination :show-icon="true" :total="totalPage" :current="currentPage"
								@change="sectionChange" />
						</u-collapse-item>
					  </u-collapse>	
					</u-cell-group>	
				</view>
			</template>
		</ScrollTolower>
	</view>
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
				totalPage: 1,
				currentPage: 1,
				alertList: [],
				alertLength:0
			}
		},
		mounted() {
			this.getAllOrder1()
			// n秒请求一次
			// this.interval = setInterval(() => {
			//   this.$refs.scrollTolowerRef.resetRequest()
			// }, this.time)
			this.getAllAlert(),
			setInterval(()=>{
				this.getAllAlert()
			},3000)
		},
		methods: {
			findAlertList() {
				// 向后端请求数据
				uni.request({
					url: this.$global.baseUrl + '/alert/findAlertList',
					method: 'POST',
					data: {
						page: this.currentPage,
						size: this.pageSize
					},
					success: (res) => {
						const data = res.data;
						// console.log(data);
						// const data = res.data;
						this.alertList = data.data.records || [];
						// console.log(this.batteryList1);
						// this.hasMore = data.hasMore || false;
					},
					fail: (error) => {
						console.error('请求失败:', error);
					},
				});
			},
			// 更新分页器的当前页
			sectionChange(index) {
				// console.log(index);
				this.currentPage = index.current;
				// console.log('this.currentValue: ',this.currentValue);
				// 每当分页器的当前页变化时，重新获取数据
				this.findAlertList()
			
			},
			getAllAlert() {
				// 向后端请求数据
				uni.request({
					url: this.$global.baseUrl + '/alert/getAllAlert',
					method: 'POST',
					success: (res) => {
						// this.batteryList1 = res.data.data;
						const data = res.data.data;
						this.alertLength = data.length
						const total = Math.ceil(data.length / this.pageSize)
						// console.log(total);
						this.totalPage = total * 10
						// console.log(this.totalPage);
						this.listValue = Array.from({
							length: total
						}, (v, k) => ({
							name: `第${k + 1}页`,
						}));
						// console.log(this.listValue);
						this.findAlertList();
					},
					fail: (error) => {
						console.error('请求失败:', error);
					},
				});
			},
			getAllOrder1() {
				// 向后端请求数据
				uni.request({
					url: this.$global.baseUrl + '/order1/getAllOrder1',
					method: 'POST',
					success: (res) => {
						// this.batteryList1 = res.data.data;
						this.orderList = res.data.data;
						this.total=this.orderList.length
						console.log(this.orderList);
					},
					fail: (error) => {
						console.error('请求失败:', error);
					},
				});
			},
			async findDataList({
				page,
				size
			}, handleRequest) {
				console.log('3. 数据实时数据更新---')
				try {
					const res = await findDataList({
						page,
						size
					})
					if (res.code === 200) {
						this.total = res.data.total
						const data = res.data.records.map(v => dataDisplay(v))
						console.log(data)
						this.dataList = handleRequest(data, res.data.total)
					} else {
						this.$toast.error('请求失败!')
					}
				} catch (err) {
					this.$toast.error(err)
				}
			}
		},
		destroyed() {
			// clearInterval(this.interval)
			// this.interval = null
		}
	}
</script>
<style lang="scss" scoped>
	.data-record-container {
		height: calc(100vh - 90rpx);
		
        .order-payment {
        	display: flex;
        	align-items: flex-end;
        
        	::v-deep .u-icon__icon,
        	& {
        		color: $uni-color-primary !important;
        	}
        }
		.data-image {
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

		.data-value {
			color: $uni-color-primary;
		}

		::v-deep {
			.u-cell-group__title {
				background: $app-background-grey;
			}
		}
	}
</style>