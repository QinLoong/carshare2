<template>
  <view class="u-td" :style="[tdStyle]">
    <slot></slot>
  </view>
</template>

<script>
import props from './props.js';
export default {
  name: "u-td",
  props: {
    width: {
      type: [Number, String],
      default: 'auto'
    },
    fontsize: { // 1. 添加fontsize属性
      type: [Number, String],
      default: 28
    }
  },
  data() {
    return {
      tdStyle: {},
    };
  },
  created() {
    this.parent = false;
  },
  mounted() {
    this.parent = this.$u.$parent.call(this, 'u-table');
    if (this.parent) {
      let style = {};
      if (this.width !== "auto") style.flex = `0 0 ${this.width}`;
      style.textAlign = this.parent.align;
      style.fontSize = this.fontsize + 'rpx'; // 2. 使用fontsize属性值
      style.padding = this.parent.padding;
      style.borderBottom = `solid 1px ${this.parent.borderColor}`;
      style.borderRight = `solid 1px ${this.parent.borderColor}`;
      style.color = this.parent.color;
      this.tdStyle = style;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/components.scss";
// 定义混入指令，用于在非nvue环境下的flex定义，因为nvue没有display属性，会报错
	@mixin vue-flex($direction: row) {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: $direction;
		/* #endif */
	}

.u-td {
  @include vue-flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-self: stretch;
  box-sizing: border-box;
  height: 100%;
}
</style>
