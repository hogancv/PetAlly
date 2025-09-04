<template>
    <t-tab-bar v-model="value" class="wrapper" :split="false" @change="change">
        <t-tab-bar-item v-for="item in list" :key="item.value" :value="item.value">
            <template #icon>
                <t-icon :name="item.icon" />
            </template>
        </t-tab-bar-item>
    </t-tab-bar>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Icon as TIcon } from 'tdesign-icons-vue-next'
import { useRouter, useRoute } from 'vue-router'
const value = ref('/')
const list = ref([
    { value: '/', icon: 'home' },
    { value: '/help', icon: 'undertake-hold-up' },
    { value: 'identifytip', icon: 'scan' },
    { value: '/community', icon: 'shutter' },
    { value: '/user', icon: 'user' }
])
const router = useRouter()
const route = useRoute()

watch(
    () => route.path,
    (newPath) => {
        console.log('当前路由为：', newPath)
        value.value = newPath
    },
    { immediate: true }
)

const change = (changeValue) => {
    console.log('触发跳转', changeValue);
    router.push(changeValue)
};


</script>

<style scoped>
.wrapper {
    --td-tab-bar-active-color: #f7acac;
    --td-tab-bar-color: #afacac;
}
</style>