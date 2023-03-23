<template>
  <view>
    <u-cell-group :border="false" class="cell-group">
      <u-cell v-for="meta in info" :title="meta.name" :value="meta.value" :title-width="180" :arrow="false"></u-cell>
    </u-cell-group>
  </view>
</template>
<script name="dataInfo">
import { dataOptions } from '@/common/utils/dict.js'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    whileDict: {
      type: Array,
      default: () => ['D1']
    },
  },
  data() {
    return {
      dataOptions,
    }
  },
  computed: {
    info() {
      return this.transformData(this.data)
    }
  },
  methods: {
    transformData(data) {
      const options = []
      Object.keys(data).forEach(key => {
        if(this.whileDict.includes(key)) return 
        if (this.dataOptions[key]) {
          options.push({
            name: dataOptions[key],
            value: data[key]
          })
        }
      })
      return options
    }
  }
}
</script>
<style lang="scss" scoped>
  .info {
    display: flex;
    height: 60rpx;
    align-items: center;
    justify-content: space-between;
    padding: 0 20rpx;
    .info-name {
      width: 260rpx;
    }
  }
</style>
