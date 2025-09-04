<template>
    <div>
        <div class="flex-col section">
            <!-- 顶部 -->
            <div style="padding: 0 10px; margin-top: 32px" class="flex-row justify-between items-center">
                <text class="font_3" style="font-size: 22px; color: #000">首页</text>
                <!-- 搜索 -->
                <router-link to="/search">
                    <Icon name="search" size="24" color="#000" />
                </router-link>
            </div>

            <!-- 轮播图 -->
            <div class="wrap">
                <t-swiper :navigation="{ type: 'dots-bar' }" @click="swiperClick">
                    <t-swiper-item v-for="(item, index) in swiperList" :key="index" style="height: 192px">
                        <img :src="item" class="swiper__img" style="width: 100%;" />
                    </t-swiper-item>
                </t-swiper>
            </div>

            <!-- 快捷功能 -->
            <div class="flex-row justify-between">
                <template v-for="item in functionList">
                    <div class="flex-col items-center equal-division-item space-y-14" @click="functionClick(item.name)">
                        <img class="image_2" :src="item.img" />

                        <text class="text_2">{{ item.title }}</text>
                    </div>
                </template>
            </div>
            <!-- 热门宠物 -->
            <div class="flex-row items-center group">
                <text class="font_3">热门宠物</text>
            </div>
            <div class="flex-row" style="justify-content: space-evenly; margin: 0 -10px">
                <div class="flex-col" style="margin-top: 18px">
                    <div class="Hot_pet">
                        <img @click="navTopet(24)" class="Hot_pet" src="@/assets/images/home/popular/1.jpg" />
                    </div>
                    <div class="flex-row justify-between" style="margin-top: 10px;">
                        <div class="Hot_pet1">
                            <img @click="navTopet(176)" class="Hot_pet1" src="@/assets/images/home/popular/3.jpg"
                                alt="" />
                        </div>
                        <div class="Hot_pet2">
                            <img @click="navTopet(25)" class="Hot_pet2" src="@/assets/images/home/popular/4.jpg"
                                alt="" />
                        </div>
                    </div>
                </div>
                <div class="flex-col justify-between">
                    <div class="Hot_pet3" style="margin-top: 18px">
                        <img @click="navTopet(13)" class="Hot_pet3" src="@/assets/images/home/popular/2.jpg" />
                    </div>
                    <router-link to="/petmore">
                        <div class="Hot_pet5 flex-row items-center justify-center" @click="more">MORE
                        </div>
                    </router-link>
                </div>
            </div>

            <!-- 爱宠分类 -->
            <div class="flex-col group_9 space-y-18">
                <div class="flex-row items-center group_8 space-x-210">
                    <text class="font_3">爱宠分类</text>
                    <div class="flex-row items-center shrink-0 space-x-8">
                    </div>
                </div>
                <div class="flex-row space-x-8 scroll-wrapper">
                    <div v-for="(item, index) in categories" :key="index" class="flex-col items-center font_5"
                        :class="item.class" :style="item.style" @click="navToclass(index)">
                        <img :class="item.imgClass" :src="item.imgSrc" />
                        <text :class="item.textClass" :style="item.textStyle">{{
                            item.text
                        }}</text>
                    </div>
                </div>
            </div>

            <div class="flex-col group_9 space-y-18">
                <div class="flex-row items-center group_8 space-x-210">
                    <text class="font_3">宠物资讯</text>
                </div>
                <template v-for="item in newsList">
                    <div class="flex-row box" @click="newsClick(item.id)">
                        <img :src="item.img" class="img" />
                        <div class="flex-col" style="margin-left: 10px">
                            <div class="title">{{ item.title }}</div>
                            <div class="word">{{ item.word }}</div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Icon } from 'tdesign-mobile-vue'
