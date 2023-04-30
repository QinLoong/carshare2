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
			</template>        <!-- 指令列表 -->
								<view class="info-box" style="margin-bottom: 20rpx">
									<view class="box-title">数据列表</view>
									<!-- <DirectiveList :directiveList="directiveList.filter(i => i.directive == device.id)"
										:deviceNumber="device.number" @reset="reset"></DirectiveList> -->
									<u-cell-group :border="false" class="cell-group" v-if="device.number==1">
										<u-cell :arrow="false">
											<view slot="title" class="device-title">
												<u-tag type="warning" text="当前车速" plain size="mini"
													style="margin-right: 20rpx"></u-tag>
												<text>{{bike1.speed}} </text>
											</view>
										</u-cell>
										<u-cell :arrow="false">
											<view slot="title" class="device-title">
												<u-tag type="warning" text="当前光照" plain size="mini"
													style="margin-right: 20rpx"></u-tag>
												<text>{{bike1.light}} </text>
											</view>
										</u-cell>
										
									</u-cell-group>
									<u-cell-group :border="false" class="cell-group" v-if="device.number==2">
										<u-cell :arrow="false">
											<view slot="title" class="device-title">
												<u-tag type="warning" text="当前车速" plain size="mini"
													style="margin-right: 20rpx"></u-tag>
												<text>{{bike2.speed}} </text>
											</view>
										</u-cell>
										<u-cell :arrow="false">
											<view slot="title" class="device-title">
												<u-tag type="warning" text="当前光照" plain size="mini"
													style="margin-right: 20rpx"></u-tag>
												<text>{{bike2.light}} </text>
											</view>
										</u-cell>
										
									</u-cell-group>
								</view>
                                				<!-- 子设备列表 -->
								<view class="info-box">
									<view class="box-title">子设备列表</view>
									<u-cell-group :isLink="false" disabled :border="false" v-if="device.battery_id==1">
										<u-cell :arrow="false">
											<view slot="title" class="device-title">
												<u-tag type="error" text="电池编号" plain size="mini"
													style="margin-right: 20rpx"></u-tag>
												<text>{{battery1.number}} </text>
											</view>
										</u-cell>
										<u-cell :arrow="false">
											<view slot="title" class="device-title">
												<u-tag type="primary" text="电池电量" plain size="mini"
													style="margin-right: 20rpx"></u-tag>
												<u-line-progress :percentage="battery1.power*100"
													height="18"></u-line-progress>
											</view>
											<view slot="value">{{battery1.power*100+'%'}}</view>
										</u-cell>
										<u-cell :arrow="false">
											<view slot="title" class="device-title">
												<u-tag type="primary" text="电池电压" plain size="mini"
													style="margin-right: 20rpx"></u-tag>
										        <text>{{battery1.v1+'V'}} </text>
											</view>
										</u-cell>
										<u-cell :arrow="false">
											<view slot="title" class="device-title">
												<u-tag type="primary" text="充放电流" plain size="mini"
													style="margin-right: 20rpx"></u-tag>
										        <text>{{battery1.i+'A'}} </text>
											</view>
										</u-cell>
										<u-cell :arrow="false">
											<view slot="title" class="device-title">
												<u-tag type="primary" text="工作温升" plain size="mini"
													style="margin-right: 20rpx"></u-tag>
										        <text>{{battery1.t+'度'}} </text>
											</view>
										</u-cell>
									</u-cell-group>
									
									
									<u-cell-group :isLink="false" disabled :border="false" v-else>
										<u-cell :arrow="false">
											<view slot="title" class="device-title">
												<u-tag type="error" text="电池编号" plain size="mini"
													style="margin-right: 20rpx"></u-tag>
												<text>{{battery2.number}} </text>
											</view>
										</u-cell>
										<u-cell :arrow="false">
											<view slot="title" class="device-title">
												<u-tag type="primary" text="电池电量" plain size="mini"
													style="margin-right: 20rpx"></u-tag>
												<u-line-progress :percentage="battery2.power*100"
													height="18"></u-line-progress>
											</view>
											<view slot="value">{{battery2.power*100+'%'}}</view>
										</u-cell>
										<u-cell :arrow="false">
											<view slot="title" class="device-title">
												<u-tag type="primary" text="电池电压" plain size="mini"
													style="margin-right: 20rpx"></u-tag>
										        <text>{{battery2.v1+'V'}} </text>
											</view>
										</u-cell>
										<u-cell :arrow="false">
											<view slot="title" class="device-title">
												<u-tag type="primary" text="充放电流" plain size="mini"
													style="margin-right: 20rpx"></u-tag>
										        <text>{{battery2.i+'A'}} </text>
											</view>
										</u-cell>
										<u-cell :arrow="false">
											<view slot="title" class="device-title">
												<u-tag type="primary" text="工作温升" plain size="mini"
													style="margin-right: 20rpx"></u-tag>
										        <text>{{battery2.t+'度'}} </text>
											</view>
										</u-cell>
									</u-cell-group>
								</view>
                                <u-collapse-item name="Docs guide">
								<view slot="title" class="device-title">
									<u-tag text="电池" plain size="mini" style="margin-right: 20rpx"></u-tag>
									<text> 实时电池数据</text>
								</view>
								<u-table class="uitable">
									<u-tr class="u-tr">
										<u-th class="u-th">电池ID</u-th>
										<u-th class="u-th">电量</u-th>
										<u-th class="u-th">工作温升</u-th>
										<u-th class="u-th">电压</u-th>
										<u-th class="u-th">充放电流</u-th>
										<u-th class="u-th">实时</u-th>
										<u-th class="u-th" width="128rpx">时间</u-th>

									</u-tr>
									<u-tr class="u-tr" v-for="item in batteryList1" :key="item.id">
										<u-td class="u-td">{{ item.number }}</u-td>
										<u-td class="u-td">{{ item.power*100+'%' }}</u-td>
										<u-td class="u-td">{{ item.t }}</u-td>
										<u-td class="u-td">{{ item.v1 }}</u-td>
										<u-td class="u-td">{{ item.i }}</u-td>
										<u-td class="u-td">{{ item.real_time }}</u-td>
										<u-td class="u-td">{{ item.ctime }}</u-td>
									</u-tr>
								</u-table>
								<uni-pagination :show-icon="true" :total="totalPage" :current="currentPage"
									@change="sectionChange" />
							</u-collapse-item>
		</ScrollTolower>
                    </view>
                    <!-- 添加设备 -->
		<u-popup :show="newDevice.show" @close="newDeviceClose">
			<view class="popup-box">
				<view class="popup-title">添加设备：</view>
				<u-line></u-line>

				<view class="search-box">
          <text class="search-title">设备类型</text>
          <u-radio-group v-model="newDevice.type" placement="column" style="margin-top: 20rpx" size="34" @change="newDeviceTypeChange">
            <u-radio :customStyle="{ margin: '8px' }" v-for="item in deviceType.slice(0,1)" :key="item.status" :label="item.name" :name="item.status"> </u-radio>
          </u-radio-group>
        </view>

				<view class="search-box">
					<text class="search-title">设备名称</text>
					<u--input placeholder="请输入设备名称" maxlength="15" style="margin-top: 20rpx" border="surround"
						v-model="newDevice.deviceName" />
				</view>
				<view class="search-box" v-if="newDevice.type !== '2'">
					<text class="search-title">设备编号</text>
					<u--input placeholder="请输入设备编号" maxlength="15" style="margin-top: 20rpx" border="surround"
						v-model="newDevice.number" />
				</view>
				<view class="search-box" v-if="newDevice.type === '1'">
					<text class="search-title">初始位置</text>
					<u-radio-group v-model="newDevice.location" placement="column" style="margin-top: 10px" size="34">
						<u-radio :customStyle="{ margin: '8px' }" v-for="(item, index) in locations" :key="index"
							:label="item" :name="item"> </u-radio>
					</u-radio-group>
				</view>
				<view class="search-box" v-if="newDevice.type == '1'">
					<text class="search-title">电池编号</text>
					<u--input placeholder="请输入电池编号" maxlength="15" style="margin-top: 20rpx" border="surround"
						v-model="newDevice.batteryNumber" />
				</view>
				<view style="display: flex; margin-top: 20rpx">
					<u-button style="width: 140rpx" plain type="warning" size="small"
						@click="newDeviceClose">取消</u-button>
					<u-button style="width: 140rpx" plain type="success" size="small" @click="addDevice">确认</u-button>
				</view>
			</view>
		</u-popup>
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