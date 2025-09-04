<template>
	<div class="content">
		<t-dialog v-model:visible="isShowDialog1" title="提示" confirm-btn="知道了">
			<div class="align-left">
				<div>
					1.用户可每日进行签到，签到即可获得对应的积分奖励。
				</div>
				<div>
					2.连续签到可获得更多积分。若出现断签，则自动返回初始签到状态，重新开始累计。
				</div>
				<div>
					3.签到积分可用于积分商城兑换商品。
				</div>
				<div>
					4.签到积分不可提现，不可转赠，不可转让。
				</div>
				<div>
					5.本活动最终解释权归宠AI有家所有。
				</div>
			</div>
		</t-dialog>
		<div class="t-wrap">
			<div class="t-jf">
				<router-link to="/pointsdetail">
					<div class="t-jf-points">
						<div class="t-jf-title">我的积分</div>
						<div class="t-jf-info">
							<div class="t-jf-num">{{ points }}</div>
							<div class="t-jf-detail" hover-class="t-hc" @click="toDetail">
								<text>积分明细</text>
								<img src="@/assets/images/user/mymall/icon-right.png">
							</div>
						</div>
					</div>
				</router-link>

				<router-link to="/mall">
					<div class="t-jf-mall" hover-class="t-hc" @click="toMall">
						积分商城
					</div>
				</router-link>

			</div>
			<div class="t-bg-wrap">
				<div class="t-bg"></div>
			</div>
		</div>
		<div class="t-sign-con">
			<div class="wrap">
				<div class="t-sign-top">
					<div class="lx">已连续签到<text>{{ ContinuousSign }}</text>天</div>
					<div class="gz" hover-class="t-hc" @click="isShowDialog1 = true">签到规则
						<img src="@/assets/images/user/mymall/icon-ask.png" />
					</div>
				</div>
				<div class="t-sign-body">
					<div :class="['t-sign-item', { 'signed': isSigned }]">
						<div class="t-img-con">
							<div class="t-img">
								<img
									:src="'src/assets/images/user/mymall/icon-' + (isSigned ? 'check' : 'uncheck') + '.png'" />

							</div>
						</div>
						<text>+100</text>
					</div>
					<div class="t-sign-item" v-for="(item, index) in Array(6).fill(null)" :key="index">
						<div class="t-img-con">
							<div class="t-img">
								<img src="@/assets/images/user/mymall/icon-uncheck.png" />
							</div>
						</div>
						<text>+100</text>
					</div>
				</div>
				<div @click="toSign" :class="['t-sign-btn', { 't-signed': isSigned }]">{{ isSigned ? '今日已签到' :
					'立即签到' }}
				</div>
			</div>
		</div>
		<div class="t-task">
			<div class="t-title">做任务 赚积分</div>
			<div v-for="(task, index) in tasks" :key="index" class="t-task-item">
				<div class="left">
					<div class="taskname">
						{{ task.name }}<text>+100积分</text>
					</div>
					<div class="taskdesc">
						{{ task.desc }}
					</div>
				</div>
				<div class="right" @click="skip(task.id)" :class="{ finish: task.completed }" hover-class="t-hc">
					{{ task.completed ? '已完成' : task.actionText }}
				</div>
			</div>
		</div>

	</div>
</template>

<script setup>
	import { ref, toRefs } from 'vue';
	import { useRouter } from 'vue-router';
	import useUserInfoStore from '../../store/user';
	import { storeToRefs } from 'pinia';
	const userInfoStore = useUserInfoStore();
	const { pointscenter } = storeToRefs(userInfoStore);

	const {
		points,
		click1,
		click2,
		click3,
		click4,
		isSigned,
		ContinuousSign
	} = toRefs(pointscenter.value);
	const isShowDialog1 = ref(false);
	const router = useRouter();
	const tasks = [
		{
			id: 1,
			name: '热门宠物',
			desc: '浏览热门宠物即可完成任务',
			completed: click1.value,
			actionText: '去浏览',
		},
		{
			id: 2,
			name: '宠物识别',
			desc: '成功识别一种宠物即可完成任务',
			completed: click2.value,
			actionText: '去识别',
		},
		{
			id: 3,
			name: '收藏宠物',
			desc: '收藏任意宠物即可完成任务',
			completed: click3.value,
			actionText: '去收藏',
		},
		{
			id: 4,
			name: '查看等级',
			desc: '进入会员中心获得积分',
			completed: click4.value,
			actionText: '去完善',
		},
		{
			id: 5,
			name: '逛逛宠圈',
			desc: '浏览任意分享即可完成任务',
			completed: true,
			actionText: '已完成',
		},
	];

	const toSign = () => {
		if (isSigned.value) return;
		pointscenter.value.isSigned = true;
		pointscenter.value.ContinuousSign++;
		userInfoStore.addPoints();
	};

	const urlMap = {
		1: '/petmore',
		2: '/identifytip',
		3: '/petdetail/24',
		4: '/level',
	};
	const clickStates = [click1, click2, click3, click4];

	const skip = (id) => {
		if (clickStates[id - 1].value) return;
		router.push(urlMap[id]);
		userInfoStore.addPoints(tasks[id - 1].name);
		clickStates[id - 1].value = true;
	};

</script>

