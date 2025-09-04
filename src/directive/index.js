import {
    useIntersectionObserver
} from "@vueuse/core";

export const lazyPlugin = {
    install(app) {
        app.directive("lazy", {
            mounted(el, binding) {
                el.src = "src/assets/images/community/loading.gif"; // 使用默认图片
                const {
                    stop
                } = useIntersectionObserver(el, ([{
                    isIntersecting
                }]) => {
                    if (isIntersecting) {
                        setTimeout(() => {
                            el.src = binding.value;
                            //在监听的图片第一次完成加载后就停止监听
                            stop();
                        }, 500);
                    }
                });
            },
        });
    },
};