<template>
    <div class="page">
        <img class="bg-set" v-if="imageList[currentIndex]" :src="imageList[currentIndex]"></img>

        <!-- 无识别结果时显示 -->
        <div v-if="isNoPet" class="no-pet-container">
            <img :src="defaultImage" class="swiper-itemImage" />
            <div class="box active">
                <div style="text-align: center; font-size: 20px; font-weight: bold">提示</div>
                <div class="text2">未识别到宠物信息，请尝试上传其他宠物图片。</div>
            </div>
        </div>

        <!-- 有识别结果时显示 -->
        <t-swiper v-else v-model="currentIndex" class="swiper" :autoplay=false :navigation="{ type: 'dots-bar' }">
            <t-swiper-item v-for="(item, index) in IdentificationResult" :key="index">
                <Transition>
                    <img :src="item.baike_info.image_url || defaultImage" class="swiper-itemImage"
                        v-show="currentIndex === index" />
                </Transition>

                <div class="text" :class="currentIndex === index ? 'active' : ''">{{ item.name }}</div>
                <div class="text1" :class="currentIndex === index ? 'active' : ''">匹配度: {{ (item.score * 100).toFixed(1)
                    }}%
                </div>

                <div class="box" :class="currentIndex === index ? 'active' : ''">
                    <div style="text-align: center; font-size: 20px; font-weight: bold">简介</div>
                    <div class="text2">{{ item.baike_info.description }}</div>
                </div>
            </t-swiper-item>
        </t-swiper>
    </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, shallowRef, computed } from 'vue';
import { useRoute } from 'vue-router';

const IdentificationResult = shallowRef([]);
const currentIndex = ref(0); // 当前显示图片
const imageList = ref([]);
const defaultImage = ref('src/assets/images/logo_transparent.png'); // 默认图片

// 计算属性：是否为无宠物识别结果
const isNoPet = computed(() => {
    return IdentificationResult.value.length === 0;
});

const route = useRoute();
const { proxy } = getCurrentInstance();
onMounted(() => {
    const options = route.query;
    // 解析传入的数据
    try {
        const parsedData = JSON.parse(options.data);
        IdentificationResult.value = Array.isArray(parsedData) ? parsedData : [];
    } catch (e) {
        IdentificationResult.value = [];
        console.error("解析识别结果出错:", e);
    }

    console.log(IdentificationResult.value);

    // 处理图片列表
    if (isNoPet.value) {
        // 没有识别结果时使用默认图片
        imageList.value = [defaultImage.value];
    } else {
        // 有识别结果时使用识别结果中的图片
        imageList.value = IdentificationResult.value.map(
            (item) => item.baike_info.image_url || defaultImage.value
        );
    }

    // 根据识别结果显示不同消息
    if (isNoPet.value) {
        proxy.$message({
            text: "未识别到宠物",
            type: "error",
        });
    } else {
        proxy.$message({
            text: "识别成功",
            type: "success",
        });
    }
});

</script>
<style scoped>
.v-enter-active {
    animation: run-height 0.8s ease-in-out;
}

@keyframes run-height {
    from {
        height: 30vh;
    }

    to {
        height: 35vh;
    }
}

.swiper-itemImage {
    position: relative;
    margin-top: 37px;
    width: 88vw;
    border-radius: 12px;
    top: -26px;
    height: 35vh;

}

.page {
    margin: 18px 0;
    text-align: center;
}

.text2 {
    font-size: 16px;
    line-height: 24px;
    margin-top: 10px;
    text-indent: 30px;
}

.text {
    position: absolute;
    font: 2em sans-serif;
    color: #fff;
    text-shadow: 0 0 0.5em #000;
    top: 2vh;
    left: 10vw;
    opacity: 0;
}

.text1 {
    position: absolute;
    font: 2em sans-serif;
    color: #fff;
    text-shadow: 0 0 0.5em #000;
    top: 31vh;
    right: 10vw;
    opacity: 0;
}

.box {
    width: 88vw;
    height: 48vh;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 12px;
    margin: 0 auto;
    opacity: 0;
    text-align: justify;
    padding: 20px;
    overflow: auto;
}

.active {
    opacity: 1;
    transition: all 0.5s linear;
}

.swiper {
    width: 100%;
    height: calc(100vh - 68px);
    position: absolute;
}

.bg-set {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(10px);
}

.no-pet-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 68px);
    width: 100%;
    position: absolute;
}
</style>
