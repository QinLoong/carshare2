<template>
	<view class="u-tr">
		<slot></slot>
	</view>
</template>

<script>
	import props from './props.js';
	/**
	 * Tr  
	 * @description 
	 * @tutorial url
	 * @property {String}
	 * @event {Function}
	 * @example
	 */
	export default {
		name: 'u-tr',
		mixins: [uni.$u.mpMixin, uni.$u.mixin,props],
		data() {
			return {
				
			}
		}
	}
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
	.u-tr {
		@include vue-flex;
	}
</style>
