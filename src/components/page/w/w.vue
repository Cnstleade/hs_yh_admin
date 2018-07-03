<template>
	<div class="myQR">
		<vue-q-art :config="config"></vue-q-art>
		<vue-qr :bgSrc='config.imagePath' :logoSrc="config.imagePath" :text="config.value" :size="200" :margin="0"></vue-qr>
		<vue-qr :logoSrc="config.imagePath" :text="config.value" :size="200" :margin="0"></vue-qr>
	</div>
</template>

<script>
	import VueQArt from 'vue-qart'
	import VueQr from 'vue-qr'
	export default {
		name: 'myQR',
		data() {
			return {
				config: {
					value: 'https://www.haozhangfu.cn/api/pop/weixin/15353535353/WDQB53',
					imagePath: require('../../../../static/img/img.jpg'),
					filter: 'color'
				}
			}
		},
		components: {
			VueQArt,
			VueQr
		}
	}
</script>

<style >
	.myQR{
		text-align: center;
	}
</style>