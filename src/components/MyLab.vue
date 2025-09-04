<template>
  <text class="mytext">{{ message }} </text>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  message: String,
});
</script>

<style scoped>
.mytext {
  font-size: 14px;
  margin: 6px;
  padding: 6px 10px 6px 10px;
  border-radius: 20px;
  background-color: #fafafa;
  color: rgba(0, 0, 0, 0.6);
  display: inline-block;
}
</style>
