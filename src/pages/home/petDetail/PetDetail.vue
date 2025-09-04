<template>
  <div>
    <!-- 消息提醒 -->
    <!-- 底部 -->
    <div class="footer flex-row items-center">
      <div class="flex-row">

        <div class="flex-col items-center" style="margin-left: 33px; padding-top: 3px; width: 36px" @click="toggleStar">
          <t-icon :name="star == 0 ? 'star' : 'star-filled'" :style="{ color: star == 0 ? '#a6a2a2' : '#ffce00' }"
            size="24px" />
          <text class="mytext">{{ star == 0 ? '收藏' : '已收藏' }}</text>
        </div>
        <div class="flex-col items-center" style="margin-left: 20px; padding-top: 3px" @click="share">
          <t-icon name="share" style="color: #a6a2a2" size="24px" />

          <text class="mytext">分享</text>
        </div>
      </div>

      <button :class="mypet === 1 ? 'mypet' : 'mybutton'" class="button" @click="toggleMyPet">
        {{ mypet === 1 ? "我的宠物" : "+ 保存至“我的宠物”" }}
      </button>
    </div>
    <!-- 图片预览 -->
    <t-image-viewer class="t-image-viewer" v-model:images="images" v-model:visible="imageviewerVisible"
      v-model:index="imgIndex" show-index />

    <img @click="imageviewerVisible = true" :src="getImageUrl(itemName, 1)" style="width: 100%" />
    <div class="flex-col group_7 space-y-16">
      <div class="flex-col section_2">
        <div class="flex-row items-center group_2 space-x-6">
          <img class="image" src="@/assets/images/home/petDetail/IdentityInformation.png" />
          <text class="font_1">身份信息</text>
        </div>
        <div class="flex-row justify-between items-center section_3">
          <text class="font_2">宠物名字</text>
          <text class="font_3 text">{{ item.name }}</text>
        </div>
        <div class="flex-row justify-between items-center group_3">
          <text class="font_2">宠物英文名</text>
          <div class="font_3 text_2">{{ item.englishName }}</div>
        </div>
        <div class="flex-row justify-between items-center section_3">
          <text class="font_2">性格特点</text>
          <text class="font_3 text">{{ item.temperament }}</text>
        </div>
        <div class="flex-row justify-between items-center group_3">
          <text class="font_2">祖籍</text>
          <text class="font_3 text_2">{{ item.origin }}</text>
        </div>
        <div class="flex-row justify-between items-center section_3">
          <text class="font_2">品种</text>
          <text class="font_3 text">{{ item.breed }}</text>
        </div>
        <div class="flex-row justify-between items-center group_3">
          <text class="font_2">平均寿命</text>
          <text class="font_3 text_2">{{ item.aveLifespan }}</text>
        </div>

        <div class="flex-row justify-between items-center section_3">
          <text class="font_2">常见用途</text>
          <text class="font_3 text">{{ item.commonUsers }}</text>
        </div>
        <div class="flex-row justify-between items-center group_3">
          <text class="font_2">喜爱度</text>
          <div style="display: flex">
            <t-icon v-for="(item, index) in item.linkingDegree" :key="index" name="heart-filled"
              style="color: #ffa3c2; margin-right: 8px" size="24px" />
          </div>
        </div>
      </div>
      <div class="flex-col section_5" style="margin-top: 0px">
        <div class="flex-row items-center group_4 space-x-6">
          <t-icon name="image" style="color: #666666" size="23px" />
          <text class="font_1 text_5">{{ item.name }}的图片</text>
        </div>
        <div class="x-auto flex-row">
          <img style="height: 150px; margin-right: 10px; border-radius: 5px" v-for="item in [2, 3, 4]" :key="item"
            @click="changeIndex(item)" :src="getImageUrl(itemName, item)" alt="图片" />
        </div>
      </div>
      <div class="flex-col section_5" style="margin-top: 0px; padding-bottom: 70px">
        <div class="flex-row items-center group_4 space-x-6">
          <img class="image_2" src="@/assets/images/home/petDetail/appearance.png" />
          <text class="font_1 text_5">外貌特征</text>
        </div>
        <div class="flex-row justify-between items-center section_3">
          <text class="font_2">体型</text>
          <text class="font_3 text">{{ item.size }}</text>
        </div>
        <div class="flex-row justify-between items-center group_3">
          <text class="font_2">毛色</text>
          <text class="font_3 text_2">{{ item.coatColor }}</text>
        </div>
        <div class="flex-row justify-between items-center section_3">
          <text class="font_2">毛长</text>
          <text class="font_3 text">{{ item.coatLength }}</text>
        </div>
        <div class="flex-row justify-between items-center group_3">
          <text class="font_2">体重范围</text>
          <text class="font_3 text_2">{{ item.weight }}</text>
        </div>

        <div class="flex-row items-center group_4 space-x-6">
          <img class="image_2" src="@/assets/images/home/petDetail/rice.png" />
          <text class="font_1 text_5">饮食习惯</text>
        </div>
        <div class="flex-row justify-between items-center section_3">
          <text class="font_2">类别</text>
          <text class="font_3 text">{{ item.dietType }}</text>
        </div>
        <div class="flex-row justify-between items-center group_3">
          <text class="font_2">习惯</text>
          <text class="font_3 text_2">{{ item.eatingHabits }}</text>
        </div>
        <div class="flex-row justify-between items-center section_3">
          <text class="font_2">频率</text>
          <text class="font_3 text">{{ item.feedingFrequency }}</text>
        </div>
        <div class="flex-row justify-between items-center group_3">
          <text class="font_2">偏好</text>
          <text class="font_3 text_2">{{ item.foodPreferences }}</text>
        </div>

        <!-- 等级 -->
        <div class="flex-row items-center group_5 space-x-4">
          <img class="image_2" src="@/assets/images/home/petDetail/FeedingInstructions.png" />
          <text class="font_1">饲养须知</text>
        </div>
        <div class="flex-col section_3" style="height: 230px">
          <div class="flex-row justify-center">
            <div class="imgbox">
              <img style="width: 52px; height: 52px" src="@/assets/images/home/petDetail/grade.png" alt="" />
            </div>

            <div class="flex-col">
              <text class="imgtext">饲养难度</text>
              <text class="imgtext1">{{ item.feedingDifficulty }}</text>
            </div>
          </div>
          <div class="justify-around" style="display: flex; margin-top: 5px">
            <div class="flex-row">
              <div class="imgbox">
                <img class="image_3" src="@/assets/images/home/petDetail/water.png" alt="" />
              </div>

              <div class="flex-col">
                <text class="imgtext">饮水情况</text>
                <text class="imgtext1">{{ item.waterCondition }}</text>
              </div>
            </div>

            <div class="flex-row">
              <div class="imgbox">
                <img class="image_3" src="@/assets/images/home/petDetail/fodder.png" alt="" />
              </div>

              <div class="flex-col">
                <text class="imgtext">饲料类型</text>
                <text class="imgtext1">{{ item.foodType }}</text>
              </div>
            </div>
          </div>
          <div class="justify-around" style="display: flex; margin-top: 5px">
            <div class="flex-row">
              <div class="imgbox">
                <img class="image_3" src="@/assets/images/home/petDetail/clean.png" alt="" />
              </div>

              <div class="flex-col">
                <text class="imgtext">清洁需求</text>
                <text class="imgtext1">{{ item.cleaning }}</text>
              </div>
            </div>

            <div class="flex-row">
              <div class="imgbox">
                <img style="width: 42px; height: 42px" src="@/assets/images/home/petDetail/environment.png" alt="" />
              </div>

              <div class="flex-col">
                <text class="imgtext">饲养环境</text>
                <text class="imgtext1">{{ item.housingEnvironment }}</text>
              </div>
            </div>
          </div>
          <div class="justify-around" style="display: flex; margin-top: 5px">
            <div class="flex-row">
              <div class="imgbox">
                <img class="image_3" src="@/assets/images/home/petDetail/treatment.png" alt="" />
              </div>

              <div class="flex-col">
                <text class="imgtext">医疗信息</text>
                <text class="imgtext1">{{ item.healthcare }}</text>
              </div>
            </div>
            <div class="flex-row">
              <div class="imgbox">
                <img style="width: 42px; height: 42px" src="@/assets/images/home/petDetail/temperature.png" alt="" />
              </div>

              <div class="flex-col">
                <text class="imgtext">温度要求</text>
                <text class="imgtext1">{{ item.temperature }}</text>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-row items-center group_4 space-x-6">
          <img class="image_2" src="@/assets/images/home/petDetail/culture.png" />
          <text class="font_1 text_5">动物文化</text>
        </div>
        <div class="flex-row items-center section_3">
          <text class="fogrnt_3" style="width: 100%">{{ item.culture }}</text>
        </div>

        <div class="flex-row items-center group_4 space-x-6">
          <img class="image_2" src="@/assets/images/home/petDetail/classify.png" />
          <text class="font_1 text_5">科学分类</text>
        </div>

        <div class="flex-row justify-between items-center section_3">
          <text class="font_2">纲</text>
          <text class="font_3 text">{{ item.outline }}</text>
        </div>
        <div class="flex-row justify-between items-center group_3">
          <text class="font_2">目</text>
          <text class="font_3 text_2">{{ item.eye }}</text>
        </div>
        <div class="flex-row justify-between items-center section_3">
          <text class="font_2">科</text>
          <text class="font_3 text">{{ item.section }}</text>
        </div>

        <div class="flex-row justify-between items-center group_3">
          <text class="font_2">属</text>
          <text class="font_3 text_2">{{ item.genus }}</text>
        </div>
        <div class="flex-row justify-between items-center section_3">
          <text class="font_2">种</text>
          <text class="font_3 text">{{ item.seed }}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted, getCurrentInstance } from "vue";
  import { useRoute } from "vue-router";
  import { getPetDetailData } from "@/api/home.js";
  import getImageUrl from "@/utils/getImageUrl.js";
  const item = reactive({});
  const itemName = ref("");
  const star = ref(0);
  const mypet = ref(0);
  const route = useRoute();
  import { storeToRefs } from "pinia";
  import useUserInfoStore from "@/store/user.js";
  const userInfoStore = useUserInfoStore();
  const { myPetList, collectList } = storeToRefs(userInfoStore);
  const images = ref([]);

  const getPetDetail = async () => {
    const petDetail = await getPetDetailData(route.params.id);
    Object.assign(item, petDetail);
    for (let key in item) {
      if (item[key] === null) {
        item[key] = "不详";
      }
    }
    item["linkingDegree"] = parseInt(item["linkingDegree"]);
    itemName.value = item["englishName"];
    images.value = [1, 2, 3, 4].map((imageName) =>
      getImageUrl(itemName.value, imageName)
    );
  };

  const imgIndex = ref(0);
  const changeIndex = (index) => {
    imgIndex.value = index - 1;
    imageviewerVisible.value = true;
  };

  onMounted(() => {
    getPetDetail();
    const id = parseInt(route.params.id);
    mypet.value = myPetList.value.some(item => item.petId === id) ? 1 : 0;
    star.value = collectList.value.some(item => item.petId === id) ? 1 : 0;
  });

  const imageviewerVisible = ref(false);

  const { proxy } = getCurrentInstance();

  const toggleStar = () => {
    if (star.value == 0) {
      tostar();
    } else {
      unstar();
    }
  };
  import getDate from '@/utils/getDate.js'

  // 收藏
  const tostar = () => {
    const data = {
      petId: item.id,
      petName: item.name,
      petEnname: item.englishName,
      time: getDate(),
    };
    collectList.value.unshift(data);
    star.value = 1;
    proxy.$message({
      text: "已加入收藏",
      type: "success",
    });
  };

  // 取消收藏
  const unstar = () => {
    collectList.value = collectList.value.filter(collectItem => collectItem.petId !== item.id);
    star.value = 0;
    proxy.$message({
      text: "已取消收藏",
      type: "success",
    });
  };

  const toggleMyPet = () => {
    if (mypet.value == 0) {
      addpet();
    } else {
      deletepet();
    }
  };

  const addpet = () => {
    const data = {
      petId: item.id,
      petName: item.name,
      petEnname: item.englishName,
      time: getDate(),
    };
    myPetList.value.unshift(data);
    mypet.value = 1;
    proxy.$message({
      text: "已加入我的宠物",
      type: "success",
    });

  };

  const deletepet = () => {
    myPetList.value = myPetList.value.filter(petItem => petItem.petId !== item.id);
    mypet.value = 0;
    proxy.$message({
      text: "已移除我的宠物",
      type: "success",
    });
  };

  const share = () => {
    let data = {
      headImgs: [
        getImageUrl("0"),
        getImageUrl("1"),
        getImageUrl("2"),
        getImageUrl("3"),
        getImageUrl("4"),
      ],
      goodsImg: getImageUrl("0"),
      goodsName: item.name + " " + item.englishName,
      recommendCodeGoods: "../../static/image/share/code.png",
      share: {
        shareContent: `我在"宠AI有家"发现了一只${item.name},快来看看吧!`,
        shareImg: getImageUrl("0"),
        shareTitle: item.name + " " + item.englishName,
        shareUrl: "https://yqdbdq.online/",
      },
    };
    uni.navigateTo({
      url: "../../pages/hotPetDetail/share?data=" + JSON.stringify(data),
    });
  };
