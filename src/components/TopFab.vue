<template>
    <t-fab v-show="fabShow" :icon="iconFunc" @click="fabClick" :style=mystyle />
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from "vue";
    import { h } from 'vue';
    import { BacktopIcon } from 'tdesign-icons-vue-next';
    const iconFunc = () => h(BacktopIcon, { size: '24px' });
    const mystyle = "bottom: 98px; right: 16px;";

    const fabShow = ref(false);
    const fabClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        if (scrollTop >= 500) {
            fabShow.value = true;
        } else {
            fabShow.value = false;
        }
    };

    onMounted(() => {
        window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener("scroll", handleScroll);
    });
</script>

<style scoped></style>