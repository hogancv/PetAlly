<template>
	<div class="wrap">
		<div class="top">
			<div class="item">
				<div class="left">收货人</div>
				<t-input v-model="name" placeholder="请填写收货人姓名" />
			</div>
			<div class="item">
				<div class="left">手机号码</div>
				<t-input v-model="phone" type="number" placeholder="请填写收货人手机号" />
			</div>
			<div class="item" @click="showCascader">
				<div class="left">所在地区</div>
				<t-input readonly v-model="address" placeholder="省市区县、乡镇等" @click="showCascader" />
			</div>
			<div class="item address">
				<div class="left">详细地址</div>
				<t-textarea v-model="moreAddres" placeholder="街道、楼牌等" style="height: 128px;" />
			</div>

		</div>
		<div class="bottom">

			<div class="default">
				<div class="left">
					<div class="set">设置默认地址</div>
					<div class="tips">提醒：每次下单会默认推荐该地址</div>
				</div>
				<div class="right">
					<t-switch color="#fa3534" v-model:value=isdefult />
				</div>
			</div>
		</div>
		<div class="save">
			<div class="btn" @click="save">保存地址</div>
		</div>
		<t-cascader v-model:visible="visibleCascader" title="选择地址" :options="options" @change="onChangeCascader" />
	</div>
</template>

<script setup>
	import { ref, onMounted, getCurrentInstance } from 'vue';
	import { useRoute, useRouter } from 'vue-router';

	import useUserInfoStore from '../../store/user';
	import { storeToRefs } from "pinia";
	const userInfoStore = useUserInfoStore();
	const { addressList } = storeToRefs(userInfoStore);

	const id = ref(0);
	const address = ref("");
	const name = ref("");
	const phone = ref("");
	const moreAddres = ref("");
	const isdefult = ref(false);

	const route = useRoute();
	const router = useRouter();

	const visibleCascader = ref(false);
	import areaList from "@/utils/area.js";
	const data = {
		areaList,
	};
	const options = data.areaList;

	const onChangeCascader = (value, options) => {
		address.value = options?.map((item) => item.label).join("-");
		visibleCascader.value = false;
	};

	const showCascader = () => {
		visibleCascader.value = true;
	};

	onMounted(() => {
		const options = route.query;
		if (options.data === undefined) {
			id.value = (addressList.value && addressList.value.length) ? addressList.value.length + 1 : 1;
			return;
		}
		const decodedItem = JSON.parse(decodeURIComponent(options.data));
		id.value = decodedItem.id;
		address.value = decodedItem.address;
		name.value = decodedItem.name;
		phone.value = decodedItem.phone;
		moreAddres.value = decodedItem.moreAddres;
		isdefult.value = decodedItem.isdefult;
	});

	const { proxy } = getCurrentInstance();
	const save = () => {
		if (!address.value || !name.value || !phone.value || !moreAddres.value) {
			proxy.$message({ type: 'error', text: '请填写完整信息' });
			return;
		}

		if (isdefult.value) {
			addressList.value.forEach(item => item.isdefult = false);
		}

		const existingAddress = addressList.value.find(item => item.id === id.value);

		const data = {
			address: address.value,
			name: name.value,
			phone: phone.value,
			moreAddres: moreAddres.value,
			id: id.value,
			isdefult: isdefult.value,
		};

		if (existingAddress) {
			Object.assign(existingAddress, data);
		} else {
			addressList.value.push(data);
		}

		console.log(id.value, addressList.value.length);
		router.back();
	};
</script>
<style lang="scss" scoped>
	.line {
		font-size: 15px;
	}

	.wrap {
		background-color: #f2f2f2;

		.top {
			background-color: #ffffff;
			padding: 18px;

			.item {
				display: flex;
				font-size: 17px;
				line-height: 52px;
				align-items: center;
				border-bottom: solid 1px #e4e7ed;

				.left {
					width: 94px;
				}

				input {
					text-align: left;
				}
			}

			.address {
				padding: 10px 0;

				textarea {
					// width: 100%;
					height: 78px;
					background-color: #f7f7f7;
					line-height: 31px;
					margin: 21px auto;
					padding: 10px;
				}
			}

			.site-clipboard {
				padding-right: 21px;

				textarea {
					// width: 100%;
					height: 78px;
					background-color: #f7f7f7;
					line-height: 31px;
					margin: 21px auto;
					padding: 10px;
				}

				.clipboard {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 14px;
					height: 42px;

					.icon {
						margin-top: 3px;
						margin-left: 5px;
					}
				}
			}
		}

		.bottom {
			margin-top: 10px;
			padding: 18px;
			background-color: #ffffff;
			font-size: 15px;

			.tag {
				display: flex;

				.left {
					width: 83px;
				}

				.right {
					display: flex;
					flex-wrap: wrap;

					.tags {
						width: 73px;
						padding: 8px 4px;
						border: solid 1px #e4e7ed;
						text-align: center;
						border-radius: 26px;
						margin: 0 5px 10px;
						display: flex;
						font-size: 15px;
						align-items: center;
						justify-content: center;
						line-height: 1;
					}


				}
			}

			.default {
				margin-top: 26px;
				display: flex;
				justify-content: space-between;
				border-bottom: solid 1px #e4e7ed;
				line-height: 33px;

				.tips {
					font-size: 12px;
				}

			}
		}

		.save {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 120upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.save div {
			display: flex;
		}

		.save .btn {
			box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.4);
			width: 70%;
			height: 40px;
			border-radius: 40px;
			background-color: #ffa3c2;
			color: #fff;
			justify-content: center;
			align-items: center;
			font-size: 30upx;
			margin-bottom: 60px;
		}
	}
</style>
