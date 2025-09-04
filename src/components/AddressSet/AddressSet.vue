<template>
	<div class="myaddress">
		<div v-for="(item, index) in addressList" :key="index" class="order_address">
			<div class="address_box">
				<div class="weizhi_icon">
					<text class="iconfont icon-dizhi" :style="'color:' + colors"></text>
				</div>
				<div @click="onsetAddress(item)">
					<div class="center">
						<div class="moren" v-if="item.isdefult">
							<text class="iconfont icon-moren" :style="'color:' + colors"></text>
						</div>
						<div class="name">
							<text class="text1">{{ item.name }}</text>
							<text class="phones">{{ item.phone }}</text>
						</div>
						<div class="address_name">{{ item.address }} {{ item.moreAddres }}</div>
					</div>
				</div>
				<div class="caozuo">
					<div class="del" @click="delAddress(item, index)">
						<text class="iconfont icon-shanchu"></text>
						删除
					</div>
					<div class="edit" @click="editAddress(item)">
						<text class="iconfont icon-bianji"></text>
						编辑
					</div>
				</div>

			</div>
		</div>

	</div>
</template>


<script setup>
	import { ref, defineEmits } from 'vue';

	const props = defineProps({
		colors: {
			type: String,
		},
		addressList: {
			type: Array,
		},
	});

	const emit = defineEmits(['chooseClick', 'editClick']);

	const editAddress = (item) => {
		console.log(item);
		emit('editClick', item);
	};

	const onsetAddress = (item) => {
		emit('chooseClick', item);
	};

	const delAddress = (item, index) => {
		console.log(item, index);
		props.addressList.splice(index, 1);
	};
</script>

<style scoped>
	/*每个页面公共css */
	@import "./icon.css";

	.myaddress {
		padding: 5px 4%;
		padding-bottom: 73px;
		margin-top: 5px;
	}

	.order_address {
		height: 94px;
		width: 100%;
		background-color: #fff;
		border-radius: 5px;
		position: relative;
		box-shadow: 0px 0px 5px #ddd;
		margin-bottom: 10px;
	}

	.order_address image {
		width: 100%;
		height: 100%;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
	}

	.address_box {
		width: 100%;
		height: 100%;
		display: block;
		z-index: 10;
		box-sizing: border-box;
		padding: 10px;
		display: flex;
		align-items: center;
	}

	.weizhi_icon text {
		font-size: 21px;
		margin-left: 5px;
	}

	.address_box .center {
		margin-left: 10px;
	}

	.address_box .center .name {
		height: 31px;
		line-height: 31px;
	}

	.address_box .center .name .text1 {
		font-size: 14px;
		font-weight: bold;
		color: #333;
		display: inline-block;
		margin-right: 10px;
	}

	.phones {
		font-size: 12px;
		color: #999;
		z-index: 0;
	}

	.address_box .address_name {
		font-size: 14px;
		font-weight: bold;
		color: #333;
	}

	.noaddress {
		margin-left: 21px;
		font-weight: bold;
		color: #333;
		font-size: 14px;
	}

	.caozuo {
		position: absolute;
		right: 10px;
		display: flex;
		top: 10px;
	}

	.caozuo div {
		font-size: 12px;
		color: #666;
		margin-left: 16px;
	}

	.caozuo div text {
		font-size: 12px;
	}

	.moren {
		position: absolute;
		top: 0;
		left: 0;
	}

	.moren text {
		font-size: 31px;
	}
</style>