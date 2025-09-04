<template>
  <!-- 加载 -->
  <my-mask :show="maskShow" @click="maskShow = false">
    <Loading />
  </my-mask>

  <div class="flex-col items-center">
    <div class="title">提示</div>

    <div class="img-container">
      <img class="img" src="@/assets/images/home/tip/1.png" alt="" />
      <img src="@/assets/images/message/true.png" alt="" class="img_true" />
    </div>
  </div>
  <div class="flex-row justify-evenly" style="margin-top: 50px">
    <div class="flex-col items-center">
      <img class="img1" src="@/assets/images/home/tip/2.png" alt="" />
      <img src="@/assets/images/message/false.png" alt="" class="img2" />
      <div class="text1">太近</div>
    </div>
    <div class="flex-col items-center">
      <img class="img1" src="@/assets/images/home/tip/3.png" alt="" />
      <img src="@/assets/images/message/false.png" alt="" class="img2" />
      <div class="text1">太远</div>
    </div>
    <div class="flex-col items-center">
      <img class="img1" src="@/assets/images/home/tip/4.png" alt="" />
      <img src="@/assets/images/message/false.png" alt="" class="img2" />
      <div class="text1">多品种</div>
    </div>
  </div>
  <t-button size="large" shape="round" block theme="primary" class="button" @click="triggerFileInput">继续
    <input type="file" @change="identify" accept="image/*" ref="fileInput" style="display: none" />
  </t-button>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import MyMask from '@/components/MyMask.vue'
import Loading from '@/components/Loading.vue'
import identifyApi from '@/api/identify.js'
import useUserInfoStore from "@/store/user.js";
import { storeToRefs } from "pinia";

const maskShow = ref(false)
const router = useRouter()
const { proxy } = getCurrentInstance()
const fileInput = ref(null)

const userInfoStore = useUserInfoStore();
const { IdentifyHistory } = storeToRefs(userInfoStore);


const triggerFileInput = () => {
  fileInput.value.click()
}
const identify = () => {
  maskShow.value = true
  const file = event.target.files[0]
  if (file) {
    console.log('Selected file:', file)
    // 将图片转为base64编码
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      fetch(e.target.result)
    }
  }
}
const fetch = async (image) => {
  const res = await identifyApi(image)
  console.log('识别结果:', res)
  if (res) {
    console.log('识别成功:', res.data)
    let data = res.data.result
    data = data.filter(item => item.baike_info?.image_url);
    IdentifyHistory.value.unshift({
      image: image,
      data: data
    })
    router.push({
      name: 'identificationresult',
      query: { data: JSON.stringify(data) }
    })
  } else {
    // 识别失败
    proxy.$message({
      text: '识别失败',
      type: 'error'
    })
  }
  maskShow.value = false
}

</script>

<style scoped>
.img-container {
  position: relative;
  display: inline-block;
  /* 确保容器大小适应图片 */
}

.img_true {
  position: absolute;
  top: -8px;
  right: -10px;
  width: 64px;
  height: 64px;
}

.button {
  margin: 0 auto;
  width: 86%;
  height: 50px;
  margin-top: 60px;
  font-weight: bold;
  animation: pulsate 1s infinite;
  font-size: 25px;
}

@keyframes pulsate {
  0% {
    transform: scale(1);
    box-shadow: none;
  }

  50% {
    transform: scale(1.03);
    box-shadow: 0 16px 16px rgba(0, 0, 0, 0.2);
  }

  100% {
    transform: scale(1);
    box-shadow: none;
  }
}

.title {
  font-size: 30px;
  margin: 30px 0;
  font-weight: bold;
}

.img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  display: block;
}

.img1 {
  width: 90px;
  height: 90px;
  border-radius: 50%;
}

.img2 {
  position: relative;
  width: 42px;
  height: 42px;
  top: -100px;
  right: -40px;
}
</style>