import { useRouter } from 'vue-router'
const swiperList = [
    getAssetsFile('home/swiper/p1-1.jpg'),
    getAssetsFile('home/swiper/p2-1.jpg'),
    getAssetsFile('home/swiper/p3-1.jpg')
]
const router = useRouter()
const swiperClick = (index) => {
    router.push('/swiper' + index)
}
import getAssetsFile from '@/utils/getAssetsFile.js'
const functionList = [
    {
        title: '图片识别',
        img: getAssetsFile('home/function/1.png'),
        name: 'identifytip'
    },
    {
        title: '宠物推荐',
        img: getAssetsFile('home/function/2.png'),
        name: 'airecommendation'
    },
    {
        title: '请求援助',
        img: getAssetsFile('home/function/3.png'),
        name: 'requestassistance'
    },
    {
        title: '我的爱宠',
        img: getAssetsFile('home/function/4.png'),
        name: 'mypet'
    }
]
const functionClick = (name) => {
    router.push('/' + name)
}

const navTopet = (id) => {
    router.push({ name: 'petdetail', params: { id } })
}

const categories = [
    {
        class: 'section_10 space-y-2',
        imgClass: 'image_8',
        imgSrc: 'src/assets/images/home/classify/dog.png',
        text: '犬类',
        textStyle: ''
    },
    {
        class: 'section_11 space-y-2',
        imgClass: 'image_9',
        imgSrc: 'src/assets/images/home/classify/cat.png',
        text: '猫类',
        textStyle: ''
    },
    {
        class: 'section_12 space-y-12',
        imgClass: 'image_10',
        imgSrc: 'src/assets/images/home/classify/fish.png',
        text: '鱼类',
        textStyle: 'margin-top: 10px'
    },
    {
        class: 'section_13 space-y-2',
        imgClass: 'image_11',
        imgSrc: 'src/assets/images/home/classify/other.png',
        text: '异宠',
        textStyle: 'margin-top: 2px',
        style: 'background-color: #cdcdcd'
    }
]

const navToclass = (cid) => {
    router.push({ name: 'petclass', query: { cid } })
}

const newsList = [
    {
        title: '宠物医疗乱象监管不能缺位，网友：先立法！',
        word: '部分宠物医院利用消息不对称诱导消费，以药养医抬高宠物医疗成本，造成宠物伤亡后极少赔偿......',
        img: `src/assets/images/home/zixun/31.jpg`,
        id: 2
    },
    {
        title: '人民日报评论：当好“监护人”，别让宠物四处流浪',
        word: '在城市居民区、垃圾场等地方，经常能看到流浪猫狗的身影。2021年我国流浪猫数量达5300万只......',
        img: `src/assets/images/home/zixun/21.jpg`,
        id: 1
    },
    {
        title: '“异宠风”兴起？人民日报：不是什么动物都能作为宠物',
        word: '随着宠物经济发展，宠物市场不再只是猫狗天下，以蛇、蜥蜴、壁虎为主的爬宠收获了不少人的青睐......',
        img: `src/assets/images/home/zixun/1.jpg`,
        id: 0
    }
]
const newsClick = (id) => {
    router.push('/news' + id)
}
</script>

<style scoped>
.img {
    height: 120px;
    width: 28vw;
    border-radius: 20px;
}

.box {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    padding: 8px;
    border-radius: 20px;
    width: 100%;
}

.title {
    font-size: 14px;
    margin-top: 10px;
    width: 57vw;
    margin-right: 10px;
}

.word {
    font-size: 12px;
    margin-top: 10px;
    width: 56vw;
    color: #666;
}

.wrap {
    padding: 26px 0 13px;
}

.Hot_pet {
    width: 58vw;
    height: 14vh;
    border-radius: 18px;
}

.Hot_pet1 {
    width: 24vw;
    height: 18vh;
    border-radius: 18px;
}

.Hot_pet2 {
    width: 32vw;
    height: 18vh;
    border-radius: 18px;
}

.Hot_pet3 {
    width: 30vw;
    height: 24vh;
    border-radius: 18px;
}

.Hot_pet4 {
    width: 30vw;
    height: 8vh;
    border-radius: 18px;
}

