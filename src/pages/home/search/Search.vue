<template>
  <div class="flex-col page space-y-29">
    <div class="flex-row items-center">
      <t-dialog v-model:visible="isShowDialog" close-on-overlay-click content="确定清除历史记录吗？" title="提示" cancel-btn="取消"
        :confirm-btn="{ content: '确定', theme: 'danger' }" @confirm="clear">
      </t-dialog>
    </div>
    <t-search v-model="searchVal" placeholder="搜索感兴趣的宠物" shape="round" @submit="search(searchVal)"
      style="padding: 10px 20px 0"></t-search>
    <div class="flex-col group">
      <div class="flex-col space-y-12">
        <div class="flex-row justify-between items-center">
          <text class="font_1">搜索历史</text>
          <!-- 清除 -->
          <img class="image_2" @click="isShowDialog = true" src="@/assets/images/home/search/delete.png" />
        </div>
        <!-- 搜索记录 -->
        <div class="flex-row" style="display: inline">
          <div class="flex-row" style="display: inline" @click="search(item)" v-for="(item, index) in historyData"
            :key="index">
            <my-lab :message="item"></my-lab>
          </div>
          <Empty v-if="historyData.length == 0" type="empty" tip="搜索历史为空,快试试搜索吧" />
        </div>
      </div>
      <div class="flex-col group_2 space-y-14">
        <div class="flex-row space-x-6">
          <text class="font_1">热门搜索</text>
          <img class="image_2" src="@/assets/images/home/search/hot.png" />
        </div>
        <div class="flex-col">
          <!-- 热门搜索 -->
          <div class="flex-row" style="display: inline">
            <div class="flex-row" style="display: inline" @click="search(item)" v-for="(item, index) in hotList"
              :key="index">
              <my-lab :message="item"></my-lab>
            </div>
          </div>
        </div>
        <text class="font_1">猜你喜欢</text>

        <div>
          <img v-for="(item, index) in likePetList" :key="index" class="image_3" :src="getImageUrl(item?.englishName)"
            @click="navTopetdetail(item.id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import MyLab from "@/components/MyLab.vue";
  import { ref, reactive, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import useUserInfoStore from "@/store/user.js";
  import { storeToRefs } from "pinia";
  import { getPetListData, getPetDetailData } from "@/api/home.js";
  import getImageUrl from "@/utils/getImageUrl.js";
  import Empty from '../../../components/Empty.vue'

  const isShowDialog = ref(false);


  const hotList = [
    "柯基",
    "金毛",
    "蓝猫",
    "柴犬",
    "拉布拉多",
    "比熊",
    "泰迪",
    "萨摩耶",
    "猫",
  ];

  const searchVal = ref("");
  const router = useRouter();
  const userInfoStore = useUserInfoStore();
  const { searchHistory: historyData } = storeToRefs(userInfoStore);

  const clear = () => {
    historyData.value = [];
  };
  const search = async (val) => {
    let petList = await getPetListData(val);
    router.push({ name: "searchresult", query: { q: JSON.stringify(petList) } });
    userInfoStore.addSearchHistory(val);
  };

  const likePetList = ref([]);
  const getlikePetList = async () => {
    for (let i = 0; i < 6; i++) {
      const randomNumber = Math.floor(Math.random() * 188) + 1;
      let petInfo = await getPetDetailData(randomNumber);
      likePetList.value.push(petInfo);
    }
  };

  const navTopetdetail = (id) => {
    router.push({ name: "petdetail", params: { id } });
  };



  onMounted(() => {
    getlikePetList();
  });
</script>
<style scoped>
  .page {
    background-color: #ffffff;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    padding-bottom: 15px;
  }

  .space-y-29>div:not(:first-child),
  .space-y-29>text:not(:first-child),
  .space-y-29>image:not(:first-child) {
    margin-top: 20px;
  }

  .image {
    width: 24px;
    height: 24px;
    margin-left: 20px;
    margin-right: 10px;
  }

  .group {
    padding: 0 24px;
  }

  .image_3 {
    width: 48%;
    height: 140px;
    border-radius: 10px;
    margin-top: 10px;
  }

  .image_3:nth-of-type(odd) {
    margin-right: 10px;
  }

  .space-y-12>div:not(:first-child),
  .space-y-12>text:not(:first-child),
  .space-y-12>image:not(:first-child) {
    margin-top: 12px;
  }

  .font_1 {
    font-size: 18px;
    font-family: SourceHanSansCN;
    line-height: 18px;
    color: #000000;
    font-weight: 800;
    font-family: ali;
  }

  .image_2 {
    width: 18px;
    height: 18px;
  }

  .section {
    background-color: #fafafa;
    width: 36px;
    height: 26px;
  }

  .section_2 {
    background-color: #fafafa;
    width: 48px;
    height: 26px;
  }

  .section_3 {
    background-color: #fafafa;
    width: 72px;
    height: 26px;
  }

  .section_4 {
    background-color: #fafafa;
    width: 60px;
    height: 26px;
  }

  .div {
    margin-right: 3px;
  }

  .group_2 {
    margin-top: 20px;
  }

  .space-y-14>div:not(:first-child),
  .space-y-14>text:not(:first-child),
  .space-y-14>image:not(:first-child) {
    margin-top: 14px;
  }

  .space-x-6>div:not(:first-child),
  .space-x-6>text:not(:first-child),
  .space-x-6>image:not(:first-child) {
    margin-left: 6px;
  }

  .group_3 {
    padding-bottom: 10px;
  }

  .div_2 {
    margin-right: 3px;
  }

  .text {
    margin-top: 16px;
  }
</style>
