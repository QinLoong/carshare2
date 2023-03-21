<template>
	<view class="u-table" :style="[tableStyle]">
		<slot />
	</view>
</template>

<script>
	import props from './props.js';
	/**
	 * Table 表格 
	 * @description 表格组件一般用于展示大量结构化数据的场景 本组件标签类似HTML的table表格，由table、tr、th、td四个组件组成
	 * @tutorial https://www.uviewui.com/components/table.html
	 * @example <u-table><u-tr><u-th>学校</u-th </u-tr> <u-tr><u-td>浙江大学</u-td> </u-tr> <u-tr><u-td>清华大学</u-td> </u-tr></u-table>
	 */
	export default {
		name: 'u-table',
		props: {
			borderColor: {
				type: String,
				default: '#e4e7ed'
			},
			align: {
				type: String,
				default: 'center'
			},
			// td的内边距
			padding: {
				type: String,
				default: '10rpx 6rpx'
			},
			// 字体大小
			fontSize: {
				type: [String, Number],
				default: 28
			},
			// 字体颜色
			color: {
				type: String,
				default: '#606266'
			},
			// th的自定义样式
			thStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// table的背景颜色
			bgColor: {
				type: String,
				default: '#ffffff'
			}
		},
		mixins: [uni.$u.mpMixin, uni.$u.mixin,props],
		data() {
			return {
				
			}
		},
		computed: {
			tableStyle() {
				let style = {};
				style.borderLeft = `solid 1px ${this.borderColor}`;
				style.borderTop = `solid 1px ${this.borderColor}`;
				style.backgroundColor = this.bgColor;;
				return style;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/components.scss";
	
	.u-table {
		width: 100%;
		box-sizing: border-box;
	}
</style>
