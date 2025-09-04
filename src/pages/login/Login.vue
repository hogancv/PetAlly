
<template>
   <div style="font-family: ali;overflow: hidden;">
    <!-- 背景 -->
    <div class="page1" :class="{ show: show2 }">

      <div class="pos">智能识宠</div>
      <div class="text_5 pos_2">AI与宠物零距离,认识从此不再难</div>
    </div>
    
    <!-- 消息提醒 -->
    <my-toast ref="uToast" />

    <!-- 背景 -->
    <img class="backdrop animate__animated animate__fadeIn" style="animation-delay: 0.6s" mode="aspectFill"
      src="@/assets/images/login/login_bg.png"></img>

    <!-- 内容 -->
    <div class="flex-col group space-y-24">
      <text class="self-start text animate__animated animate__fadeInLeft" style="animation-delay: 0.6s">宠AI有家</text>
      <text class="font_1 text_2 animate__animated animate__fadeInLeft" style="animation-delay: 1.2s">
        集宠物图鉴、日记、社区、公益于一体。通过AI智能识别,解决您所有的宠物烦恼。寻找志同道合的宠物伙伴,一起记录美好时光。快加入我们,感受温暖和谐的宠物大家庭!
      </text>

      <!-- 按钮 -->
      <div class="flex-row space-x-26">
        <div class="flex-col justify-start items-center text-wrapper animate__animated animate__fadeInLeft"
          style="animation-delay: 1.7s" @click="Signin()"><text class="text_3">注册</text>
        </div>
        <div class="flex-col justify-start items-center text-wrapper_2 animate__animated animate__fadeInLeft"
          style="animation-delay: 1.8s" @click="show_click()"><text class=" text_4">登录</text></div>

      </div>
    </div>
  </div>
</template>


<script setup>
</script>


<style scoped>
.uni-input {
  border: #babbd6 2px solid;
  border-radius: 14px;
  font-size: 24px;
  text-indent: 0.5em;
  transition: border-color 0.8s ease;
}

.input-color {
  border: #575dfb 2px solid;
}

.text_6 {
  font-size: 30px;
  font-weight: bold;

  margin-left: 46px;
  color: #575dfb;
}

.text_7 {
  font-size: 19px;

  margin-left: 46px;
}

.u-button {
  border-radius: 14px;
  width: 80%;
  margin: 8px auto;
  height: 47px;
}


.page1 {
  background-color: #ffb2a3;

  opacity: 0;
  position: absolute;
  top: -200%;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 3s, top 1s;

}

.page1.show {
  opacity: 1;
  top: -10%;
}


.image {
  width: 179px;
  height: 40px;
}

.pos {
  position: absolute;
  left: 34px;
  top: 134px;
  color: #ffffff;
  font-size: 41px;

}

.text_5 {
  color: #ffffff;
  font-size: 17px;
  line-height: 15px;
}

.pos_2 {
  position: absolute;
  left: 35px;
  top: 191px;
}

.backdrop {
  z-index: -1;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
}

.container {
  height: 520px;
}

.group {
  position: absolute;
  bottom: 9%;
  margin: 0 30px;
}

.space-y-24>div:not(:first-child),
.space-y-24>text:not(:first-child),
.space-y-24>image:not(:first-child) {
  margin-top: 19px;
}

.text {
  color: #ffffff;
  font-size: 46px;
  line-height: 33px;
}


.text_2 {
  line-height: 26px;
}

.font_1 {
  font-size: 17px;
  color: #ffffff;
}

.space-x-26>div:not(:first-child),
.space-x-26>text:not(:first-child),
.space-x-26>image:not(:first-child) {
  margin-left: 27px;
}

.text-wrapper {
  padding: 12px 0;
  flex: 1 1 156px;
  border-radius: 183px;
  height: 40px;
  border: solid 1px var(--primary-color);
}

.text_3 {
  color: var(--primary-color);
  font-size: 18px;
  line-height: 14px;
}

.text-wrapper_2 {
  padding: 12px 0;
  flex: 1 1 156px;
  background-color: var(--primary-color);
  border-radius: 124px;
  height: 40px;
  border: solid 1px var(--primary-color);
}

.text_4 {
  font-size: 18px;
  color: #ffffff;
  line-height: 14px;
}
</style>
