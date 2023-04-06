<template>
	<u-cell-group :border="false" class="cell-group">
		<template v-if="!(isNow && nowDevice.data)">
			<u-cell title="初始位置" :value="device.location" :title-width="180" :arrow="false"></u-cell>
			<!-- <template v-if="device.battery">
        <u-cell title="电池编号" :value="device.battery.number" :title-width="180" :arrow="false"></u-cell>
        <u-cell title="电池状态" :value="dictDisplay(batteryStatus, device.battery.status)" :title-width="180" :arrow="false"></u-cell>
        <u-cell title="电池电量" :value="device.battery.power ? `${device.battery.power}%` : ''" :title-width="180" :arrow="false"></u-cell>
      </template> -->
			<view v-if="device.battery_id== parseInt(battery1.number)">
				<u-cell title="电池编号" :value="battery1.number" :title-width="180" :arrow="false"></u-cell>
				<u-cell title="电池电量" :value="battery1.power*100+`%`" :title-width="180" :arrow="false"></u-cell>
				<u-line-progress :percentage="battery1.power*100" height="18" style="margin-bottom: 20rpx;"></u-line-progress>
			</view>
			<view v-else-if="device.battery_id== parseInt(battery2.number)">
				<u-cell title="电池编号" :value="battery2.number" :title-width="180" :arrow="false"></u-cell>
				<u-cell title="电池电量" :value="battery2.power*100+`%`" :title-width="180" :arrow="false"></u-cell>
				<u-line-progress :percentage="battery2.power*100" height="18" style="margin-bottom: 20rpx;"></u-line-progress>
			</view>
			<view class="clock">
				<u-button type="error" text="开锁" v-if="showOpen==1" @click="openBike(device.number)"></u-button>
				<u-button type="warning" text="还车" v-else @click="exitDevice(device.number)"></u-button>
			</view>
		</template>
		<dataInfo v-else :data="nowDevice.data"></dataInfo>
	</u-cell-group>
</template>
<script>
	import { findBikeDetail} from '@/common/api/device.js'
	import {
		dictDisplay,
		batteryStatus,
		dataDisplay
	} from '@/common/utils/dict'
	import {
		findDataList
	} from '@/common/api/data.js'
	import dataInfo from '@/components/data-info/index.vue'
	export default {
		components: {
			dataInfo
		},
		props: {
			device: {
				type: Object
			}
		},
		data() {
			return {
				loginInfo: {},
				showOpen: '1',
				battery1: {},
				battery2: {},
				batteryStatus,
				time: 1000,
				interval: null,
				nowDevice: this.device
			}
		},
		// onUnload(){
		// uni.$off('user') 
		// },
		onLoad() {

		},
		computed: {
			isNow() {
				return this.device.status == '1'
			}
		},
		watch: {
			// 如果现在正在骑行，则每秒拉一次最新数据
			isNow(v) {
				if (!v) {
					if (this.interval) {
						clearInterval(this.interval)
						this.interval = null
					}
					return
				}
				this.interval = setInterval(() => {
					this.findDataList()
				}, this.time)
			}
		},
		mounted() {
			//拿到用户名  
			var app = getApp();
			this.loginInfo = app.globalData;
			// console.log(app.globalData);  
			this.getBattery2(),
				this.getBattery3()
			// setInterval(()=>{
			// 	this.getBattery2(),
			// 	this.getBattery3()
			// },3000)
		},
		methods: {
			//租车
			openBike(number) {

				console.log(this.loginInfo);
				const data1 = {
					user_name: this.loginInfo.userPhone,
					bike_number: number,
				}
				uni.request({
					url: this.$global.baseUrl + '/order1/addOrder1',
					method: 'POST',
					data: data1,
					success: (res) => {
						console.log(res.data);
					},
					fail: (error) => {
						console.error('请求失败:', error);
					},
				});
				this.showOpen = '2',
				uni.setStorageSync('showTabar',1)
			},
			//还车
			exitDevice(number) {
				console.log(this.loginInfo);
				const data1 = {
					user_name: this.loginInfo.userPhone,
					bike_number: number,
				}
				uni.request({
					url: this.$global.baseUrl + '/order1/exitDevice',
					method: 'POST',
					data: data1,
					success: (res) => {
						console.log(res.data);
					},
					fail: (error) => {
						console.error('请求失败:', error);
					},
				});
				this.showOpen = '1',
				uni.setStorageSync('showTabar','2')
			},
			getBattery2() {
				// 向后端请求数据
				uni.request({
					url: this.$global.baseUrl + '/battery/getBattery2',
					method: 'GET',
					success: (res) => {
						// this.batteryList1 = res.data.data;
						const data = res.data.data;
						this.battery1 = data[0]
					},
					fail: (error) => {
						console.error('请求失败:', error);
					},
				});
			},
			getBattery3() {
				// 向后端请求数据
				uni.request({
					url: this.$global.baseUrl + '/battery/getBattery3',
					method: 'GET',
					success: (res) => {
						// this.batteryList1 = res.data.data;
						const data = res.data.data;
						// console.log(data);
						this.battery2 = data[0]
						// this.battery2.number +=39
						// console.log(this.battery2);
					},
					fail: (error) => {
						console.error('请求失败:', error);
					},
				});
			},
			dictDisplay,
			async findDataList() {
				console.log('2. 电车实时数据更新---');
				try {
					const res = await findDataList({
						field1: this.device.number,
						page: 1,
						size: 1
					})
					if (res.code === 200) {
						this.nowDevice = {
							number: this.device.number,
							data: dataDisplay((res.data.records.length && res.data.records[0]) || {})
						}
					} else {
						this.$toast.error('请求失败!')
					}
				} catch (err) {
					this.$toast.error(err)
				}
			}
		},
		destroyed() {
			clearInterval(this.interval)
			this.interval = null
		}
	}
</script>