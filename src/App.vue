<script setup>
  import NavBar from "@/layout/NavBar.vue";
  import TabBar from "@/layout/TabBar.vue";
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  const route = useRoute();
  const navbarShow = computed(() => {
    return route.meta.navbarTitle || false;
  });

  const tabbarShow = computed(() => {
    return route.meta.hidetabbar || false;
  });
</script>

<template>
  <nav-bar v-if="navbarShow" style="width: 100%"></nav-bar>
  <div :style="navbarShow ? { paddingTop: '48px' } : {}">
    <router-view />
  </div>
  <tab-bar v-if="!navbarShow && !tabbarShow" />
</template>

<style scoped></style>
