<template>
  <view class="direct">
    <u-cell-group :border="false" class="cell-group">
      <DirectiveList :directiveList="directiveList.filter(i => i.directive == device.id)" :deviceNumber="device.number" @reset="findDirectiveList"></DirectiveList>
    </u-cell-group>
  </view>
</template>

<script name="DirectPage">
import DirectiveList from '@/components/directiveList/index.vue'
import { findDirectiveList } from '@/common/api/directive.js'
export default {
  components: {
    DirectiveList
  },
  props: {
    device: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      directiveList: []
    }
  },
  mounted() {
    this.findDirectiveList()
  },
  methods: {
    async findDirectiveList() {
      try {
        const res = await findDirectiveList()
        if (res.code === 200) {
          this.directiveList = res.data.records
        } else {
          this.$toast.error('请求失败!')
        }
      } catch (err) {
        this.$toast.error(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.direct {
  .cell-group {
    box-sizing: border-box;
    background-color: #fff;
    margin: 20rpx 20rpx;
    padding: 10rpx 15rpx;
    border-radius: 20rpx;
  }
}
</style>