<style scoped lang="scss">
	.content {
		box-sizing: border-box;
		padding-bottom: 10px;
		background: #fff;
		min-width: 100vw;
		height: calc(100vh - 50px);
	}

	.align-left {
		text-align: left;
	}

	.t-hc {
		opacity: 0.7;
	}

	.t-wrap {
		height: 146px;
		width: 100%;
		box-sizing: border-box;

		.t-jf {
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			padding-bottom: 21px;
			background: linear-gradient(to bottom, #ffa3c2, #ffa3c27d);
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.t-jf-points {
				padding-left: 36px;

				.t-jf-title {
					font-size: 17px;
					color: #fff;
					font-family: ali;
				}

				.t-jf-info {
					margin-top: 10px;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: flex-end;

					.t-jf-num {
						font-size: 29px;
						font-weight: bold;
						color: #fff;
						line-height: 29px;
					}

					.t-jf-detail {
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						align-items: center;

						text {
							font-size: 12px;
							color: #fff;
							margin-left: 10px;
						}

						img {
							width: 9px;
							height: 9px;
							margin-left: 3px;
						}
					}
				}
			}

			.t-jf-mall {
				margin-right: 36px;
				padding: 8px 16px;
				background: #fff;
				border-radius: 26px;
				color: #ffa3c2;
			}
		}

		.t-bg-wrap {
			position: relative;
			align-self: flex-start;
			top: 28px;

			// .t-bg {
			// 	--width: 440vw;
			// 	position: absolute;
			// 	height: var(--width);
			// 	width: var(--width);
			// 	left: calc(var(--width)*-1/2 + 50vw - 21px);
			// 	top: calc(var(--width)*-1 + 1vw);
			// 	border-radius: 50%;
			// 	z-index: -1;
			// 	background: linear-gradient(to bottom, #18ba7a, #88bf87);
			// }
		}
	}

	.t-sign-con {
		width: 100%;
		box-sizing: border-box;
		position: relative;
		padding: 0px 16px;

		.wrap {
			width: 100%;
			height: 187px;
			border-radius: 8px;
			background-color: #fff;
			position: relative;
			top: -26px;
			box-sizing: border-box;
			box-shadow: 0 16px 50px rgba(0, 0, 0, .4);

			.t-sign-top {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				width: 100%;
				padding: 15px 10px;

				.lx {
					font-size: 17px;
					color: #333;

					text {
						color: #ffa3c2;
						margin: 0px 2px;
					}
				}

				.gz {
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					font-size: 15px;
					color: #999;

					img {
						width: 15px;
						height: 15px;
						margin-left: 4px;
					}
				}
			}

			.t-sign-body {
				height: 64px;
				width: 100%;
				box-sizing: border-box;
				padding: 0px 10px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.t-sign-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					height: 100%;
					box-sizing: border-box;
					padding: 0px 6px;
					border-radius: 5px;

					&.signed {
						background: #ffa3c27d;

						text {
							color: #fff !important;
						}
					}

					.t-img-con {
						width: 29px;
						height: 29px;
						border-radius: 50%;
						background: #ffa3c2a1;
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;

						.t-img {
							width: 21px;
							height: 21px;
							border-radius: 50%;
							background: #ffa3c2;
							display: flex;
							flex-direction: row;
							justify-content: center;
							align-items: center;

							img {
								width: 12px;
								height: 12px;
							}
						}
					}

					text {
						font-size: 10px;
						color: #777;
						margin-top: 6px;
					}
				}
			}

			.t-sign-btn {
				width: 267px;
				height: 42px;
				text-align: center;
				line-height: 42px;
				border-radius: 26px;
				background-color: #ffa3c2;
				font-size: 17px;
				color: #fff;
				margin: 17px auto 0px;

				&.t-signed {
					background-color: #b8b8b8 !important;
				}
			}
		}
	}

	.t-task {
		box-sizing: border-box;
		background: #fff;
		padding: 0px 16px;

		.t-title {
			font-weight: 600;
			font-size: 21px;
			color: #000;
			text-align: center;
			font-family: ali;
		}

		.t-task-item {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			height: 68px;
			box-sizing: border-box;
			border-bottom: 1px solid #cdcdcd;

			.left {
				.taskname {
					max-width: 286px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 15px;
					color: #333;

					text {
						color: #ffa3c2;
						margin-left: 5px;
					}
				}

				.taskdesc {
					max-width: 265px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 14px;
					color: #999;
					margin-top: 7px;
				}
			}

			.right {
				padding: 8px 18px;
				border-radius: 26px;
				background-color: #ffa3c2;
				text-align: center;
				font-size: 15px;
				color: #fff;

				&.finish {
					background-color: #b8b8b8 !important;
				}
			}
		}
	}

	.t-o-wrap {
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;

		.t-sign-bg {
			width: 260px;
			border-radius: 10px;
		}

		.t-g-jf {
			position: relative;
			top: -114px;
			font-size: 19px;
			color: #ffa3c2;
		}

		.t-g-desc {
			position: relative;
			top: -104px;
			font-size: 15px;
			color: #999;
		}

		.close-btn {
			position: relative;
			top: -90px;
			width: 156px;
			height: 31px;
			border-radius: 26px;
			background: #ffa3c2;
			text-align: center;
			line-height: 31px;
			font-size: 15px;
			color: #fff;
		}

		.t-rule {
			width: 359px;
			background: #fff;
			border-radius: 10px;
			padding: 16px;
			box-sizing: border-box;

			.title {
				text-align: center;
				color: #333;
				font-size: 17px;
				margin-top: 5px;
			}

			.desc {
				text-align: justify;
				margin-top: 10px;
				white-space: pre-line;
				font-size: 17px;
				color: #666;
				line-height: 31px;
			}
		}

		.t-close {
			width: 42px;
			height: 42px;
			margin-top: 21px;
			padding: 5px;
		}
	}
</style>