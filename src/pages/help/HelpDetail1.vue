<template>
  <div>
    <video style="height: 200px; width: 100%" :src="videoSrc" controls></video>

    <div class="page">
      <div class="box">
        <div class="title">项目介绍</div>
        <div class="u-content">
          简介：浙动保武义救助基地的负责人周姐，她曾是美容院的老板，现在她是一百多只狗狗的“妈妈”，小小的一个院子，被她打扫的干干净净，大大小小的狗狗都是她亲手救回、养好的宝贝。
        </div>
        <div class="text2">
          <text class="text0">期望援助:</text>
          <img class="icon" src="@/assets/images/help/bone.png "></img>
          <text class="text3">11200KG</text>
          <img class="icon" src="@/assets/images/help/fishbone.png "></img>
          <text class="text3">8000KG</text>
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
            多年来，周姐一个人照顾着这些狗狗，她亲力亲为打理着基地的大小事宜，院子和室内都打扫的干干净净。一个人救助这么多狗狗实属不易，但她从未感觉到厌烦。可能在别人看来它们只是动物，但每一只狗狗都是周姐的宝贝。</p>
          <img src="@/assets/images/help/p1-1.png" style="border-radius: 10px;width:100%;height:auto;" />

          <p style="text-indent: 2em;">
            小金毛亮仔是基地里一只特殊的狗狗，它被伤害、抛弃，却还是用它温暖的笑容面对这个世界。周姐说：“亮仔是从一家建材店的门口救助的，发现它时，它已经饿了好几天了。再仔细看，我发现小金毛的眼睛灰蒙蒙的，原来它看不见。”而亮仔虽然看不见，但它永远挂着大大的笑容。我们无比的希望有人能够爱它，给它一个真正的家。
          </p>
          <img src="@/assets/images/help/p1-2.png" style="border-radius: 10px;width:100%;height:auto;" />

          <p style="text-indent: 2em;">
            周姐的小院里，接收的不仅仅是流浪狗，还有着被人伤害的毛孩子。周姐将它们当成自己的孩子，因为她知道如果自己不去保护它们，那它们将无依无靠。拯救一条生命哪是那么容易的事情，但周姐一直坚持到现在，并将继续往前。</p>
          <img src="@/assets/images/help/p1-3.png" style="border-radius: 10px;width:100%;height:auto;" />

          <p style="text-indent: 2em;">
            基地随着狗狗数量的增加，每天的狗粮也是刚需，这对于周姐来说也是一笔巨大的开销。为了不让狗狗挨饿，她也是想尽办法，可以说是付出全部精力去照顾这些狗狗。我们了解了基地的情况后，立即开展“援助计划”，即向基地送去狗粮。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const videoSrc = import.meta.env.VITE_VIDEO_URL + '/1.mp4'
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
