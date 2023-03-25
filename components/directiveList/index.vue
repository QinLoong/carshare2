<template>
  <view class="device-list">
    <u-cell-group :border="false" class="cell-group">
      <DirectiveItem v-for="directive in directiveList" :key="directive.id" :directive="directive" :deviceNumber="deviceNumber" @reset="reset"/>
    </u-cell-group>
  </view>
</template>

<script>
import DirectiveItem from '@/components/directiveItem/index.vue'
export default {
  components: {
    DirectiveItem
  },
  props: {
    directiveList: {
      type: Array,
      default: () => []
    },
    deviceNumber: {
      type: String,
    }
  },
  data() {
    return {}
  },
  methods: {
    reset() {
      this.$emit('reset')
    }
  }
}
</script>

<style lang="less" scoped>
.device-list-container {
}
</style>
