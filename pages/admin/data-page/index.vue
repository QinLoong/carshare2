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
			
	}
}
</script>
