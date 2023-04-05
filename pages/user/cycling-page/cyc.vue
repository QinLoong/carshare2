<template>
  <view class="cyc">
    <view style="display: flex">
      <image class="cyc-images" src="@/static/images/my-page/bike.svg"></image>
      <view class="cyc-name">
        <span>{{ cyc.device_name }}</span
        ><br />
        <span class="cyc-other">电车编号: {{ cyc.number }}</span>
      </view>
    </view>
    <view v-if="showStatus">
      <!--  1-开启，2-关闭，3-待机，4-有异常 -->
    <!-- <u-button v-if="cyc.status === '2'" size="small" type="success" plain hairline text="可骑行" @click="navTo('2')"></u-button>
      <u-button v-if="cyc.status === '1'" size="small" type="primary" plain hairline text="骑行中" @click="navTo('1')"></u-button>
      <u-button v-if="cyc.status === '3'" size="small" type="warning" plain hairline text="锁车中" @click="navTo('3')"></u-button>
      <u-button v-if="cyc.status === '4'" size="small" type="error" plain hairline text="故障" @click="navTo('4')"></u-button> -->
    <view v-if="cyc.number === '1'">
        <u-button v-if="cycStatus.length && cycStatus[0].status === '2'" size="small" type="success" plain hairline text="可骑行" @click="navTo('2')"></u-button>
        <u-button v-else-if="cycStatus.length && cycStatus[0].status === '1'" size="small" type="primary" plain hairline text="骑行中" @click="navTo('1')"></u-button>
        <u-button v-else-if="cycStatus.length && cycStatus[0].status === '4'" size="small" type="error" plain hairline text="故障" @click="navTo('4')"></u-button>
	</view>
    <view v-else>
        <u-button v-if="cycStatus.length && cycStatus[1].status === '2'" size="small" type="success" plain hairline text="可骑行" @click="navTo('2')"></u-button>
        <u-button v-else-if="cycStatus.length && cycStatus[1].status === '1'" size="small" type="primary" plain hairline text="骑行中" @click="navTo('1')"></u-button>
        <u-button v-else-if="cycStatus.length && cycStatus[1].status === '4'" size="small" type="error" plain hairline text="故障" @click="navTo('4')"></u-button>
	</view>
	</view>
  </view>
</template>

<script name="CycPage">
export default {
  props: {
    cyc: {
      type: Object,
      required: true
    },
    showStatus: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
		cycStatus: []
	}
  },
  mounted() {
  	this.getBikeStatus(),
	setInterval(()=>{
		this.getBikeStatus()
	},1000)
  },
  methods: {
	getBikeStatus(){
		uni.request({
			url: this.$global.baseUrl + '/device/getBikeStatus',
			method: 'POST',
			success: (res) => {
				this.cycStatus = res.data.data;
				// console.log(this.cycStatus);
			},
			fail: (error) => {
				console.error('请求失败:', error);
			},
		});
	},  
    navTo(status) {
      this.$emit('navTo')
    }
  }
}
</script>

<style lang="scss" scoped>
.cyc {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px 30rpx;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
  align-items: center;
  margin: 20rpx 20rpx;
  padding: 10rpx 15rpx;
  border-radius: 20rpx;
  border-left: 4px solid $color1;
  .cyc-images {
    width: 80rpx;
    height: 80rpx;
    margin-right: 10px;
    padding: 6px;
    border: 1px solid rgb(222, 221, 221);
    border-radius: 50%;
  }

  .cyc-name {
    font-size: 32rpx;
    color: #000000;

    span {
    }

    .cyc-other {
      font-size: 26rpx;
      color: #999999;
      font-weight: normal;
    }
  }
}
</style>
