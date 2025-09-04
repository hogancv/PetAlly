<template>
	<t-dialog v-model:visible="show" title="温馨提示" @confirm="show = false" confirm-btn="知道了">
		<div class="slot-content">
			宠AI有家鼓励向上、真实、原创的内容，含以下内容的笔记将不会被推荐：<br>
			1. 含有不文明语言、令人不适图片；<br>
			2.含有网址链接、联系方式、二维码或售卖语言；<br>
			3. 冒充他人身份或搬运他人作品；<br>
			4. 通过有奖方式诱导他人点赞、评论、收藏、转发、关注；<br>
			5. 为刻意博取眼球，在标题、封面等处使用夸张表达<br>
		</div>
	</t-dialog>
	<div class="form">
		<t-form :model="formData" class="form" label-align="left" labelWidth="0">
			<t-form-item prop="photo">
				<t-upload :action="action" :on-success="onSuccess" v-model="files" multiple :max="9"
					accept="image/*"></t-upload>
			</t-form-item>

			<t-form-item>
				<t-input v-model="formData.title" placeholder="好的标题会有更多宠友点赞哦~~~" />
			</t-form-item>

			<t-form-item>
				<t-textarea v-model="formData.content" placeholder="这里是正文部分" style="height: 300px;" />
			</t-form-item>
		</t-form>
		<div class="flex-row items-center info-circle" @click="show = true">
			<t-icon name="info-circle" color="#666" size="28" style="margin-right: 8px;"></t-icon>
			<div style="color: #666;">发布须知</div>
		</div>
		<div class="button">
			<t-button @click="submit" style="width: 100%;" theme="primary">发布</t-button>
		</div>
	</div>
</template>

<script setup>
	import { ref, reactive, getCurrentInstance } from 'vue';
	import { useRouter } from 'vue-router';
	import { addPublishDetail, addPublish } from '@/api/community.js'
	const show = ref(false);
	const action = import.meta.env.VITE_UPLOAD_URL;
	const files = ref([]);
	const onSuccess = (res) => {
		console.log("===onSuccess", res);
		files.value.map((item) => {
			item.url = item.response.data;
		});
		console.log("===files", files.value);
	};

	import useUserInfoStore from "@/store/user.js";
	const userInfoStore = useUserInfoStore();
	import { storeToRefs } from "pinia";
	const { userName, avatarUrl: avatar } = storeToRefs(userInfoStore)

	const formData = reactive({
		title: "",
		content: "",
	});

	const router = useRouter();
	const { proxy } = getCurrentInstance();
	const submit = async () => {
		let imageList = files.value.map((item) => item.url);
		const data = {
			title: formData.title,
			content: formData.content,
			author: userName.value,
			authorAvatar: avatar.value,
			commentList: [],
			imageList: imageList.join(","),
		}

		let res = await addPublishDetail(data);
		console.log("详情页上传成功", res);
		let id = res.id;
		let res2 = await addPublish({
			post_id: id,
			cover_image_url: imageList[0],
			avatar_url: avatar.value,
			likes_count: 0,
			author_name: userName.value,
			title: formData.title,
		});
		console.log("瀑布流上传成功", res2);
		proxy.$message({
			type: "success",
			text: "发布成功",
		})
		setTimeout(() => {
			router.back();
		}, 1000);
	};
</script>
<style scoped>
	.button {
		position: absolute;
		bottom: 10%;
		left: 10%;
		width: 80%;
		margin: 0 auto;
	}

	.info-circle {
		position: absolute;
		bottom: 3%;
		left: 50%;
		transform: translateX(-50%);

	}

	.slot-content {
		font-size: 14px;
		color: #666;
		line-height: 20px;
		text-align: start;
	}

	.form {
		width: 100%;

		:deep(.t-upload__item) {
			width: 110px;
			height: 110px;
		}

		:deep(.t-upload) {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-gap: 10px;
		}
	}
</style>
