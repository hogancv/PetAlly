<template>
    <div class="pet-diary">
        <Empty v-show="petDiaries.length == 0" type="message" tip="还没有日记，快去记录吧" />
        <div class="diary-list">
            <div v-for="(diary, index) in sortedPetDiaries" :key="diary.id" class="diary-item"
                :style="{ background: getDiaryColor(index) }">
                <div class="diary-date">{{ formatDate(diary.date) }}</div>
                <div class="diary-text">{{ diary.text }}</div>
                <div class="diary-images">
                    <img v-for="(img, index) in diary.images" :key="index" :src="img.url" class="diary-image" />
                </div>
            </div>
        </div>

        <t-fab :icon="iconFunc" :style="{ right: '24px', bottom: '88px' }" @click="showDialog = true" />

        <t-dialog title="添加新日记" :visible.sync="showDialog" :on-close="onDialogClose" class="diary-dialog">
            <t-textarea v-model="diaryText" placeholder="记录与宠物的美好时光..." />
            <div class="upload-section">
                <t-upload v-model="uploadImages" :action="''" :auto-upload="false" theme="image" multiple
                    @onSelectChange="handleImageChange" />
            </div>
            <div class="dialog-footer">
                <t-button @click="onDialogClose">取消</t-button>
                <t-button theme="primary" @click="saveDiary">保存记录</t-button>
            </div>
        </t-dialog>
    </div>

</template>

<script setup>
import Empty from '../../components/Empty.vue'
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import useUserInfoStore from "@/store/user.js";
import { h } from 'vue';
import { AddIcon } from 'tdesign-icons-vue-next';

const route = useRoute();
const iconFunc = () => h(AddIcon, { size: '24px' });
const userInfoStore = useUserInfoStore();
const petId = route.params.id;

const diaryText = ref('');
const uploadImages = ref([]);
const petDiaries = ref([]);
const showDialog = ref(false);

// 添加计算属性，按时间倒序排列日记
const sortedPetDiaries = computed(() => {
    return [...petDiaries.value].sort((a, b) => new Date(b.date) - new Date(a.date));
});

const pastelColors = [
    '#FFE4E1', // 浅粉红
    '#FFF0F5', // 薰衣草紫红
    '#FFE4E6', // 浅玫瑰粉
    '#FFE8F0', // 浅樱桃粉
    '#FFEDF2', // 浅珊瑚粉
    '#FFECF0', // 浅蜜桃粉
];

const getDiaryColor = (index) => {
    return pastelColors[index % pastelColors.length];
};

onMounted(() => {
    petDiaries.value = userInfoStore.getPetDiaries(petId);
});

const handleImageChange = (files) => {
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadImages.value.push(e.target.result);
        };
        reader.readAsDataURL(file.raw);
    });
};

const onDialogClose = () => {
    showDialog.value = false;
    diaryText.value = '';
    uploadImages.value = [];
};

const saveDiary = () => {
    if (!diaryText.value && uploadImages.value.length === 0) return;

    userInfoStore.addPetDiary(petId, {
        text: diaryText.value,
        images: uploadImages.value
    });

    petDiaries.value = userInfoStore.getPetDiaries(petId);
    onDialogClose();
};

const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
</script>

<style scoped>
.diary-list {
    padding: 16px;
}

.diary-item {
    margin-bottom: 16px;
    padding: 16px;
    border-radius: 8px;
    transition: background-color 0.3s ease;
}

.diary-date {
    color: #666;
    font-size: 14px;
    margin-bottom: 8px;
}

.diary-images {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
}

.diary-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
}

.upload-section {
    margin: 16px 0;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
}
</style>
