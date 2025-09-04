<template>
	<div>
		<Empty v-show="addressList.length == 0" type="message" tip="快添加收获地址吧" />

		<!-- color：主题色 addressList:地址管理数据 @chooseClick：选择事件 @editClick：编辑事件  -->
		<address-set colors="#ffa3c2" :addressList="addressList" @chooseClick="chooseClick"
			@editClick="editClick"></address-set>

		<router-link to="/addressedit">
			<div class="save">
				<div class="btn" @click="addAddress">添加收货地址</div>
			</div>
		</router-link>

	</div>
</template>

<script setup>
import Empty from '../../components/Empty.vue'
import { useRouter } from 'vue-router';
import AddressSet from '../../components/AddressSet/AddressSet.vue'
import useUserInfoStore from '../../store/user';
import { storeToRefs } from "pinia";

const userInfoStore = useUserInfoStore();
const { userAddress, addressList } = storeToRefs(userInfoStore);
console.log(addressList.value);
const router = useRouter();


const editClick = (item) => {
	const encodedItem = encodeURIComponent(JSON.stringify(item));
	router.push({
		path: '/addressedit',
		query: { data: encodedItem },
	});
};

const chooseClick = (item) => {
	userAddress.value = item;
	router.back();
};

const addAddress = () => {
	router.push({
		path: '/addressedit'
	});
};
</script>
<style lang="scss" scoped>
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
</style>