<template>
	<view :class="tagclass" :plain="plain"><slot></slot></view>
</template>

<script>
const colors = ['primary', 'info', 'warning', 'danger', 'default'];
const sizes = ['large', 'small', 'default'];

export default {
	props: {
		color: {
			type: String,
			default: 'default',
			validator(value) {
				return colors.includes(value);
			}
		},
		size: {
			type: String,
			default: 'default',
			validator(value) {
				return sizes.includes(value);
			}
		},
		plain: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			name: 'z-tag'
		};
	},
	computed: {
		tagclass() {
			const arr = [this.name];
			if (this.size !== 'default') {
				arr.push(`size-${this.size}`);
			}
			if (this.color !== 'default') {
				arr.push(`color-${this.color}`);
			}
			if (this.plain) {
				arr.push(`${this.name}-plain`);
			}
			return arr;
		}
	},
	mounted() {}
};
</script>

<style></style>
