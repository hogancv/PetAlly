<template>
  <my-mask :show="maskShow" @click="maskShow = false">
    <Loading />
  </my-mask>
  <div>
    <t-dialog v-model:visible="isShowDialog" content="确定删除这条分享吗？" title="删除分享" cancel-btn="取消"
      :confirm-btn="{ content: '确认删除', theme: 'danger' }" @confirm="onConfirm">
    </t-dialog>
    <t-button v-if="deleteShow" theme="danger" shape="round" class="follow" :onclick="buttonClick">删除</t-button>
    <t-button v-else theme="primary" shape="round" class="follow" :onclick="toggleFollow" :ghost="follow"> {{
      follow ? '已关注' : '关注' }}</t-button>

    <t-swiper :navigation="{ type: 'fraction', paginationPosition: 'top-right' }" :autoplay="false">
      <t-swiper-item v-for="(item, index) in imageList" :key="index" style="height: 500px">
        <img :src="item" style="width: 100%;" />
      </t-swiper-item>
    </t-swiper>
    <!-- 点赞 -->
    <t-icon name="heart" size="66" color="#333" @click="like = true" v-if="!like"
      style="position: absolute;top: 562px;right: 10px;height: 33px;" />

    <t-icon name="heart-filled" size="66" color="#e99bb2" @click="like = false" v-else
      style="position: absolute;top: 562px;right: 10px;height: 33px;" />

    <!-- 头像 -->
    <div style="margin: 20px; font-size: 15px">
      <div class="flex-row items-center" style="position: absolute;top: 505px;height: 33px;">
        <img :src="data.authorAvatar" style="width: 40px; height: 40px; border-radius: 50%" />
        <div style="font-weight: bold; margin-left: 9px">{{
          data.author
        }}</div>
      </div>
      <div style="font-weight: bold; font-size: 18px; margin-bottom: 10px">{{
        data.title
      }}</div>
      <div v-html="data.content"></div>
    </div>
    <div class="flex-row items-center justify-between" style="margin: 0 20px;font-size: 14px;">
      <div style="color: #666"> 尊重原创,请勿转载</div>

      <div style="color: #666"> 最后修改于 {{ data.updateTime }}</div>
    </div>
    <t-divider content="评论区" />
    <div style="margin: 0 14px" class="flex-row items-center">
      <img :src="avatarUrl" style="width: 33px; height: 33px; border-radius: 50%" />
      <t-input v-model="inputVal" placeholder="发表你的评论" clearable class="input" @confirm="confirm" />
    </div>
    <div class="comment" v-for="(res, index) in commentList" :key="res.id">
      <div class="left">
        <img :src="res.url" />
      </div>
      <div class="right">
        <div class="top">
          <div class="name">{{ res.name }}</div>
          <div class="like" :class="{ highlight: res.isLike }">
            <div class="num">{{ res.likeNum }}</div>
            <t-icon v-if="!res.isLike" name="thumb-up-2" size="18" color="#cdcdcd" @click="getLike(index)" />
            <t-icon v-if="res.isLike" name="thumb-up-2" size="18" color="#ffa3c2" @click="getLike(index)" />
          </div>
        </div>
        <div class="content">{{ res.contentText }}</div>
        <div class="reply-box">
          <div class="item" v-for="(item, index) in res.replyList" :key="item.index">
            <div class="username">{{ item.name }}</div>
            <div class="text">{{ item.contentStr }}</div>
          </div>
          <div class="all-reply" v-if="res.replyList != undefined">
            共{{ res.allReply }}条回复
            <t-icon class="more" name="chevron-right-s" size="26"></t-icon>
          </div>
        </div>
        <div class="bottom">
          {{ res.date }}
          <div class="reply">回复</div>
        </div>
      </div>
    </div>
    <Empty v-if="commentList.length == 0" type="comment" tip="还没有人评论,快来抢沙发吧~" style="padding-bottom: 20px;" />
  </div>
  <t-fab :icon="iconFunc" @click="onClick" />
</template>

<script setup>
import { h } from 'vue';
import { ImageSearchIcon } from 'tdesign-icons-vue-next';
import MyMask from '@/components/MyMask.vue'
import Loading from '@/components/Loading.vue'
import { ref, onMounted, getCurrentInstance } from 'vue';
import Empty from '@/components/Empty.vue'
import useUserInfoStore from "@/store/user.js";
import { getCommunityDetailData, getPublishPage, detelePublish } from '@/api/community.js';
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';
import identifyApi from '@/api/identify.js'

const { proxy } = getCurrentInstance();
const userInfoStore = useUserInfoStore();
const { avatarUrl, userName } = storeToRefs(userInfoStore)
const isShowDialog = ref(false);
const deleteShow = ref(false);
const commentList = ref([]);
const imageList = ref([]);
const data = ref({});
const inputVal = ref("");
const id = ref(0);
const like = ref(false);
const follow = ref(false);
const router = useRouter();
const maskShow = ref(false)
const { IdentifyHistory } = storeToRefs(userInfoStore);
const userStore = useUserInfoStore()


function isFollowing(authorName) {
  return userStore.isFollowing(authorName)
}

const iconFunc = () => h(ImageSearchIcon, { size: '24px' });

