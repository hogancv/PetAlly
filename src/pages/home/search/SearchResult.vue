<template>
  <div v-for="(item, index) in petList.list" :key="index" class="flex-row container" @click="navTopetdetail(item.id)">
    <img :src="getImageUrl(item.englishName)" class="img" />
    <div class="flex-col justify-evenly" style="width: 38%">
      <div class="text">
        <div style="font-weight: bold">宠物名称:</div>
        <div style="line-height: 30px">{{
          item.name
        }}</div>
      </div>
      <div class="text">
        <div style="font-weight: bold">英文名称:</div>
        <div class="text1">{{
          item.englishName ? item.englishName : "不详"
        }}</div>
      </div>
    </div>
  </div>
  <Empty v-if="petList.list.length == 0" type="empty" tip="暂无数据" />
</template>

<script setup>
  import getImageUrl from '@/utils/getImageUrl.js';
  import { useRouter } from 'vue-router';
  import Empty from '../../../components/Empty.vue'
  const props = defineProps({
    petList: {
      required: true
    }
  })


  const router = useRouter();
  const navTopetdetail = (id) => {
    router.push({ name: "petdetail", params: { id } });
  };
</script>



<style scoped>
  .container {
    border-bottom: 2px solid #e9e9e9;
    margin: 0px 10px;
  }


  .img {
    width: 50%;
    border-radius: 12px;
    margin: 6px;
  }

  .text {
    font-size: 18px;
    font-family: ali;
  }

  .text1 {
    font-size: 16px;
  }
</style>
