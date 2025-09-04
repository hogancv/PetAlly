import myMessage from './Message.vue'
import {
    createVNode,
    render
} from 'vue'

// dom容器
const div = document.createElement('div')
div.setAttribute('class', 'myMessageContainer')
document.body.appendChild(div)

// 定时器标识
let timer = null

export default ({
    type,
    text,
    duration = 1500
}) => {
    // 在生成新组件之前先销毁上一个组件
    render(null, div)

    // 渲染组件
    // 1. 导入消息提示组件
    // 2. 将消息提示组件编译为虚拟节点(dom节点)
    // createVNode(组件,属性对象（props）)
    const vnode = createVNode(myMessage, {
        type,
        text,
        duration
    })
    // 3. 准备一个装载消息提示组件的DOM容器
    // 4. 将虚拟节点渲染在容器中
    // render(虚拟节点,DOM容器)
    render(vnode, div)
    // 5. 3s后销毁组件
    clearTimeout(timer)
    timer = setTimeout(() => {
        render(null, div)
    }, duration + 1000)
}