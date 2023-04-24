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
            </u-cell-group>
				</view>
			</template>
		</ScrollTolower>
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
</u-collapse>
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
			}
		},