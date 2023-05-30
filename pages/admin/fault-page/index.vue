<template>
    <view class="fault-record-container">
      <ScrollTolower ref="scrollTolowerRef" @request="findFaultList" :loadmoreMarginTop="20" :loadmoreMarginBottom="20">
        <template slot="main">
          <view class="fault-image">
            <image src="@/static/images/data-page/fault.svg"></image>
          </view>
          <view class="fault-list">
            <u-cell-group :title="`查询列表`" :border="false">
              <u-cell v-for="fault in faultList" :title="`【${fault.A1}】${vStatus[fault.D1]}`" :label="$format(fault.ctime)" titleStyle="color:#f56c6c">
              </u-cell>
            </u-cell-group>
            <view class="card">
              <u-cell-group :border="false">
                <u-cell v-for="cell in cellList" :key="cell.title" size="large" iconStyle="margin-right:12rpx" :border="false" isLink :icon="cell.icon" :title="cell.title" @click="changeRoute(cell)" />
              </u-cell-group>
            </view>
          </view>
        </template>
      </ScrollTolower>
    </view>
  </template>
  <script name="faultRecord">
  import { findDataList } from '@/common/api/data.js'
  import { vStatus, dataDisplay } from '@/common/utils/dict.js'
  export default {
    data() {
      return {
        vStatus,
        faultList: [],
        total: '-',
        interval: null,
        time: 5000,
        cellList: [
          {
            icon: 'coupon',
            title: '光照速度查询',
            url: '/pages/admin/fault-page/bike-page/index'
          },
          {
            icon: 'coupon',
            title: '电池数据查询',
            url: '/pages/admin/fault-page/battery-page/index'
          },
          {
            icon: 'coupon',
            title: '用户订单查询',
            url: '/pages/admin/fault-page/order-page/index'
          },
          ]
      }
    },
    mounted() {

    },
    methods: {
        async findFaultList({ page, size }, handleRequest) {
      console.log('4. 故障实时数据更新---');
      try {
        const res = await findDataList({ page, size, type: '1' })
        if (res.code === 200) {
          this.total = res.data.total
          const data = res.data.records.map(v => dataDisplay(v))
          console.log(data);
          this.faultList = handleRequest(data, res.data.total)
        } else {
          this.$toast.error('请求失败!')
        }
      } catch (err) {
        this.$toast.error(err)
      }
    },
  },
  destroyed() {
    // clearInterval(this.interval)
    // this.interval = null
  }
  }
  </script>