<template>
	<view class="z-cell d-flex align-items-center justify-between" :hover-class="isLink ? 'hover' : 'none'">
		<view class="d-flex align-items-center z-cell-left">
			<icon :type="icon" class="mar-r-1"></icon>
			<text v-if="title && !$slots.default">{{ title }}</text>
			<slot></slot>
		</view>
		<view class="d-flex align-items-center z-cell-right">
			<text v-if="value && !$slots.value">{{ value }}</text>
			<slot name="value"></slot>
      <text class="z-iconfont mar-l-1" v-if="isLink">&#xe694;</text>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		title: String,
		icon: String,
		isLink: {
			type: Boolean,
			default: true
		},
		value: String
	}
};
</script>

<style></style>
