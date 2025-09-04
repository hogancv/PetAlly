<template>
  <my-mask :show="maskShow" @click="maskShow = false">
    <Loading />
  </my-mask>
  <div class="container">
    <div class="box">
      <div class="title flex-row justify-center animate__animated" :class="{ animate__fadeInDown: active == 1 }">
        {{ timu.title }}</div>

      <div class="flex-col">
        <div class="uibox animate__animated" :class="{
          animate__fadeInDown: active == 1,
          select: data[num].select1,
        }" :style="{
          'animation-delay': '0.3s',
        }" @click="click(1)" style="animation-delay: 0.3s">{{ timu.A }}</div>
        <div class="uibox animate__animated" :class="{
          animate__fadeInDown: active == 1,
          select: data[num].select2,
        }" @click="click(2)" style="animation-delay: 0.6s">{{ timu.B }}</div>
        <div class="uibox animate__animated" :class="{
          animate__fadeInDown: active == 1,
          select: data[num].select3,
        }" @click="click(3)" style="animation-delay: 0.9s">{{ timu.C }}</div>
      </div>
      <div class="flex-row justify-center">
        <div class="uibox1 animate__animated" :class="{ animate__fadeIn: active == 1 }" style="animation-delay: 1.2s"
          @click="down">上一题</div>
        <div class="uibox1 animate__animated" :class="{ animate__fadeIn: active == 1 }" style="animation-delay: 1.2s"
          @click="up">下一题</div>
      </div>

      <div class="box1 flex-row justify-center animate__animated" :class="show ? 'animate__fadeInDown' : ''">
        <button class="btn" type="button" v-if="show" @click="submit">
          <strong>提交</strong>
          <div id="container-stars">
            <div id="stars"></div>
          </div>

          <div id="glow">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </button>
        <div style="width: 13rem; height: 3rem" v-else> </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyMask from '@/components/MyMask.vue'
import Loading from '@/components/Loading.vue'
import { ref, onMounted, reactive } from 'vue';
const maskShow = ref(false);
const data = ref([
  {
    id: 1,
    title: "您希望的饲养环境是？",
    A: "室内",
    B: "室外",
    C: "都可",
    select1: false,
    select2: false,
    select3: false,
  },
  {
    id: 2,
    title: "想要什么难度级别？",
    A: "简单",
    B: "中等",
    C: "复杂",
    select1: false,
    select2: false,
    select3: false,
  },
  {
    id: 3,
    title: "希望与您的亲密度？",
    A: "独立",
    B: "一般",
    C: "亲密",
    select1: false,
    select2: false,
    select3: false,
  },
  {
    id: 4,
    title: "宠物的活动水平？",
    A: "低级",
    B: "中级",
    C: "高级",
    select1: false,
    select2: false,
    select3: false,
  },
  {
    id: 5,
    title: "希望的宠物食性？",
    A: "杂食",
    B: "肉食",
    C: "草食",
    select1: false,
    select2: false,
    select3: false,
  },
  {
    id: 6,
    title: "为什么要养宠物？",
    A: "陪伴",
    B: "保护",
    C: "娱乐",
    select1: false,
    select2: false,
    select3: false,
  },
]);

const timu = ref([]);
const num = ref(0);
const active = ref(0);
const my_select = ref([" ", " ", " ", " ", " ", " "]);
const show = ref(false);
const result = reactive(
  {
    data: [],
    id: 1,
    date: "",
  }
);

onMounted(() => {
  data.value.sort(() => Math.random() - 0.5);
  timu.value = data.value[0];
  active.value = 1;
  setTimeout(() => {
    active.value = 0;
  }, 1800);
});

const click = (i) => {
  my_select.value[num.value] = i;
  data.value[num.value].select1 = false;
  data.value[num.value].select2 = false;
  data.value[num.value].select3 = false;
  data.value[num.value]["select" + i] = true;
  if (num.value === 5) {
    show.value = true;
  }
  console.log(my_select.value);
};
import { getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
const up = () => {
  if (num.value === 5) {
    proxy.$message({
      text: "这是最后一题",
      type: "error",
    });
    return;
  }
  num.value++;
  timu.value = data.value[num.value];
  active.value = 1;
  setTimeout(() => {
    active.value = 0;
  }, 1800);
};

const down = () => {
  num.value--;
  if (num.value < 0) {
    proxy.$message({
      text: "这是第一题",
      type: "error",
    });
    num.value = 0;
  }
  timu.value = data.value[num.value];
};
import getDate from "@/utils/getDate.js"
import { useRouter } from 'vue-router';
import useUserInfoStore from "@/store/user.js";
import { storeToRefs } from 'pinia';
const userInfoStore = useUserInfoStore();
const { recommendationHistory } = storeToRefs(userInfoStore);
const router = useRouter();

const submit = () => {
  let sum = 0;
  for (let i = 0; i < my_select.value.length; i++) {
    const exponent = 6 - data.value[i].id;
    const power = Math.pow(2, exponent);
    sum += my_select.value[i] * power;
  }
  const finalResult = sum % 188;
  for (let i = 0; i < my_select.value.length; i++) {
    const tmp = {
      title: data.value[i].title,
      select: data.value[i][String.fromCharCode(64 + parseInt(my_select.value[i]))],
    };
    result.data.push(tmp);
  }
  result.id = finalResult;
  result.date = getDate();
  console.log(result);
  recommendationHistory.value.unshift(result);
  maskShow.value = true;
  setTimeout(() => {
    router.push({ name: 'petcard', query: { id: finalResult } });
  }, 1000);
};
</script>
<style scoped>
.container {
  margin: 0;
  width: 100%;
  height: calc(100vh - 48px);
  color: #fff;
  background-image: url("@/assets/images/home/function/backdrop.png");
  background-size: 100% 100%;
  background-repeat: repeat-y;
  animation: scrollBackground 40s linear infinite;
}

.container::before {
  content: "";
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.38);
  /* 半透明黑色遮罩 */
  z-index: 1;
  /* 确保遮罩在内容下方 */
  pointer-events: none;
  /* 确保遮罩不影响点击事件 */
}

