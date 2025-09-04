<template>
    <t-navbar :title="navbarTitle" left-arrow @left-click="handleClick" />
</template>

<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { computed } from 'vue'
    const route = useRoute()
    const router = useRouter()
    const navbarTitle = computed(() => {
        return route.meta.navbarTitle || '默认标题'
    })
    const handleClick = () => {
        router.go(-1)
    }
</script>

<style scoped></style>
