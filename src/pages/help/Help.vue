<template>
  <t-popup v-model="popupShow" placement="center" style="width: 80%">
    <div class="pop-title">简介</div>
    <div style="font-size: 15px; padding: 0 15px 30px">
      <br />&emsp;&emsp;你知道流浪猫是怎么过冬的吗？墙角里、草丛中、车底下，还有无处可去的直接被送往了喵星。比起酷暑，严寒才是流浪猫最大的挑战。
      <br />&emsp;&emsp;每年冬天，至少有60%的流浪猫，因为扛不住这凛冽的寒风而被遣返喵星，这也是流浪猫寿命短的原因。你可能会说：“流浪猫一身毛发怎就不抗冻呢？”
      <br />&emsp;&emsp;其实，猫咪远比我们想象的要更怕冷，它们的祖先起源于沙漠，更适应温暖的环境。且大多数猫咪的毛被层次少，保暖性差，抗寒能力并不高。所以，猫咪一到冬天就喜欢往各种暖和的地方钻，并且流浪猫在冬天能获得的食物也更少，如此饥寒交迫的情况下，很难熬过这残酷的冬天。
      <br />&emsp;&emsp;如果我们能给它们一点温暖，比如:一个写上提醒语的纸箱塞上一些衣物、一小碗温水和猫粮、或是在开车前检查一下车底和轮胎，或许就能挽回一条小小的生命......
    </div>
    <t-icon class="close-btn" name="close-circle" size="32" color="#fff" @click="popupShow = false" />
  </t-popup>
  <div class="all">
    <div class="section">
      <vue-danmaku v-model:danmus="danmus" loop style="height:100px; width:100%;" :speeds=70 :top=10 :right=8
        randomChannel :fontSize=16 extraStyle="background-color: #00000058;padding: 5px 8px;border-radius: 50px;" />
    </div>

    <div class="title0 flex-row">
      <div :class="isActive == 0 ? 'onclick' : 'unclick'" @click="chenked(0)">
        <text>援助计划</text>
      </div>

      <div :class="isActive == 1 ? 'onclick1' : 'unclick'" @click="chenked(1)">
        <text>领养宠物</text>
      </div>
    </div>

    <div v-show="isActive == 0" class="plan">
      <div class="mid">
        <div class="flex-row justify-center">
          <div class="main_title" style="margin-bottom: 8px">
            《第三期 让流浪的他们不再寒冷》
          </div>
        </div>
        <video class="flex-row justify-center" style="width: 100%" controls :src="videoSrc"></video>
        <div class="flex-row justify-between items-center" style="margin-top: 6px">
          <text style="font-size: 18px; font-weight: bold">让流浪的他们不再寒冷</text>
          <div class="flex-row items-center" @click="popupShow = true">
            <text style="padding-bottom: 2px">简介</text>
            <t-icon name="chevron-right" size="18" style="color: #7c7c7c" />
          </div>
        </div>

        <div class="text2">
          <text style="color: darkgray">期望援助</text>
          <img class="icon" src="@/assets/images/help/bone.png" />
          <text class="text3">22000KG</text>
          <img class="icon" src="@/assets/images/help/fishbone.png" />
          <text class="text3">18000KG</text>
        </div>
        <div class="text2">
          <text style="color: darkgray">援助方式</text>
          <text class="text3" style="color: #ff7a91">8KG旧衣=1KG饲料</text>
        </div>
      </div>
      <div class="mid">
        <div class="title">
          <t-icon name="user-circle" size="30" style="color: #ff7a92; margin-right: 8px" />
          <text class="myhelp">我的援助</text>
        </div>

        <div>
          <DonationCard imgSrc="src/assets/images/help/bone.png" :requiredWeight="22000" :currentWeight="num1"
            :participants="618" description="狗粮需旧衣重量" :type="1" />
          <DonationCard imgSrc="src/assets/images/help/fishbone.png" :requiredWeight="12000" :currentWeight="num2"
            :participants="798" description="猫粮需旧衣重量" :type="2" />
        </div>
      </div>
      <div class="mid">
        <div class="flex-row justify-center">
          <div class="main_title" style="color: #ff7a92de;margin-bottom: 10px;">
            《往期回顾》
          </div>
        </div>
        <HelpCard :id="2" boxClass="" imageSrc="src/assets/images/help/dog.png" title="(第2期) 拾起被遗弃的爱"
          targetWeight="25200kg" totalWeight="25715kg" participants="1904人" @click="navToDetail(2)" />
        <HelpCard :id="1" boxClass="box1" imageSrc="src/assets/images/help/cat.png" title="(第1期) 用爱终结流浪"
          targetWeight="19200kg" totalWeight="23869kg" participants="1867人" @click="navToDetail(1)" />
      </div>
    </div>
    <div v-if="isActive == 1" class="plan">
      <div class="mid" style="padding: 12px 0">
        <t-tabs default-value="0" @change="onChange">
          <t-tab-panel value="0">
            <template #label>
              <div>猫猫</div>
            </template>
          </t-tab-panel>
          <t-tab-panel value="1">
            <template #label>狗狗</template>
          </t-tab-panel>
        </t-tabs>
        <div v-show="current == 0">
          <div style="flex-wrap: wrap" class="flex-row">
            <div class="flex-col" style="width: 40vw; margin: 10px" v-for="(item, index) in catList" :key="index">
              <img class="img_item" :src="item.image" />
              <div style="margin: 4px auto;">
                {{ item.name }}
              </div>
              <div class="flex-row items-center justify-between">
                <div>
                  <t-icon name="location" size="18" color="#999"></t-icon>
                  <text style="margin-left: 3px">{{ item.province }}</text>
                </div>
                <t-button theme="primary" shape="round" style="height: 28px"
                  @click="openAdoptDialog(item)">领养</t-button>
              </div>
            </div>
          </div>
        </div>
        <div v-show="current == 1">
          <div style="flex-wrap: wrap" class="flex-row">
            <div class="flex-col" style="width: 40vw; margin: 10px" v-for="(item, index) in dogList" :key="index">
              <img class="img_item" :src="item.image" />
              <div style="margin: 4px auto;">
                {{ item.name }}
              </div>
              <div class="flex-row items-center justify-between">
                <div>
                  <t-icon name="location" size="18" color="#999"></t-icon>
                  <text style="margin-left: 3px;">{{ item.province }}</text>
                </div>
                <t-button theme="primary" shape="round" style="height: 28px"
                  @click="openAdoptDialog(item)">领养</t-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 领养确认弹窗 -->
      <t-dialog v-model:visible="showAdoptDialog" title="领养确认" :confirm-btn="{ content: '确认', theme: 'primary' }"
        :cancel-btn="{ content: '取消' }" @confirm="handleAdopt" @cancel="showAdoptDialog = false">
        <div>
          <p style="color: black;">您确定要领养这只可爱的小伙伴吗？</p>
          <p style="color: #999; font-size: 14px">领养需要承担相应的责任和义务</p>
        </div>
      </t-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import vueDanmaku from 'vue3-danmaku'
