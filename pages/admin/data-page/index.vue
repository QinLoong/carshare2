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
			}
		},