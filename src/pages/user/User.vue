<template>
    <div>
        <Setting v-model:popupVisible="settingShow" />
        <t-dialog v-model:visible="isShowDialog" close-on-overlay-click title="修改昵称" :cancel-btn="cancelBtn"
            :confirm-btn="confirmBtn" @confirm="onConfirm">
            <t-input placeholder="请输入新昵称" v-model="newuserName" />
        </t-dialog>
        <div class="flex-col page space-y-12">
            <div class="flex-col section space-y-26">
                <div class="flex-row justify-between items-center">
                    <text class="text">我的</text>
                    <div class="flex-row items-center group">
                        <t-icon name="setting-1" size="26" @click="settingShow = true" />
                    </div>
                </div>

                <!-- 个人卡片 -->
                <div class="flex-row items-center space-x-20 box">
                    <div class="flex-row items-center flex-auto space-x-16">
                        <!-- 头像 -->
                        <img class="shrink-0 image_3" :src="avatarUrl" @click="changeAvatar" />
                        <div class="flex-col">
                            <div class="flex-row items-center">
                                <text class="text_2">{{ userName }}</text>

                                <t-icon @click="isShowDialog = true" name="edit-2" style="
                                        width: 18px;
                                        height: 18px;
                                        margin-top: 5px;
                                    " />
                            </div>
                            <div class="flex-row items-center" style="margin-top: 7px; margin-left: -2px">
                                <img src="@/assets/images/user/Lv/1.png" class="icon" />
                                <text style="
                                        color: #1580ed;
                                        font-family: ali;
                                        font-weight: 500;
                                    ">普通会员</text>
                            </div>
                        </div>
                    </div>
                    <img src="@/assets/images/user/Lv/lv1.svg" class="img animate__animated animate__flipInY "
                        @click="tograde" />
                </div>
            </div>
            <div class="flex-col section_2 space-y-22">
                <text class="self-start font_3 text_5">我的服务</text>

                <div class="grid">
                    <div v-for="(item, index) in items" :key="index" :class="item.class" :style="item.style"
                        @click="navTo(item.name)">
                        <img class="image_4" :src="item.src" />
                        <text class="font_1">{{ item.text }}</text>
                    </div>
                </div>
            </div>
            <router-link to="/mall">
                <div class="flex-col justify-start section_3">
                    <div class="flex-col group_1 space-y-8">
                        <div class="flex-row justify-between items-center group_2">
                            <text class="font_3">猜你喜欢</text>
                            <div class="flex-row group_3 items-center" @click="tomall">
                                <text class="font_1 text_7">查看更多</text>
                                <t-icon name="chevron-right" size="18" style="color: #7c7c7c"></t-icon>
                            </div>
                        </div>
                        <div @click="tomall" class="image_box">
                            <img v-for="(src, index) in imageSources" :key="index" :src="src" class="image_item" />
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import useUserInfoStore from "@/store/user.js";
import Setting from '../../components/Setting.vue'
const userInfoStore = useUserInfoStore();
import { storeToRefs } from "pinia";

const { userName, avatarUrl } = storeToRefs(userInfoStore)
const router = useRouter()
const isShowDialog = ref(false)
const confirmBtn = {
    content: '确认',
    variant: 'text',
    size: 'large'
}
const cancelBtn = {
    content: '取消',
    variant: 'text',
    size: 'large'
}
const newuserName = ref('')
const onConfirm = () => {
    userName.value = newuserName.value
    isShowDialog.value = false
}
const settingShow = ref(false)
const items = [
    {
        class: 'grid-item flex-col items-center space-y-12',
        src: 'src/assets/images/user/1.png',
        text: '我的宠物',
        name: 'mypet'
    },
    {
        class: 'grid-item_2 flex-col items-center space-y-12',
        src: 'src/assets/images/user/4.png',
        text: '宠物推荐历史',
        name: 'recommendationhistory'
    },
    {
        class: 'grid-item_2 flex-col items-center space-y-12',
        src: 'src/assets/images/user/2.png',
        text: '识别历史',
        style: 'background-color: #edf9f7',
        name: 'identifyhistory'
    },
    {
        class: 'grid-item flex-col items-center space-y-12',
        src: 'src/assets/images/user/3.png',
        text: '积分中心',
        style: 'background-color: #f1f6ff',
        name: 'pointscenter'
    }
]
const navTo = (name) => {
    router.push('/' + name)
}
const imageSources = [
    'src/assets/images/user/11.jpg',
    'src/assets/images/user/22.jpg',
    'src/assets/images/user/33.jpg',
    'src/assets/images/user/44.jpg'
]
function changeAvatar() {
    uni.chooseImage({
        count: 1,
        sourceType: ['album'],
        success: function (chooseImageRes) {
            const tempFilePaths = chooseImageRes.tempFilePaths
            getApp().globalData.avatar = tempFilePaths[0]
            Avatar.value = tempFilePaths[0]
            toast.success('修改头像成功')
        }
    })
}
</script>

