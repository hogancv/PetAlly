<template>
  <div @touchstart="start" @touchend="end">
    <div class="flex-col page space-y-12">
      <div class="flex-col section">
        <div class="flex-row items-center space-x-26">
          <div :class="{ Select: Recommended, unSelect: !Recommended }" @click="Recommendedclick">推荐</div>
          <div :class="{ Select: !Recommended, unSelect: Recommended }" @click="Recommended = false">关注</div>
          <t-icon name="plus" size="38" style="position: absolute; right: 6%" @click="navToPublish"></t-icon>
        </div>
        <!-- 推荐 -->
        <div v-show="Recommended" class="animate__animated animate__fadeInLeft">
          <div class="flex-col group_2 space-y-14">
            <div class="flex-row items-center justify-between">
              <div class="self-start font_1">明星宠物</div>
              <div class="flex-row items-center" @click="getpet">
                <div>换一批</div>
                <t-icon name="refresh" color="#666" size="16" class="icon-rotate"></t-icon>
              </div>
            </div>
            <div class="flex-row space-x-24 horiz-list" ref="target">
              <div class="flex-col horiz-list-item_2 space-y-11" v-for="(item, index) in petList" :key="index">
                <img class="self-center image_2" :src="getImageUrl(item?.englishName)" @click="navTopet(item.id)" />
                <text class="self-center font_2">{{ item?.name }}</text>
                <text class="self-center font_3">{{ item?.englishName }}</text>
                <div class="button flex-row items-center justify-center" v-show="!starList[index].star">
                  <text class="font_2" @click="toggleStar(item, index)">收藏</text>
                </div>
                <div class="button1 flex-row items-center justify-center" v-show="starList[index].star === true">
                  <div class="font_21" @click="toggleStar(item, index)">已收藏</div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-col group_3 space-y-16">
            <div class="flex-row justify-between items-center">
              <text class="font_1">百科知识</text>
            </div>
            <div class="flex-row space-x-19">
              <div v-for="(item, index) in learningItems" :key="index" :class="item.class" @click="goto(index)">
                <div class="flex-col justify-start items-center text-wrapper_2">
                  <text class="font_4">{{ item.text }}</text>
                </div>
              </div>
            </div>
          </div>
          <div class="font_1" style="padding-top: 20px">宠友分享</div>
        </div>
      </div>
      <div v-show="Recommended">
        <Waterfall />
      </div>
      <!-- 关注 -->
      <div v-show="!Recommended" class="page">
        <Waterfall :followList="followedAuthors" />
        <Empty v-show="followedAuthors.length == 0" class="animate__animated animate__fadeInRight" type="message"
          tip="还没有关注的宠友,快去关注吧" style="padding-bottom: 400px;" />
      </div>
    </div>
  </div>
  <top-fab />
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue';
import { getPetDetailData } from '@/api/home.js'
import getImageUrl from "@/utils/getImageUrl.js";
import { useRouter } from "vue-router";
import Waterfall from './Waterfall.vue'
import TopFab from '../../components/TopFab.vue'
import Empty from '../../components/Empty.vue'
import useUserInfoStore from "@/store/user.js";
import { storeToRefs } from "pinia";
const userInfoStore = useUserInfoStore();

const { collectList, followedAuthors } = storeToRefs(userInfoStore);
const router = useRouter();
const Recommended = ref(true);
const startData = reactive({
  clientX: "",
  clientY: "",
});
const learningItems = [
  { text: '#狸花猫的品种', class: 'flex-col justify-start equal-division-item' },
  { text: '#宠物猫的寿命', class: 'flex-col justify-start equal-division-item_2' }
]


const navToPublish = () => {
  router.push('/publishpage');
};
onMounted(() => {
  getpet();
});

const petList = reactive([]);
const starList = reactive([]);
const getpet = async () => {
  // 临时变量来存储新数据
  const tempPetList = [];
  const tempStarList = [];

  for (let i = 0; i < 4; i++) {
    let randomNumber = Math.floor(Math.random() * 188) + 1;

    let res = await getPetDetailData(randomNumber);
    tempPetList.push(res);
    if (collectList.value.some(item => item.petId === randomNumber)) {
      tempStarList.push({ star: true });
    } else {
      tempStarList.push({ star: false });
    }
  }

  petList.length = 0;
  starList.length = 0;
  petList.push(...tempPetList);
  starList.push(...tempStarList);

  rotateIcon();
};


const goto = (index) => {
  router.push('/learning' + index);
};

const rotateIcon = () => {
  const icon = document.querySelector(".icon-rotate");
  icon.style.transform = "rotate(360deg)";
  setTimeout(() => {
    icon.style.transform = "rotate(0deg)";
  }, 1000);
};
import getDate from "@/utils/getDate.js"

const toggleStar = (item, index) => {
  console.log(starList[index]);
  if (starList[index].star === false) {
    Collect(item, index);
  } else {
    unCollect(item, index);
  }
};
const { proxy } = getCurrentInstance();
const Collect = (item, index) => {
  const data = {
    petId: item.id,
    petName: item.name,
    petEnname: item.englishName,
    time: getDate(),
  };
  collectList.value.unshift(data);
  proxy.$message({
    text: "已加入收藏",
    type: "success",
  });
  starList[index].star = true;
};

const unCollect = (item, index) => {
  collectList.value = collectList.value.filter(collectItem => collectItem.petId !== item.id);
  proxy.$message({
    text: "已取消收藏",
    type: "success",
  });
  starList[index].star = false;
};