</script>

<style scoped>
  .page {
    background-color: #f6f7f9;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }


  .t-image-viewer>>>img {
    width: 100%;
  }

  .section {
    background-color: #ffffff;
    height: 14px;
  }

  .mypet {
    background-color: #b9b9b9;
    width: 55%;
    border-radius: 20px;
    color: #fff;
    font-size: 14px;
    border: 0px solid rgba(0, 0, 0, 0.2);
    margin-left: 18px;
    height: 39px;
  }

  .mytext {
    font-size: 10px;
    color: #000000;
  }

  .button {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-right: 33px;
  }

  .mybutton {
    border-radius: 20px;
    background-color: #ffa3c2;
    color: #fff;
    font-size: 14px;
    border: 0px solid rgba(0, 0, 0, 0.2);
    margin-left: 18px;
    height: 39px;

  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #ffffff;
    padding: 10px 0;
    z-index: 999;
    display: flex;
    justify-content: space-between;
  }

  .group_7 {
    padding-top: 15px;
  }

  .space-y-16>div:not(:first-child),
  .space-y-16>text:not(:first-child),
  .space-y-16>image:not(:first-child) {
    margin-top: 16px;
  }

  .imgbox {
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .imgtext {
    color: #666666;
    font-weight: bold;
    font-size: 18px;
  }

  .imgtext1 {
    font-size: 14px;
    color: #000000;
  }

  .image_3 {
    width: 48px;
    height: 48px;
  }

  .section_2 {
    padding-left: 28px;
    padding-right: 23px;
    background-color: #ffffff;
  }

  .group_2 {
    padding: 14px 3px;
  }

  .image {
    width: 20px;
    height: 20px;
  }

  .font_1 {
    font-size: 18px;
    font-family: SourceHanSansCN;
    line-height: 17px;
    color: #333333;
  }

  .section_3 {
    padding: 14px 10px;
    background-color: #f7f9f8;
    border-radius: 5px;
  }

  .font_2 {
    font-size: 14px;
    font-family: SourceHanSansCN;
    line-height: 14px;
    color: #666666;
  }

  .font_3 {
    font-size: 14px;
    font-family: SourceHanSansCN;
    color: #000000;
  }

  .text {
    margin-right: 6px;
  }

  .group_3 {
    padding: 14px 8px 14px 9px;
  }

  .text_2 {
    margin-right: 8px;
  }

  .section_4 {
    padding: 14px 8px;
    background-color: #f7f9f8;
    border-radius: 5px;
  }

  .text_3 {
    margin-right: 8px;
  }

  .text_4 {
    margin-right: 8px;
  }

  .section_5 {
    padding: 0 27px 11px;
    background-color: #ffffff;
  }

  .group_4 {
    padding: 20px 4px 16px;
  }

  .space-x-6>div:not(:first-child),
  .space-x-6>text:not(:first-child),
  .space-x-6>image:not(:first-child) {
    margin-left: 6px;
  }

  .image_2 {
    width: 24px;
    height: 24px;
  }

  .text_5 {
    line-height: 16px;
  }

  .section_6 {
    background-color: #f7f9f8;
    border-radius: 12px;
    overflow: hidden;
    min-height: 94px;
  }

  .group_5 {
    padding: 19px 3px 12px;
  }

  .space-x-4>div:not(:first-child),
  .space-x-4>text:not(:first-child),
  .space-x-4>image:not(:first-child) {
    margin-left: 4px;
  }

  .section_7 {
    padding: 12px 8px;
    background-color: #f7f9f8;
    border-radius: 5px;
  }

  .text_6 {
    margin-right: 8px;
  }

  .group_6 {
    padding: 16px 8px 12px;
  }

  .text_7 {
    margin-right: 8px;
  }

  .section_8 {
    padding: 12px 10px;
    background-color: #f7f9f8;
    border-radius: 5px;
  }

  .section_9 {
    padding: 10px 0;
    background-color: #ffffff;
  }


  .text_9 {
    color: #000000;
    line-height: 16px;
  }
</style>
