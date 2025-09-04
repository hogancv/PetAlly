<template>
    <div style="padding: 10px 20px;">
        <t-collapse :value="values" @change="handleChange">
            <t-collapse-panel v-for="( item, index ) in data" :key="index" :value="index" :header="item.date"
                class="collapse">
                <div class="content">
                    <img :src="getImageUrl(item.itemName)" class="img" @click="navTopet(item.id)" />
                    <div v-for="( item, index ) in item.data" :key="index" class="flex-row justify-between"
                        style="padding: 0 20px;">
                        <text class="">{{ index + 1 }}.{{ item.title }}</text>
                        <text class="">您的选择：{{ item.select }}</text>
                    </div>
                </div>
            </t-collapse-panel>
        </t-collapse>
    </div>
    <Empty v-if="data.length == 0" tip="还没有数据哦，快去试试AI推荐吧" />
</template>

<script setup>
    import { ref } from 'vue';
    import getImageUrl from "@/utils/getImageUrl.js";
    import useUserInfoStore from "@/store/user.js";
    import Empty from '../../components/Empty.vue'
    const userInfoStore = useUserInfoStore();
    const data = userInfoStore.recommendationHistory;
    console.log(data)

    import { useRouter } from 'vue-router'
    const router = useRouter()
    const navTopet = (id) => {
        router.push({ name: "petdetail", params: { id } });
    }

    const values = ref([]);
    const handleChange = (val) => {
        values.value = val;
    };
</script>

<style scoped>
    .collapse {
        font-size: 18px;
        border: 2px solid #666;
        border-radius: 10px;
        font-family: ali;
        margin-bottom: 10px;
        --td-collapse-content-padding: 0 16px 16px;
    }

    .img {
        width: 100%;
        height: 200px;
        border-radius: 10px;
    }

</style>