<template>
	<view class="content">
		<view class="">button</view>
		<z-button color="primary">按钮</z-button>
		<z-button color="primary" plain>按钮</z-button>
		<z-button color="primary" radius>按钮</z-button>
		<z-button color="primary" round>按钮</z-button>
		<z-button color="primary" size="small">按钮</z-button>
		<z-button color="success">按钮</z-button>
		<z-button color="primary" disabled>按钮</z-button>
		<z-button color="primary" loading block>按钮</z-button>
		<view class="">tag</view>
		<z-tag>标签</z-tag>
		<z-tag color="primary">标签</z-tag>
		<z-tag color="primary" plain>标签</z-tag>
		<z-tag color="warning" size="small">标签</z-tag>
		<view>Cell</view>
		<z-cell title="单元格" value="哈哈哈"></z-cell>
		<z-cell title="单元格" :is-link="false"></z-cell>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	components: {},
	onLoad() {
		this.$actionSheet(['你好', '再见'])
			.then(data => {
				console.log(data);
			})
			.catch(e => {
				console.log(e);
			});
	},
	methods: {
		handleTap(e) {
			console.log(e);
		}
	}
};
</script>

<style></style>