import DonationCard from '@/components/DonationCard.vue'
import HelpCard from '@/components/HelpCard.vue'
import { getCatListData, getDogListData, updateAdoptionInfo } from '@/api/help.js'
import {
  MessagePlugin
} from 'tdesign-mobile-vue';
import { storeToRefs } from "pinia";
import useUserInfoStore from "@/store/user.js";

const userInfoStore = useUserInfoStore();
const { userName } = storeToRefs(userInfoStore)
const danmus = ref([])

onMounted(() => {
  setInterval(() => {
    const random = Math.floor(Math.random() * 3)
    // 随机生成用户名
    var randomUsername = "用户" + Math.floor(Math.random() * 1000);
    // 随机生成1到39之间的数字
    var randomNumber = Math.floor(Math.random() * 39) + 1;
    danmus.value.push(`${new Array(random).fill('~').join('🤩')}${randomUsername}捐赠${randomNumber}kg旧物 🥰`)
  }, Math.floor(Math.random() * 1000))

  getCatListData().then(res => {
    catList.value = res.list.filter(item => item.status !== 1)

  })

  getDogListData().then(res => {
    dogList.value = res.list.filter(item => item.status !== 1)
  })
})

const router = useRouter()

const catList = ref([])
const dogList = ref([])

const onChange = (index) => {
  current.value = index
}
const num1 = ref(8000)
const num2 = ref(10000)
const isActive = ref(0)
const popupShow = ref(false)
const videoSrc = import.meta.env.VITE_VIDEO_URL + '/0.mp4'
const current = ref(0)

