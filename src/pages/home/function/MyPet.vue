<template>
  <div class="t-tabs">
    <t-tabs default-value="1">
      <t-tab-panel value="1" :destroyOnHide="false">
        <template #label>
          <div>拥有宠物</div>
        </template>
        <Empty v-if="myPetList.length == 0" type="data" tip="快去添加自己的第一只宠物吧！" />
        <div style="height:calc(100vh - 96px);overflow-y: auto;">
          <div class="box flex-row" v-for="(item, index) in myPetList" :key="index" @click="navToPet(item.petId)">
            <img class="Hot_pet" :src="getImageUrl(item.petEnname)" style="" />

            <div class="flex-col justify-evenly" style="width: 40%">
              <div style="font-size: 18px; color: #000; font-family: ali">{{
                item.petName
              }}</div>
              <div style="font-size: 16px; color: #333">{{
                item.petEnname
              }}</div>
              <div style="font-size: 12px; color: #666">{{
                item.time
              }}</div>
            </div>
          </div>
        </div>

      </t-tab-panel>
      <t-tab-panel value="2" :destroyOnHide="false">
        <template #label>收藏宠物</template>
        <Empty v-if="collectList.length == 0" type="collect" tip="还没有收藏的宠物,快去收藏吧！" />
        <div style="height:calc(100vh - 96px);overflow-y: auto;">

          <div class="box flex-row" v-for="(item, index) in collectList" :key="index" @click="navToDetail(item.petId)">
            <img class="Hot_pet" :src="getImageUrl(item.petEnname)" style="" />

            <div class="flex-col justify-evenly" style="width: 40%">
              <div style="font-size: 18px; color: #000; font-family: ali">{{
                item.petName
              }}</div>
              <div style="font-size: 16px; color: #333">{{
                item.petEnname
              }}</div>
              <div style="font-size: 12px; color: #666">{{
                item.time
              }}</div>
            </div>
          </div>
        </div>
      </t-tab-panel>
    </t-tabs>
  </div>
  <back-fab></back-fab>
</template>

<script setup>
import { useRouter } from "vue-router";
import BackFab from "@/components/BackFab.vue";
import Empty from '../../../components/Empty.vue'
import getImageUrl from "@/utils/getImageUrl.js";


import useUserInfoStore from "@/store/user.js";
import { storeToRefs } from "pinia";
const userInfoStore = useUserInfoStore();


const { myPetList, collectList } = storeToRefs(userInfoStore);

const router = useRouter();
const navToPet = (id) => {
  router.push({ name: "petdiary", params: { id } });
};

const navToDetail = (id) => {
  router.push({ name: "petdetail", params: { id } });
};
</script>

<style scoped>
.t-tabs {
  margin-bottom: 16px;
}


.box {
  width: 90vw;
  height: 120px;
  box-shadow: 1px 1px 10px 1px #ccc;
  border-radius: 24px;
  margin: 10px auto;
}

.Hot_pet {
  width: 50%;
  height: 100px;
  border-radius: 24px;
  margin: 10px;
}
</style>