@keyframes scrollBackground {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 0 -844px;
  }
}

.box1 {
  position: relative;
  top: 12vh;
  border-radius: 8px;
  font-size: 20px;
  width: 50vw;
  margin: 0 auto;
}

.uibox {
  border-radius: 12px;
  border: 2px solid #eee;
  padding: 10px;
  font-size: 20px;
  margin: 26px;
  text-align: center;
}

@property --rotate {
  syntax: "<angle>";
  initial-value: 88deg;
  inherits: false;
}

.select {
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.247);
  background: linear-gradient(45deg, #03a9f4, #faf19f, #fd86cf, #03a9f4);
  background-size: 600%;
  animation: animate 8s linear infinite;
}

@keyframes animate {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 400%;
  }
}

.box {
  width: 80vw;
  border-radius: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px 30px 0;
  border: 3px solid #eee;
  backdrop-filter: blur(5px);
  z-index: 2;
}

.uibox1 {
  border-radius: 12px;
  border: 2px solid #eee;
  padding: 10px;
  font-size: 20px;
  margin: 10px 26px -10px;
  text-align: center;
}

.title {
  font-size: 22px;
  margin-top: 16px;
  font-weight: bold;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13rem;
  overflow: hidden;
  height: 3rem;
  background-size: 300% 300%;
  backdrop-filter: blur(1rem);
  border-radius: 12px;
  transition: 0.5s;
  animation: gradient_301 5s ease infinite;
  border: double 4px transparent;
  background-image: linear-gradient(#212121, #212121),
    linear-gradient(137.48deg,
      #ffdb3b 10%,
      #fe53bb 45%,
      #8f51ea 67%,
      #0044ff 87%);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

#container-stars {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: 0.5s;
  backdrop-filter: blur(1rem);
  border-radius: 8px;
}

strong {
  z-index: 2;

  font-size: 16px;
  letter-spacing: 5px;
  color: #ffffff;
  text-shadow: 0 0 2px white;
}

#glow {
  position: absolute;
  display: flex;
  width: 12rem;
}

.circle {
  width: 100%;
  height: 30px;
  filter: blur(2rem);
  animation: pulse_3011 4s infinite;
  z-index: -1;
}

.circle:nth-of-type(1) {
  background: rgba(254, 83, 186, 0.636);
}

.circle:nth-of-type(2) {
  background: rgba(142, 81, 234, 0.704);
}

.btn #container-stars {
  z-index: 1;
  background-color: #212121;
}

.btn {
  transform: scale(1.1);
}

.btn:active {
  border: double 4px #fe53bb;
  background-origin: border-box;
  background-clip: content-box, border-box;
  animation: none;
}

.btn:active .circle {
  background: #fe53bb;
}

#stars {
  position: relative;
  background: transparent;
  width: 200rem;
  height: 200rem;
}

#stars::after {
  content: "";
  position: absolute;
  top: -10rem;
  left: -100rem;
  width: 100%;
  height: 100%;
  animation: animStarRotate 90s linear infinite;
}

#stars::after {
  background-image: radial-gradient(#ffffff 1px, transparent 1%);
  background-size: 50px 50px;
}

#stars::before {
  content: "";
  position: absolute;
  top: 0;
  left: -50%;
  width: 170%;
  height: 500%;
  animation: animStar 60s linear infinite;
}

#stars::before {
  background-image: radial-gradient(#ffffff 1px, transparent 1%);
  background-size: 50px 50px;
  opacity: 0.5;
}

@keyframes animStar {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-135rem);
  }
}

@keyframes animStarRotate {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0);
  }
}

@keyframes gradient_301 {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

@keyframes pulse_3011 {
  0% {
    transform: scale(0.75);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(0.75);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}
</style>
