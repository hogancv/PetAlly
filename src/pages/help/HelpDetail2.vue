<template>
  <div>
    <video style="height: 200px; width: 100%" :src="videoSrc" controls></video>

    <div class="page">
      <div class="box">
        <div class="title">项目介绍</div>
        <div class="u-content">
          简介：杭州的思密达流浪动物救助基地位于余杭区的一座园林里，唐老师为了让狗狗们获得自由广阔的活动空间，让被救助的狗狗也能快乐的在林子里奔跑，所以将基地建在了一座小小的园林里。
          在这里的狗狗获得的不仅仅是活下来的机会，还有自由生活、等待被爱。志愿者阿姨说：”其实狗像孩子一样”。
        </div>
        <div class="text2">
          <text class="text0">期望援助:</text>
          <img class="icon" src="@/assets/images/help/bone.png "></img>
          <text class="text3">13800KG</text>
          <img class="icon" src="@/assets/images/help/fishbone.png "></img>
          <text class="text3">11400KG</text>
        </div>
        <div class="flex-row items-center">
          <text class="text0">完成进度:</text>
          <t-progress theme="plump" :percentage="100" color="var(--primary-color)" style="flex:1;margin-left: 8px;" />
        </div>
      </div>
      <div class="box">
        <div class="title">进展回顾</div>
        <div class="u-content">
          <p style="text-indent: 2em;">
            思密达流浪动物基地里的狗狗都被唐老师细致的分区隔开，狗狗们的活动空间并不狭小，它们都能够跑动，精神状态也很不错，非常有活力。唐老师的小木屋也用来安置狗狗，它们的数量并不是一个小数目。唐老师说：“基地里的很多狗狗都是被抛弃的，有的狗狗是因为皮肤病，主人不想治疗，直接把它们丢了，有的狗狗则是因为单纯的不被喜欢了。”它们有些仍然对人类抱有信任，想要和我们一起玩，想要被喜欢。它们想要爱，但却害怕再次被我们伤害。
          </p>
          <img src="@/assets/images/help/p2-1.png" style="border-radius: 10px;width:100%;height:auto;" />
          <p style="text-indent: 2em;">
            基地里的大多数狗狗都是田园犬，甚至也有像拉布拉多、阿拉斯加或者是萨摩耶、边牧等品种狗，它们遭受了同样的命运，被伤害遗弃，最终来到了唐老师这里，有了落脚之地，有了家。照顾几百只狗狗的吃衣住并不是一件简单的事情，但是唐老师依然坚持着承担这份沉重的责任。我们可能无法做到像这样付出那么多，但是我们的理解、关注和举手之劳都是能够帮助她们的力量。
          </p>
          <img src="@/assets/images/help/p2-2.png" style="border-radius: 10px;width:100%;height:auto;" />
          <p style="text-indent: 2em;">我们了解了基地的情况后，不断采购狗粮送往唐老师的基地。同时，我们也通过网络平台发布了流浪动物领养，希望这些狗狗们都能被重新地爱、更好地爱。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const videoSrc = import.meta.env.VITE_VIDEO_URL + '/2.mp4'
</script>

<style scoped>
  .page {
    height: 100%;
    width: 100%;
    background-color: #ddeef8;
    padding: 5px 10px 10px;
    margin-top: -4px;
  }

  .u-content {
    font-size: 15px;
    color: #606266;
    line-height: 1.8;
    text-align: left;
    overflow: hidden;
  }

  .box {
    margin-top: 10px;
    background-color: white;
    border-radius: 10px;
    padding: 12px 15px;
  }

  .title {
    font-size: 19px;
    font-weight: bold;
    line-height: 36px;
  }

  .text {
    font-size: 12px;
    line-height: 20px;
    color: #666666;
  }

  .text0 {
    font-size: 14px;
  }

  .text2 {
    line-height: 40px;
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-top: 6px;
  }

  .icon {
    width: 26px;
    height: 26px;
    margin-left: 10px;
    background-color: #ffd2d2;
    border-radius: 50%;
  }

  .text3 {
    margin-left: 10px;
    font-size: 12px;
  }
</style>
