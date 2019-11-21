<template>
	<button :class="btnclass" :form-type="formType" :open-type="openType" :plain="plain" :loading="loading" :disabled="disabled || loading">
		<icon :type="icon" v-if="icon"></icon>
		<slot></slot>
	</button>
</template>

<script>
	const colors = ['primary', 'info', 'warning', 'danger', 'default']
	const sizes = ['large', 'small', 'mini', 'default']

	export default {
		props: {
			color: {
				type: String,
				default: 'default',
				validator(value) {
					return colors.includes(value)
				}
			},
			size: {
				type: String,
				default: 'default',
				validator(value) {
					return sizes.includes(value)
				}
			},
			block: {
				type: Boolean,
				default: false
			},
			plain: {
				type: Boolean,
				default: false
			},
			radius: {
				type: Boolean,
				default: false
			},
			round: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			},
			'formType': String,
			'openType': String,
			icon: String
		},
		data() {
			return {
				name: 'z-button'
			};
		},
		computed: {
			btnclass() {
				const arr = [this.name]
				if (this.size !== 'default') {
					arr.push(`size-${this.size}`)
				}
				if (this.color !== 'default') {
					arr.push(`color-${this.color}`)
				}
				if (this.block) {
					arr.push('full-width')
				}
				if (this.plain) {
					arr.push(`${this.name}-plain`)
				}
				if (this.radius) {
					arr.push(`${this.name}-radius`)
				}
				if (this.round) {
					arr.push(`${this.name}-round`)
				}
				return arr
			}
		},
		mounted() {}
	}
</script>

<style>

</style>
