<template>
    <div>
        <img :src=image class="img" />
        <div class="tip-font">{{ tip }}</div>
    </div>

</template>

<script setup>
    import collectImage from '@/assets/images/empty/collect.png';
    import commentImage from '@/assets/images/empty/comment.png';
    import dataImage from '@/assets/images/empty/data.png';
    import emptyImage from '@/assets/images/empty/empty.png';
    import messageImage from '@/assets/images/empty/message.png';

    const props = defineProps(
        {
            type: {
                type: String,
                default: 'data'
            },
            tip: {
                type: String,
                default: '暂无数据'
            }
        }
    )

    const imageMap = {
        collect: collectImage,
        comment: commentImage,
        data: dataImage,
        empty: emptyImage,
        message: messageImage
    }

    const image = imageMap[props.type];
</script>

<style scoped>
    .img {
        margin: 0 auto;
        display: block
    }

    .tip-font {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.6);
        text-align: center;
    }
</style>
