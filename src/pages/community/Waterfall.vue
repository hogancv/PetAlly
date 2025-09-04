<template>
    <Waterfallaa :value="data" style="width: 95%;margin: auto;" class="animate__animated animate__fadeInLeft">
        <template v-slot:left="{ leftList }">
            <div class="demo-warter" v-for="(item, index) in leftList" :key="index" @click="navToDetail(item.post_id)">

                <img class="demo-img animate__animated animate__faster" v-lazy="item.cover_image_url"
                    @load="handleImageLoad">

                <div class="demo-title">
                    {{ item.title }}
                </div>

                <div class="demo-tag flex-row justify-between">
                    <div class="flex-row items-center">
                        <img class="avatar" :src="item.avatar_url" />
                        <text class="text"> {{ item.author_name }} </text>
                    </div>
                    <div class="flex-row items-center">
                        <t-icon name="heart" size="16" color="#909399"></t-icon>
                        <text class="text">{{ item.likes_count }}</text>
                    </div>
                </div>
            </div>
        </template>
        <template v-slot:right="{ rightList }">
            <div class="demo-warter" v-for="(item, index) in rightList" :key="index" @click="navToDetail(item.post_id)">


                <img class="demo-img animate__animated animate__faster" v-lazy="item.cover_image_url"
                    @load="handleImageLoad">
                <div class="demo-title">
                    {{ item.title }}
                </div>

                <div class="demo-tag flex-row justify-between">
                    <div class="flex-row items-center">
                        <img class="avatar" :src="item.avatar_url" />
                        <text class="text"> {{ item.author_name }} </text>
                    </div>
                    <div class="flex-row items-center">
                        <t-icon name="heart" size="16" color="#909399"></t-icon>
                        <text class="text">{{ item.likes_count }}</text>
                    </div>
                </div>
            </div>
        </template>
    </Waterfallaa>

    <div ref="bottom" style="height: 20px;"></div>

</template>


<script setup>
import { ref, onMounted, } from 'vue';
import { getCommunityListData } from '@/api/community.js';
import Waterfallaa from '../../components/MyWaterfall.vue'
import { useIntersectionObserver } from '@vueuse/core';
import { useRouter } from 'vue-router';
const router = useRouter();
const navToDetail = (id) => {
    router.push({
        name: 'communitydetail',
        params: {
            id: id
        }
    });
}

const props = defineProps({
    followList: {
        type: Array,
        default: () => [],
    },
});

const data = ref([]);
const bottom = ref(null);
const loadedPostIds = ref(new Set()); // 用于跟踪已加载的帖子ID

onMounted(() => {
    fetchData();
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const fetchData = async () => {
    const res = await getCommunityListData();
    const filteredRes = props.followList.length > 0 ? res.filter(item => props.followList.includes(item.author_name)) : res;

    // 过滤掉已经加载的帖子
    const newItems = filteredRes.filter(item => !loadedPostIds.value.has(item.post_id));

    if (data.value.length === 0 && newItems.length > 0) {
        const first = newItems.shift();
        data.value = [first];
        loadedPostIds.value.add(first.post_id);
    }

    for (let i = 0; i < newItems.length; i++) {
        let item = newItems[i];
        item.cover_image_url = item.cover_image_url.replace('http://127.0.0.1:8001', import.meta.env.VITE_BASE_URL);
        item.avatar_url = item.avatar_url.replace('http://127.0.0.1:8001', import.meta.env.VITE_BASE_URL);
        loadedPostIds.value.add(item.post_id); // 添加到已加载集合中
    }

    const shuffledRes = shuffle(newItems);
    data.value = [...data.value, ...shuffledRes];
};

const handleImageLoad = (e) => {
    const img = e.target;
    img.classList.remove('animate__fadeIn');
    // 强制重绘（reflow），以便重新触发动画
    void img.offsetWidth;
    img.classList.add('animate__fadeIn');
}

useIntersectionObserver(
    bottom,
    ([{ isIntersecting }]) => {
        if (isIntersecting) {
            fetchData();
        }
    },
    {
        threshold: 0.1,
    }
);

</script>

<style scoped>
.text {
    font-size: 12px;
    color: #666666;
    margin-left: 3px;
}

.avatar {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}

.demo-warter {
    border-radius: 8px;
    margin: 5px;
    background-color: #ffffff;
    padding: 8px;
    position: relative;
}

.u-close {
    position: absolute;
    top: 17px;
    right: 17px;
}

.demo-img {
    border-radius: 12px;
    width: 40vw;
}


.demo-title {
    font-size: 14px;
    margin-top: 5px;
}

.demo-tag {
    display: flex;
    margin-top: 5px;
}

.demo-tag-owner {
    color: #ffffff;
    display: flex;
    align-items: center;
    padding: 2px 7px;
    border-radius: 26px;
    font-size: 10px;
    line-height: 1;
}

.demo-tag-text {
    margin-left: 10px;
    border-radius: 26px;
    line-height: 1;
    padding: 2px 7px;
    display: flex;
    align-items: center;
    border-radius: 26px;
    font-size: 10px;
}

.demo-price {
    font-size: 16px;
    margin-top: 5px;
}

.demo-shop {
    font-size: 11px;
    margin-top: 5px;
}
</style>
