<template>
    <div class="content">
        <div class="t-body" v-if="pointsDetail && pointsDetail.length > 0">
            <div class="t-jf-item t-flex-row-sb" v-for="(item, index) in pointsDetail" :key="index">
                <div class="t-flex-col-s t-lt">
                    <text>{{ item.type }}</text>
                    <text :class="[{ 't-hx-color': item.score < 0, 't-p-color': item.score > 0 }]">{{ item.score > 0 ?
                        ("+"
                            + item.score) : item.score }}</text>
                </div>
                <div class="t-rt">{{ item.createAt }}</div>
            </div>
        </div>
        <Empty v-if="pointsDetail.length == 0" tip="还没有记录哦~" />

    </div>
</template>

<script setup>
    import { toRefs } from 'vue'
    import useUserInfoStore from '../../store/user';
    import { storeToRefs } from 'pinia';
    const userInfoStore = useUserInfoStore();
    const { pointscenter } = storeToRefs(userInfoStore);
    const { pointsDetail } = toRefs(pointscenter.value)
</script>

<style scoped lang="scss">
    .t-flex-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .t-more {
        font-size: 15px;
        color: #888888;
        line-height: 21px;
        margin-top: 26px;
        margin-bottom: 44px;
    }

    .t-flex-row-sb {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .t-flex-col-s {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .content {
        background: #F6F3F3;
        min-width: 100vw;
        min-height: calc(100vh - 50px);
        box-sizing: border-box;
        padding-bottom: 16px;

        .t-body {
            width: 100%;
            padding: 0px 26px;
            background: #fff;
            box-sizing: border-box;
            border-top: 1px solid #D8D8D8;
        }

        .t-jf-item {
            width: 100%;
            height: 96px;
            box-sizing: border-box;
            padding: 21px 0px;
        }

        .t-jf-item:not(:last-child) {
            border-bottom: 1px solid #ddd;
        }

        .t-lt {
            align-items: flex-start;
            font-size: 16px;
            color: #333333;
            line-height: 22px;
        }

        .t-lt text:last-child {
            margin-top: 10px;
        }

        .t-rt {
            font-size: 16px;
            color: #333333;
        }

        .t-hx-color {
            color: #D41428 !important;
        }

        .t-p-color {
            color: #17ba7a !important;
        }

        .t-tips {
            margin-top: 26px;
            margin-bottom: 5px;
            font-size: 15px;
            color: #888888;
            line-height: 21px;
        }
    }
</style>