const navTopet = (id) => {
  router.push({ name: "petdetail", params: { id } });

};


const Recommendedclick = () => {
  Recommended.value = true;

};

// 明星宠物逻辑
import { useMouseInElement } from '@vueuse/core';
const target = ref(null);
const { x, y, isOutside } = useMouseInElement(target);
const start = (e) => {
  if (!isOutside.value) {
    return;
  }
  startData.clientX = e.changedTouches[0].clientX;
  startData.clientY = e.changedTouches[0].clientY;
}


const end = (e) => {
  if (!isOutside.value) {
    return;
  }
  const subX = e.changedTouches[0].clientX - startData.clientX;
  const subY = e.changedTouches[0].clientY - startData.clientY;
  if (subY > 50 || subY < -50) {
    // 上下滑动
  } else {
    if (subX > 100) {
      Recommended.value = true;
    } else if (subX < -100) {
      Recommended.value = false;
    }
  }
};

</script>

<style scoped>
.page {
  background-color: #fafafa;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}

.icon-rotate {
  margin-right: 24px;
  margin-left: 4px;
  transition: transform 1s ease;
}

.space-y-12>div:not(:first-child),
.space-y-12>text:not(:first-child),
.space-y-12>image:not(:first-child) {
  margin-top: 12px;
}

.section {
  padding: 32px 0 8px 25px;
}



.space-x-26>div:not(:first-child),
.space-x-26>text:not(:first-child),
.space-x-26>image:not(:first-child) {
  margin-left: 27px;
}

@keyframes fontAnimation {
  from {
    font-size: 17px;
    font-weight: 400;
  }

  to {
    font-size: 22px;
    font-weight: 600;
  }
}

.Select {
  color: #000000;
  font-size: 22px;
  line-height: 19px;
  font-family: ali;
  animation: fontAnimation 0.3s ease-out;
  font-weight: 600;
}

.unSelect {
  color: #7c7c7c;
  font-size: 17px;
  line-height: 19px;
  font-family: ali;
}

.text {
  color: #000000;
  font-size: 21px;
  line-height: 19px;
}

.font_1 {
  font-size: 18px;
  font-family: ali;
  color: #323943;
  font-weight: 600;
}

.group_2 {
  margin-top: 31px;
}

.space-y-14>div:not(:first-child),
.space-y-14>text:not(:first-child),
.space-y-14>image:not(:first-child) {
  margin-top: 15px;
}

.horiz-list {
  overflow-x: scroll;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
  padding-right: 25px;
}

.space-x-24>div:not(:first-child),
.space-x-24>text:not(:first-child),
.space-x-24>image:not(:first-child) {
  margin-left: 25px;
}

.horiz-list-item_2 {
  padding: 12px 21px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 3px 8px #eaeaea80;
  height: 178px;

}

.space-y-11>div:not(:first-child),
.space-y-11>text:not(:first-child),
.space-y-11>image:not(:first-child) {
  margin-top: 11px;
}

.image_2 {
  border-radius: 50%;
  width: 72px;
  height: 72px;
}

.font_2 {
  font-size: 14px;
  line-height: 14px;
  color: #000000;
}

.font_21 {
  font-size: 12px;
  line-height: 11px;
  color: #fdd300;
}

.font_3 {
  font-size: 12px;
  line-height: 12px;
  color: #7c7c7c;
}

.button {
  background-color: #fdd300;
  border-radius: 12px;
  box-shadow: 0px 2px 4px #fff2b1;
  height: 25px;
}

.button1 {
  border-radius: 12px;
  box-shadow: 0px 0 6px #fff2b1;
  height: 25px;
  border: 2px solid #fdd300;
}

.horiz-list-item {
  margin-bottom: 2px;
  padding: 98px 21px 12px;
  flex: 1 0 116px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 3px 8px #eaeaea80;
  height: 179px;
}

.div {
  margin-top: 33px;
}

.pos {
  position: absolute;
  right: -109px;
  top: 12px;
}

.group_3 {
  margin-right: 23px;
  margin-top: 23px;
}

.space-y-16>div:not(:first-child),
.space-y-16>text:not(:first-child),
.space-y-16>image:not(:first-child) {
  margin-top: 17px;
}

.space-x-4>div:not(:first-child),
.space-x-4>text:not(:first-child),
.space-x-4>image:not(:first-child) {
  margin-left: 4px;
}

.text_4 {
  color: #7c7c7c;
}

.image_3 {
  width: 6px;
  height: 11px;
}

.space-x-19>div:not(:first-child),
.space-x-19>text:not(:first-child),
.space-x-19>image:not(:first-child) {
  margin-left: 20px;
}

.equal-division-item {
  padding-top: 79px;
  flex: 1 1 160px;
  border-radius: 12px;
  filter: drop-shadow(0px 3px 4px #eaeaea80);
  background-image: url("@/assets/images/community/2.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 109px;
}

.text-wrapper_2 {
  padding: 10px 0;
  background-color: #0000003d;
  border-radius: 0px 0px 12px 12px;
}

.font_4 {
  font-size: 12px;
  line-height: 11px;
  color: #ffffff;
}

.equal-division-item_2 {
  padding-top: 79px;
  flex: 1 1 160px;
  border-radius: 12px;
  filter: drop-shadow(0px 3px 4px #eaeaea80);
  background-image: url("@/assets/images/community/1.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 109px;
}
</style>