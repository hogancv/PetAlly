<template>
    <div :class="['box', boxClass]">
        <div class="flex-row justify-between items-center">
            <div class="flex-row">
                <img class="image1" :src="imageSrc" style="margin-top: 6px" />
                <text style="font-weight: bold" class="text2">{{ title }}</text>
            </div>
            <t-icon name="chevron-right" size="18" style="color: #7c7c7c; margin-top: 6px" />
        </div>
        <div style="padding: 8px 8px 0px">
            <t-progress theme="plump" :percentage="100" color="var(--primary-color)" style="display: block" />
        </div>
        <div class="flex-row justify-between" style="margin: 8px">
            <div class="text7">
                <text class="text8">{{ targetWeight }}</text>
                <text class="text6">期望目标</text>
            </div>
            <div class="text7">
                <text class="text8">{{ totalWeight }}</text>
                <text class="text6">总筹重量</text>
            </div>
            <div class="text7">
                <text class="text8">{{ participants }}</text>
                <text class="text6">参与人数</text>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        id: Number,
        boxClass: String,
        imageSrc: String,
        title: String,
        targetWeight: String,
        totalWeight: String,
        participants: String
    });

</script>

<style scoped>
    .box {
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, #f7f0f0, #ddeef8);
        padding: 10px;
        border-radius: 12px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    }

    .box1 {
        width: 100%;
        height: 100%;
        padding: 10px;
        border-radius: 12px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        margin-top: 15px;
        background: linear-gradient(rgb(255, 252, 196), rgb(251, 241, 241));
    }

    .image1 {
        width: 31px;
        height: 31px;
        border-radius: 50%;
        margin: 0 6px;
    }

    .text2 {
        line-height: 21px;
        display: flex;
        align-items: center;
        font-size: 14px;
        margin-top: 6px;
    }

    .text7 {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .text8 {
        font-weight: bold;
    }

    .text6 {
        font-size: 10px;
        color: #bbb9b9;
    }
</style>