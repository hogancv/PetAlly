<template>
    <div class="text2 justify-between">
        <img class="image" :src="imgSrc" />
        <div style="margin: 0 10px; flex: 1">
            <div class="flex-row justify-between">
                <text class="text5">{{ description }}{{ requiredWeight }}kg</text>
            </div>
            <t-progress theme="plump" :percentage="parseFloat(((currentWeight / requiredWeight) * 100).toFixed(2))"
                color="var(--primary-color)" />
            <div class="flex-row justify-between">
                <text class="text5">已筹重量：{{ currentWeight }}kg</text>
                <text class="text6">{{ participants }}人已参与</text>
            </div>
        </div>
        <t-button theme="primary" shape="round" style="height: 32px" @click="navToJoin(props.type)">参与</t-button>
    </div>
</template>
<script setup>
    import { defineProps } from 'vue';
    import { useRouter } from 'vue-router';
    const props = defineProps({
        imgSrc: String,
        requiredWeight: Number,
        currentWeight: Number,
        participants: Number,
        description: String,
        type: Number
    });
    const router = useRouter();
    const navToJoin = (type) => {
        router.push({
            name: 'join',
            query: {
                type
            }
        });
    }
</script>

<style scoped>
    .text2 {
        line-height: 21px;
        display: flex;
        align-items: center;
        font-size: 14px;
        margin-top: 6px;
    }


    .image {
        width: 42px;
        height: 42px;
        background-color: #ffd2d2;
        border-radius: 50%;
    }

    .text5 {
        font-size: 12px;
    }

    .text6 {
        font-size: 10px;
        color: #bbb9b9;
    }
</style>