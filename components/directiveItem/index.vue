<template>
  <view class="device-item">
    <u-cell :title="directive.directive_name" :arrow="false">
      <view slot="value" :style="directive.send_type == 2 ? 'flex:1' : ''">
        <!-- 输入框 -->
        <template v-if="directive.send_type == 1">
          <view style="display: flex; align-items: center">
            <u--input placeholder="请输入" border="surround" v-model="inputValue" style="flex: 1; height: 40rpx; margin: 0 40rpx"> </u--input>
            <u-button size="mini" type="primary" text="确定" style="width: 100rpx" @click="confirm2(inputValue)"></u-button>
          </view>
          <!-- <u-button size="mini" type="primary" text="确定" @click="confirm(inputValue)"></u-button> -->
        </template>

        <!-- 滑块 -->
        <template v-if="directive.send_type == 2">
          <view style="display: flex; align-items: center">
            <u-slider v-model="sliderValue" step="0.1" :min="directive.min_value || 0" :max="directive.max_value || 100" showValue style="flex: 1"></u-slider>
            <u-button style="width: 100rpx" size="mini" type="primary" text="确定" @click="confirm3(sliderValue)"></u-button>
          </view>
        </template>

        <!-- 开关 -->
        <template v-if="directive.send_type == 3">
          <u-switch v-model="switchValue" @change="confirm"></u-switch>
        </template>
      </view>
    </u-cell>
  </view>
</template>

<script>
import { sendDirective } from '@/common/api/directive.js'
import { connectionLoop } from '@/common/utils/connectionLoop'
export default {
  props: {
    directive: {
      type: Object,
      default: () => {}
    },
    deviceNumber: {
      type: String
    }
  },
  data() {
    return {
      inputValue: this.directive.default_value || '',
      sliderValue: Number(this.directive.default_value) || 0,
      switchValue: !!Number(this.directive.default_value) || false,
      loopInterval: null
    }
  },
  methods: {
	confirm2(v) {
	  const data1 = {
		  id: 1,
		  light: this.inputValue
	  }
	  uni.request({
	  	url: this.$global.baseUrl + '/default/editDefault',
	  	method: 'POST',
		data: data1,
	  	success: (res) => {
	  		// this.batteryList1 = res.data.data;
	  		const data = res;
	  		console.log(data);
	  	},
	  	fail: (error) => {
	  		console.error('请求失败:', error);
	  	},
	  });
	},  
	confirm3(v) {
	  const data1 = {
		  id: 1,
		  speed: this.sliderValue
	  }
	  uni.request({
	  	url: this.$global.baseUrl + '/default/editDefault',
	  	method: 'POST',
		data: data1,
	  	success: (res) => {
	  		// this.batteryList1 = res.data.data;
	  		const data = res;
	  		console.log(data);
	  	},
	  	fail: (error) => {
	  		console.error('请求失败:', error);
	  	},
	  });
	},  
    confirm(v) {
      this.sendDirective(typeof v === 'boolean' ? (v ? 1 : 0) : v)
    },
    async sendDirective(value) {
      try {
        const res = await sendDirective({
          value,
          number: this.deviceNumber,
          message: this.directive.message,
          id: this.directive.id
        })
        if (res.code === 200) {
          this.$toast.success('成功!')
        } else {
          this.$toast.error('请求失败!')
        }
      } catch (err) {
        connectionLoop({
          reset: () => {
            return this.sendDirective(value)
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.device-item {
  ::v-deep {
    .u-cell__body {
      justify-content: space-between;
      .u-cell__body__content {
        flex: unset !important;
      }
    }
  }
}
</style>