const onClick = async () => {
  maskShow.value = true
  const imageUrl = imageList.value[0]

  try {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const reader = new FileReader()

    reader.onloadend = () => {
      const base64data = reader.result
      identify(base64data)
    }

    reader.readAsDataURL(blob)
  } catch (error) {
    console.error('Error fetching and converting image:', error)
  }
}

const identify = async (image) => {
  const res = await identifyApi(image)
  if (res.status === 200) {
    console.log('识别成功:', res.data)
    let data = res.data.result
    data = data.filter(item => item.baike_info?.image_url);
    IdentifyHistory.value.unshift({
      image: image,
      data: data
    })
    router.push({
      name: 'identificationresult',
      query: { data: JSON.stringify(data) }
    })
  } else {
    // 识别失败
    proxy.$message({
      text: '识别失败',
      type: 'error'
    })
  }
  maskShow.value = false
}

const buttonClick = () => {
  isShowDialog.value = true;
}
onMounted(() => {
  id.value = route.params.id;
  fetchData();
});
import { useRoute } from 'vue-router';
const route = useRoute();
const fetchData = async () => {
  const id = route.params.id;
  let res = await getCommunityDetailData(id);
  data.value = res;
  const imageUrls = res.imageList.split(',');
  imageUrls.map((url) => {
    imageList.value.push(url.replace('http://127.0.0.1:8001', import.meta.env.VITE_BASE_URL))
  }
  );
  commentList.value = res.commentList.map((comment) => {
    return {
      ...comment,
      url: getRandomImage(),
    };
  });
  if (data.value.author == userName.value) {
    deleteShow.value = true;
  }
  follow.value = isFollowing(data.value.author)
}

const toggleFollow = () => {
  userStore.toggleFollow(data.value.author)
  if (!follow.value) {
    follow.value = true;
    proxy.$message({
      text: "已关注"
    });
  } else {
    follow.value = false;
    proxy.$message({
      text: "已取消关注"
    });
  }
};
const onConfirm = async () => {
  isShowDialog.value = false;
  let res = await getPublishPage(id.value); //获取post_id
  let postId = res.list[0].id;
  let res1 = await detelePublish(postId);
  proxy.$message({
    text: "删除成功"
  });
  setTimeout(() => {
    router.back();
  }, 1000);
}

const getRandomImage = () => {
  const randomIndex =
    Math.floor(Math.random() * 26) + 1
  return import.meta.env.VITE_AVATER_URL + `/avatar${randomIndex}.jpg`;
};

const confirm = () => {
  if (inputVal.value == "") {
    uni.showToast({
      title: "请输入评论内容",
      icon: "none",
      duration: 2000,
    });
  } else {
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const formattedDateTime = `${month}-${day} ${hours}:${minutes}`;

    commentList.value.push({
      name: getApp().globalData.username,
      contentText: inputVal.value,
      isLike: false,
      likeNum: 0,
      date: formattedDateTime,
      url: getApp().globalData.avatar,
    });
    inputVal.value = "";
    proxy.$refs.uToast.show({
      type: "success",
      message: "已发表",
      center: true,
    });
  }
};

const getLike = (index) => {
  commentList.value[index].isLike = !commentList.value[index].isLike;
  if (commentList.value[index].isLike == true) {
    commentList.value[index].likeNum++;
  } else {
    commentList.value[index].likeNum--;
  }
};
</script>

<style lang="scss" scoped>
.follow {
  position: absolute;
  top: 505px;
  right: 10px;
  height: 33px;
  opacity: 0.9;
  z-index: 999;

}

.input {
  border: 1px solid rgba(220, 220, 220, 1);
  border-radius: 36px;
  height: 40px;
  margin: 0 10px;
}

.button_2 {
  padding: 6px 0;
  border-radius: 10px;
  width: 66px;
  border: 2px solid #ffa3c2;
  position: absolute;
  top: 468px;
  right: 10px;
  height: 33px;
  opacity: 0.9;
  z-index: 999;
}

.text_6 {
  color: #ffa3c2;
  font-size: 14px;
}

.comment {
  display: flex;
  padding: 16px;

  .left {
    img {
      width: 33px;
      height: 33px;
      border-radius: 50%;
      background-color: #f2f2f2;
    }
  }

  .right {
    flex: 1;
    padding-left: 10px;
    font-size: 14px;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;

      .name {
        color: #575757;
      }

      .like {
        display: flex;
        align-items: center;
        color: #9a9a9a;
        font-size: 15px;

        .num {
          margin-right: 2px;
          color: #9a9a9a;
        }
      }

      .highlight {
        color: #ffa3c2;

        .num {
          color: #ffa3c2;
        }
      }
    }

    .content {
      margin-bottom: 5px;
    }

    .reply-box {
      background-color: rgb(242, 242, 242);
      border-radius: 6px;

      .item {
        padding: 10px;
        // border-bottom: solid 1px $u-border-color;

        .username {
          font-size: 12px;
          color: #999999;
        }
      }

      .all-reply {
        padding: 10px;
        display: flex;
        color: #98acff;
        align-items: center;

        .more {
          margin-left: -3px;
        }
      }
    }

    .bottom {
      margin-top: 10px;
      display: flex;
      font-size: 12px;
      color: #9a9a9a;

      .reply {
        color: #756d6d;
        margin-left: 5px;
      }
    }
  }
}
</style>
