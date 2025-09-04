<template>
    <div class="u-mask" hover-stop-propagation :style="[maskStyle, zoomStyle]" @touchmove.stop.prevent="() => { }"
        :class="{
            'u-mask-zoom': zoom,
            'u-mask-show': show
        }">
        <slot />
    </div>
</template>

<script setup>
    /**
     * mask 遮罩
     * @description 创建一个遮罩层，用于强调特定的页面元素，并阻止用户对遮罩下层的内容进行操作，一般用于弹窗场景
     * @tutorial https://www.uviewui.com/components/mask.html
     * @property {Boolean} show 是否显示遮罩（默认false）
     * @property {String Number} z-index z-index 层级（默认1070）
     * @property {Object} custom-style 自定义样式对象，见上方说明
     * @property {String Number} duration 动画时长，单位毫秒（默认300）
     * @property {Boolean} zoom 是否使用scale对遮罩进行缩放（默认true）
     * @property {Boolean} mask-click-able 遮罩是否可点击，为false时点击不会发送click事件（默认true）
     * @event {Function} click mask-click-able为true时，点击遮罩发送此事件
     * @example <u-mask :show="show" @click="show = false"></u-mask>
     */
    import { ref, computed, watch } from 'vue';
    const props = defineProps({
        show: {
            type: Boolean,
            default: true
        },
        zIndex: {
            type: [Number, String],
            default: ''
        },
        customStyle: {
            type: Object,
            default: () => ({})
        },
        zoom: {
            type: Boolean,
            default: true
        },
        duration: {
            type: [Number, String],
            default: 300
        },
        maskClickAble: {
            type: Boolean,
            default: true
        }
    });


    const zoomStyle = ref({ transform: '' });
    const scale = 'scale(1.2, 1.2)';

    watch(() => props.show, (newVal) => {
        if (newVal && props.zoom) {
            zoomStyle.value.transform = 'scale(1, 1)';
        } else if (!newVal && props.zoom) {
            zoomStyle.value.transform = scale;
        }
    });

    const maskStyle = computed(() => {
        let style = {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: props.show ? (props.zIndex ? props.zIndex : 1000) : -1,
            transition: `all ${props.duration / 1000}s ease-in-out`
        };
        if (Object.keys(props.customStyle).length) {
            style = { ...style, ...props.customStyle };
        }
        return style;
    });

</script>
<style lang="scss" scoped>

    .u-mask {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transition: transform 0.3s;
    }

    .u-mask-show {
        opacity: 1;
    }

    .u-mask-zoom {
        transform: scale(1.2, 1.2);
    }
</style>