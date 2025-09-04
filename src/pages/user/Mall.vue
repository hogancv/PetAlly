<template>
	<div class="content">
		<div class="t-goods" v-if="goodsList && goodsList.length > 0">
			<div class="t-goods-item" v-for="(item, index) in goodsList" :key="index">
				<img class="t-goods-img" :src="item.goodsUrl" mode="aspectFill"></img>
				<div class="t-goods-title t-text-oneline">{{ item.goodsDesc }}</div>
				<div class="t-goods-score t-flex-row-s">
					<text>{{ item.points }}</text>
					<text>积分</text>
				</div>
				<div class="t-dh t-flex-row" bindtap="toTips" hover-class="t-click-class" @click="showToast">我要兑换
				</div>
			</div>
		</div>
		<div class="t-goods" v-if="goodsList && goodsList.length > 0">
			<div class="t-goods-item" v-for="(item, index) in goodsList1" :key="index">
				<img class="t-goods-img" :src="item.imageUrl" mode="aspectFill"></img>
				<div class="t-goods-title t-text-oneline">{{ item.name }}</div>
				<div class="t-goods-score t-flex-row-s">
					<text>{{ item.points }}</text>
					<text>积分</text>
				</div>
				<div class="t-dh t-flex-row" bindtap="toTips" hover-class="t-click-class" @click="showToast">我要兑换
				</div>
			</div>
		</div>
		<div class="t-more t-flex-row">
			我也是有底线的哦~
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue';

	const goodsList = [
		{
			goodsUrl: 'src/assets/images/user/11.jpg',
			goodsDesc: '成猫粮高蛋白轻脂肪冻干猫粮4斤一袋',
			points: 10000
		},
		{
			goodsUrl: 'src/assets/images/user/22.jpg',
			goodsDesc: '成犬幼犬通用型狗粮4斤一袋',
			points: 10000
		}
	];

	const goodsList1 = ref([]);
	import { getGoodListData } from '@/api/user.js';
	const fetchData = async () => {
		const res = await getGoodListData();
		goodsList1.value = res;
	}

	onMounted(() => {
		fetchData();
	});
</script>
<style scoped lang="scss">
	.t-click-class {
		opacity: 0.7;
	}

	.t-flex-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.t-flex-row-s {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.content {
		box-sizing: border-box;
		background: #F6F3F3;
		min-width: 100vw;
		min-height: 100vh;
		padding-bottom: 16px;

		.t-goods {
			width: 100%;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: flex-start;
			padding: 8px 9px 0px;
		}

		.t-goods-item {
			width: 182px;
			padding-bottom: 10px;
			background: #fff;
			border-radius: 10px;
			margin-top: 7px;
		}

		.t-goods-img {
			width: 182px;
			height: 182px;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			display: block;
		}

		.t-goods-title {
			width: 160px;
			margin: 16px auto 0px;
			font-size: 14px;
			color: #272727;
		}

		.t-goods-score {
			margin-top: 8px;
			height: 17px;
			line-height: 17px;
			margin-left: 10px;
		}

		.t-goods-score text:first-child {
			font-size: 17px;
			color: #f18c96;
			font-weight: bold;
		}

		.t-goods-score text:last-child {
			font-size: 14px;
			color: #000;
			margin-left: 2px;
		}

		.t-dh {
			width: 161px;
			height: 36px;
			background: #ffa3c2;
			border-radius: 18px;
			font-size: 17px;
			color: #FFFFFF;
			margin: 10px auto 0px;

		}

		.t-more {
			font-size: 14px;
			color: #888888;
			line-height: 21px;
			margin-top: 26px;
			margin-bottom: 18px;
		}
	}
</style>