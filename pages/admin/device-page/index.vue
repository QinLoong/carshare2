<template>
	<view class="device-record-container">
        <ScrollTolower ref="scrollTolowerRef" @request="findDeviceList" :loadmoreMarginTop="20"
			:loadmoreMarginBottom="20" :loadSize="1000">
			<template slot="main">
				<view class="device-image">
					<image src="@/static/images/device-page/device.svg"></image>
				</view>
				<view class="device-list">
					<u-cell-group title="设备列表" :border="false">
						<view slot="title">
							<text>设备列表</text>
							<!-- 添加设备 -->
							<u-button style="width: 160rpx; float: right" icon="plus" plain type="primary" size="mini"
								@click="newDeviceOpen()">添加设备</u-button>
							<!-- 筛选 -->
							<!-- <u-button style="width: 120rpx; float: right;margin-right: 10rpx;" icon="coupon" plain type="primary" size="mini" @click="filterDevice.show = true">筛选</u-button> -->
						</view>
                    </u-cell-group>
				</view>
                <u-collapse-item v-for="device in filterDeviceList" :key="device.id + device.type"
								:isLink="device.type !== '2'" :disabled="device.type === '2'">
								<view slot="title" class="device-title">
									<u-tag
										:type="dictDisplay(deviceType, device.type, (keys = { label: 'type', value: 'status' }))"
										:text="dictDisplay(deviceType, device.type)" plain size="mini"
										style="margin-right: 20rpx"></u-tag>
									<text>
										{{ device.number ? `${device.device_name}（${device.number}）` : device.device_name }}</text>
								</view>

								<!-- 父设备信息 -->
								<view class="info-box" style="margin-bottom: 20rpx">
									<!-- 添加子设备 -->
									<u-button v-if="device.type === '1'" style="width: 160rpx; width: 80px; margin: 0; float: right" plain type="success" size="mini" @click="subDeviceOpen(device.id)">添加子设备</u-button>
									<u-button v-if="device.type === '1'"
										style="width: 160rpx; width: 80px; margin: 0; float: right" plain type="error"
										size="mini" @click="delBike(device.id)">删除设备</u-button>
									<view class="box-title">设备信息</view>
									<u-cell-group :border="false" class="cell-group">
										<u-cell title="设备名" :value="device.device_name" :arrow="false"></u-cell>
										<u-cell title="编号" :value="device.number" :arrow="false"></u-cell>
										<u-cell :value="device.location" :arrow="false">
											<view slot="title">
												<text>位置</text>
												<!-- <u-tag  text="修改位置" plain size="mini" type="warning"  @click="showPopUp = true">
												</u-tag> -->
												<u-button type="success" plain size="mini" @click="fixGps(device.id)"
													style="width: 5px;margin-top: -15px;margin-right: 5px;">修改</u-button>
											</view>
										</u-cell>
										<u-cell title="设备状态" :value="geDictDisplay(device)" :arrow="false"></u-cell>
										<u-cell title="开关设备" :arrow="false">
											<view slot="value" class="u-slot-value">
												<!-- <u-switch v-model="openDevice" active-color="#13ce66" inactive-color="#ff4949" @change="controlDevice(device)"></u-switch> -->
												<view>
													<u-button size="mini" type="primary"
														style="margin-left: -130rpx;margin-bottom: -50rpx;"
														@click="open1(device)">开启</u-button>
												</view>
												<view>
													<u-button size="mini" type="error" style="margin-top: 7rpx;"
														@click="close1(device)">关闭</u-button>
												</view>

											</view>
										</u-cell>
										<u-cell title="创建时间" :value="$format(device.ctime)" :arrow="false"></u-cell>
									</u-cell-group>
								</view>
			</template>
		</ScrollTolower>
                    </view>
                </template>
                <script name="deviceRecord">
                import {
                    findDeviceList,
                    unbindDevice,
                    addSubDevice,
                    addDevice,
                    addBike,
                    delBike
                } from '@/common/api/device.js'
                import {
                    findDirectiveList
                } from '@/common/api/directive.js'
                import {
                    locations,
                    deviceType,
                    bikeStatus,
                    batteryStatus,
                    dictDisplay
                } from '@/common/utils/dict.js'
                import DirectiveList from '@/components/directiveList/index.vue'
            
                export default {
                    components: {
                        DirectiveList
                    },
                    data() {
                        return {
                            locations,
				deviceList: [],
				subDevice: {
					show: false,
					value: null,
					parentId: ''
				},
				newDevice: {
					show: false,
					number: '',
					deviceName: '',
					location: 'GPS01',
					batteryNumber: '',
					type: '1'
				},
				filterDevice: {
					show: false,
					fn: v => v.filter(i => i.type == '1')
				},
				directiveList: [],
				openDevice: false
			}
		},
    }
</script>