const showAdoptDialog = ref(false)
const currentPet = ref(null)

const openAdoptDialog = (pet) => {
  currentPet.value = pet
  showAdoptDialog.value = true
}

const handleAdopt = () => {
  updateAdoptionInfo({
    ...currentPet.value,
    adopter: userName.value,
  })
  MessagePlugin.success('领养申请已提交，我们会尽快联系您！')
  showAdoptDialog.value = false
}

const chenked = (e) => {
  isActive.value = e
}

const navToDetail = (i) => {
  router.push('/helpdetail' + i)
}

</script>
<style scoped>
.pop-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding-top: 10px;
}

.close-btn {
  position: absolute;
  left: 50%;
  margin-left: -16px;
  bottom: calc(-1 * (24px + 32px));
}

.myhelp {
  color: #ff7a92;
  font-size: 26px;
  font-family: abc;
  margin-right: 9px;
}

.img_item {
  height: 150px;
  width: 40vw;
  border-radius: 15px;
}

.title {
  text-align: center;
  color: #000;
  font-size: 19px;
  margin-top: 5px;
}

.all {
  background-color: #ddeef8;
}

.section {
  padding: 80px 0 120px;
  background-image: url('@/assets/images/help/12.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.main_title {
  font-size: 29px;
  font-family: abc;
  color: #76b0d8d1;
}



@keyframes fontAnimation {
  from {
    font-size: 20px;
    font-weight: 400;
  }

  to {
    font-size: 25px;
    font-weight: 600;
  }
}

.onclick {
  height: 60px;
  width: 50%;
  border-radius: 24px 24px 0 0;
  background: linear-gradient(to bottom, #f7f0f0, #ddeef8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  padding-top: 10px;
  color: #76b0d8;
  position: relative;
  font-weight: 600;

  animation: fontAnimation 0.3s ease-out;
}

.onclick:before {
  position: absolute;
  right: -30px;
  bottom: 0px;
  content: '';
  display: inline-block;
  width: 30px;
  background: #ffffff;
  height: 30px;
  border-bottom-left-radius: 24px 24px;
  z-index: 2;
}

.onclick:after {
  position: absolute;
  display: inline-block;
  content: '';
  right: -30px;
  bottom: -1px;
  width: 33px;
  height: 30px;
  background: linear-gradient(to bottom, #e8edf4, #deeef7);
  z-index: 1;
}

.onclick1 {
  height: 60px;
  width: 50%;
  border-radius: 24px 24px 0 0;
  background: linear-gradient(to bottom, #f7f0f0, #ddeef8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  padding-top: 10px;
  color: #76b0d8;
  position: relative;
  font-weight: 600;
  animation: fontAnimation 0.3s ease-out;
}

.onclick1:before {
  position: absolute;
  bottom: 0px;
  left: -30px;

  content: '';
  display: inline-block;
  width: 30px;
  background: #ffffff;
  height: 30px;
  border-bottom-right-radius: 24px 24px;
  z-index: 2;
}

.onclick1:after {
  position: absolute;
  display: inline-block;
  content: '';
  left: -30px;
  bottom: -1px;
  width: 30px;
  height: 30px;
  background: linear-gradient(to bottom, #e8edf4, #deeef7);
  z-index: 1;
}

.unclick {
  height: 50px;
  width: 50%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}

.title {
  display: flex;
  flex-flow: row;
  justify-content: center;
}

.title0 {
  margin-top: -10px;
  align-items: flex-end;
  height: 50px;
  background-color: #ffffff;
  border-radius: 50%;
  font-family: ali;
  font-weight: 500;
}

.plan {
  padding: 5px 18px 66px;
}

.mid {
  margin-top: 10px;
  background-color: white;
  border-radius: 10px;
  padding: 12px 17px;
}

.card {
  margin-top: 10px;
}

.text2 {
  line-height: 21px;
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-top: 6px;
}

.text3 {
  margin-left: 10px;
  font-weight: bold;
}

.icon {
  width: 26px;
  height: 26px;
  margin-left: 10px;
  background-color: #ffd2d2;
  border-radius: 50%;
}






.multi-back {
  margin-top: 21px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: darkgray;
}
</style>
