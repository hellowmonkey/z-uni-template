<template>
	<button :class="btnclass" :form-type="formType" :open-type="openType" :plain="plain" :loading="loading" :disabled="disabled">
		<template v-if="icon">
			<icon :type="icon"></icon>
		</template>
		<slot></slot>
	</button>
</template>

<script>
	const types = ['primary', 'info', 'warning', 'danger', 'default']
	const sizes = ['large', 'small', 'mini', 'default']

	export default {
		props: {
			type: {
				type: String,
				default: 'default',
				validator(value) {
					return types.includes(value)
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
				if(this.size !== 'default'){
					arr.push(`${this.name}-size__${this.size}`)
				}
				if(this.block){
					arr.push(`${this.name}-block`)
				}
				return arr
			}
		},
		mounted() {
		}
	}
</script>

<style>

</style>