<style scoped>
.page {
    background-color: #fafafa;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    padding-bottom: 66px;
}

.section {
    padding: 32px 25px 21px;
    background-color: #ffffff;
}

.inputlen {
    position: absolute;
    right: 30px;
    bottom: 77px;
    color: #c0c4cc;
    font-size: 16px;
}

.box {
    height: 100px;
    border-radius: 16px;
    padding: 0px 10px;
    background: linear-gradient(146.58deg,
            rgba(243, 245, 245, 1) 0%,
            rgba(201, 229, 255, 1) 100%);

    border: 1px solid rgb(255, 255, 255);
}

.img {
    width: 88px;
}

.icon {
    width: 20px;
    height: 20px;
}

.space-y-26>div:not(:first-child),
.space-y-26>text:not(:first-child),
.space-y-26>image:not(:first-child) {
    margin-top: 27px;
}

.text {
    color: #000000;
    font-size: 22px;
    font-family: ali;
    font-weight: 600;
}

.group {
    margin-right: 6px;
}

.space-x-18>div:not(:first-child),
.space-x-18>text:not(:first-child),
.space-x-18>image:not(:first-child) {
    margin-left: 19px;
}

.image {
    width: 19px;
    height: 19px;
}

.image_2 {
    width: 21px;
    height: 4px;
}

.space-x-20>div:not(:first-child),
.space-x-20>text:not(:first-child),
.space-x-20>image:not(:first-child) {
    margin-left: 21px;
}

.space-x-16>div:not(:first-child),
.space-x-16>text:not(:first-child),
.space-x-16>image:not(:first-child) {
    margin-left: 17px;
}

.image_3 {
    border-radius: 50%;
    width: 62px;
    height: 62px;
}

.text_2 {
    color: #000000;
    font-size: 19px;
    font-family: ali;
    line-height: 17px;
    margin-top: 10px;
    padding-right: 10px;
}

.font_2 {
    font-size: 17px;

    line-height: 11px;
    color: #000000;
}

.text_3 {
    line-height: 12px;
}

.font_3 {
    font-size: 18px;
    font-weight: 600;
    color: #323943;
    font-family: ali;
}

.text_4 {
    line-height: 12px;
}

.button {
    margin-right: 2px;
    padding: 10px 0;
    background-color: #fdd300;
    border-radius: 17px;
    box-shadow: 0px 2px 4px #fff2b1;
    width: 83px;
    height: 33px;
}

.font_1 {
    font-size: 13px;

    line-height: 11px;
    color: #000000;
}

.section_2 {
    padding: 25px;
    background-color: #ffffff;
}

.space-y-22>div:not(:first-child),
.space-y-22>text:not(:first-child),
.space-y-22>image:not(:first-child) {
    margin-top: 23px;
}

.text_5 {
    line-height: 16px;
}

.image_4 {
    width: 42px;
    height: 42px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr 1fr;
    gap: 9px;
}

.grid-item {
    padding: 26px 0 17px;
    background-color: #fff8ec;
    border-radius: 12px;
    grid-column: span 2;
}

.grid-item_2 {
    padding: 26px 0 17px;
    background-color: #f5f2ff;
    border-radius: 12px;
    grid-column: span 4;
}

.space-y-12>div:not(:first-child),
.space-y-12>text:not(:first-child),
.space-y-12>image:not(:first-child) {
    margin-top: 12px;
}

.space-y-14>div:not(:first-child),
.space-y-14>text:not(:first-child),
.space-y-14>image:not(:first-child) {
    margin-top: 15px;
}

.text_6 {
    line-height: 12px;
}

.section_3 {
    padding-top: 12px;
    background-color: #ffffff;
}

.group_1 {
    margin: 0 15px;
}

.space-y-8>div:not(:first-child),
.space-y-8>text:not(:first-child),
.space-y-8>image:not(:first-child) {
    margin-top: 8px;
}

.group_2 {
    padding: 0 8px 10px;
}

.group_3 {
    margin-right: 2px;
}

.space-x-4>div:not(:first-child),
.space-x-4>text:not(:first-child),
.space-x-4>image:not(:first-child) {
    margin-left: 4px;
}

.text_7 {
    color: #7c7c7c;
}

.image_5 {
    width: 6px;
    height: 11px;
}

.image_box {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    box-sizing: border-box;
}

.image_item {
    width: 50%;
    padding: 5px;
    height: 150px;
    border-radius: 20px;
}
</style>