.Hot_pet5 {
    width: 30vw;
    height: 8vh;
    border-radius: 18px;
    background-image: linear-gradient(var(--rotate), #1fd1f9 0%, #b621fe 74%);
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5),
        -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
        inset -4px -4px 6px 0 rgba(255, 255, 255, 0.5),
        inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
    color: #ffffffcc;
    font-size: 21px;
    animation: spin 3s linear infinite;
    /* font-family: ali; */
    font-weight: 600;
}

@property --rotate {
    syntax: '<angle>';
    initial-value: 88deg;
    inherits: false;
}

@keyframes spin {
    0% {
        --rotate: 0deg;
    }

    100% {
        --rotate: 360deg;
    }
}

.section {
    padding: 0 15px 76px;
}

.image {
    width: 18px;
    height: 18px;
}

.scroll-wrapper {
    display: flex;
    overflow-x: scroll;
    white-space: nowrap;
    margin-top: 5px;
    padding-bottom: 8px;
    overflow-x: scroll;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.scroll-wrapper::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, and Opera */
}

.text {
    margin-right: 162px;
    color: #32394370;
    font-size: 12px;
    font-family: SourceHanSansCN;
    line-height: 11px;
}

.equal-division-item {
    padding: 4px 0;
    width: 92px;
}

.space-y-14>div:not(:first-child),
.space-y-14>text:not(:first-child),
.space-y-14>image:not(:first-child) {
    margin-top: 8px;
}

.image_2 {
    width: 52px;
    height: 52px;
}

.text_2 {
    font-size: 14px;
    line-height: 15px;
    opacity: 0.5;
    font-size: 14px;
    font-family: SourceHanSansCN;
    line-height: 14px;
    color: #000000;
}

.group {
    margin: 19px 0 0 10px;
}

.font_3 {
    font-size: 18px;
    line-height: 19px;
    color: #323943;
    /* font-family: ali; */
    font-weight: 600;
}

.space-x-8>div:not(:first-child),
.space-x-8>text:not(:first-child),
.space-x-8>image:not(:first-child) {
    margin-left: 8px;
}

.font_4 {
    font-size: 14px;
    font-family: SourceHanSansCN;
    line-height: 14px;
    color: #666;
}

.font_5 {
    font-size: 14px;
    font-family: SourceHanSansCN;
    line-height: 18px;
    color: #ffffff;
}

.pos {
    position: absolute;
    right: 101px;
    bottom: 76px;
}

.group_9 {
    margin-top: 26px;
    padding-left: 7px;
}

.space-y-18>div:not(:first-child),
.space-y-18>text:not(:first-child),
.space-y-18>image:not(:first-child) {
    margin-top: 19px;
}

.group_8 {
    margin-left: 4px;
    margin-right: 23px;
}

.space-x-210>div:not(:first-child),
.space-x-210>text:not(:first-child),
.space-x-210>image:not(:first-child) {
    margin-left: 218px;
}

.section_10 {
    padding: 8px 0 12px;
    background-color: #97bcff;
    border-radius: 25px;
    width: 107px;
    height: 103px;
}

.image_8 {
    width: 67px;
    height: 67px;
}

.section_11 {
    padding: 7px 0 12px;
    background-color: #ffdd86;
    border-radius: 25px;
    width: 107px;
    height: 103px;
}

.space-y-2>div:not(:first-child),
.space-y-2>text:not(:first-child),
.space-y-2>image:not(:first-child) {
    margin-top: 2px;
}

.image_9 {
    width: 68px;
    height: 68px;
}

.section_12 {
    padding: 12px 0;
    background-color: #9586ff;
    border-radius: 25px;
    width: 107px;
    height: 103px;
}

.space-y-12>div:not(:first-child),
.space-y-12>text:not(:first-child),
.space-y-12>image:not(:first-child) {
    margin-top: 12px;
}

.image_10 {
    width: 80px;
    height: 51px;
}

.image_11 {
    width: 70px;
    height: 60px;
}

.section_13 {
    padding: 12px 0;

    border-radius: 25px;
    width: 107px;
    height: 103px;
}
</style>
