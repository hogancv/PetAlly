<template>
    <Transition name="slide-fade">
        <div class="myMessage" :style="style[type]" v-show="visible">
            <!-- 上面绑定的是样式 -->
            <!-- 不同提示图标会变 -->
            <img class="icon" :src="[style[type].icon]"></img>
            <div class="text">{{ text }}</div>
        </div>
    </Transition>
</template>

<script>
    import { onMounted, ref } from 'vue'
    export default {
        name: 'myMessage'
    }
</script>

<script setup>
    import iconSuccess from '@/assets/images/message/true.png';
    import iconError from '@/assets/images/message/false.png';
    const props = defineProps({
        text: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            // warn 警告  error 错误  success 成功
            default: 'success'
        },
        duration: {
            type: Number,
            default: 1500
        }
    })

    const style = {
        warn: {
            icon: 'icon-warning',
            // color: '#E6A23C',
            // backgroundColor: 'rgb(253, 246, 236)',
            // borderColor: 'rgb(250, 236, 216)'
        },
        error: {
            icon: iconError,
            color: '#F56C6C',
            // backgroundColor: 'rgb(254, 240, 240)',
            // borderColor: 'rgb(253, 226, 226)'
        },
        success: {
            icon: iconSuccess,
            color: '#67C23A',
            // backgroundColor: 'rgb(240, 249, 235)',
            // borderColor: 'rgb(225, 243, 216)'
        }
    }

    // 控制元素显示隐藏
    const visible = ref(false)
    onMounted(() => {
        visible.value = true
        setTimeout(() => {
            visible.value = false
        }, props.duration)

    })
</script>

<style scoped lang="less">

    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateY(-40px);
        opacity: 0;
    }

    .myMessage {
        width: 200px;
        height: 50px;
        position: fixed;
        z-index: 9999;
        left: 25%;
        top: 8%;
        line-height: 50px;
        padding: 0 25px;
        border: 2px solid #e4e4e4;
        background: #fff;
        color: #999;
        border-radius: 50px;
        display: flex;
        align-items: center;

        .icon {
            width: 36px;
            height: 36px;
            margin-left: -16px;
            animation: rotate 1s ease-in-out;
        }

        @keyframes rotate {
            0% {
                transform: rotateY(180deg);
            }

            100% {
                transform: rotateY(360deg);
            }
        }

        .text {
            font-size: 16px;
            flex: 1;
            text-align: center;
        }
    }
</style>