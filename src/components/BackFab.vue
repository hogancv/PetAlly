<template>
    <t-fab v-show="computedFabShow" :icon="iconFunc" @click="fabClick" />
</template>

<script setup>
    import { ref, computed, onMounted, onUnmounted } from "vue";
    import { useRouter } from "vue-router";
    import { h } from 'vue';
    import { RollbackIcon } from 'tdesign-icons-vue-next';
    const iconFunc = () => h(RollbackIcon, { size: '24px' });

    const props = defineProps({
        fabShow: {
            type: Boolean,
            default: null
        }
    });

    const router = useRouter();
    const fabShow = ref(false);
    const fabClick = () => {
        router.go(-1)
    };

    // 计算属性，根据 props.fabShow 的值决定是否显示 fab
    // 传入true则一直显示
    const computedFabShow = computed(() => {
        return props.fabShow !== null ? props.fabShow : fabShow.value;
    });

    // 滚动事件处理函数，根据滚动位置决定 fabShow 的值
    // 48顶部导航栏高度
    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        if (scrollTop >= 48) {
            fabShow.value = true;
        } else {
            fabShow.value = false;
        }
    };

    onMounted(() => {
        if (props.fabShow === null) {
            window.addEventListener("scroll", handleScroll);
        }
    });

    onUnmounted(() => {
        if (props.fabShow === null) {
            window.removeEventListener("scroll", handleScroll);
        }
    });
</script>

<style scoped></style>