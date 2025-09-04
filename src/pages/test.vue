<template>
    <div class="popup-demo">
        <t-button @click="popupVisible = true">
            点击
        </t-button>
    </div>
    <t-popup v-model="popupVisible" placement="right" style="width: 60%;">
        <div>
            <div class="header">设置</div>
            <div v-for="(item, index) in menuItems" :key="index">
                <div class="menu-item">
                    <text class="menu-text">{{ item.text }}</text>
                    <t-icon name="chevron-right" color="#7c7c7c" size="28"></t-icon>
                </div>
                <t-divider v-if="index < menuItems.length - 1" />
            </div>
            <div class="logout">
                <t-button theme="primary" style="width: 80%; margin-top: 20px;" @click="Logout">
                    退出登录
                </t-button>
            </div>
        </div>
    </t-popup>

</template>

<script setup>
    import { ref } from 'vue';

    const popupVisible = ref(false);
    const menuItems = ref([
        { text: '账号与安全' },
        { text: '消息通知' },
        { text: '通用' },
        { text: '隐私' },
        { text: '个人信息与权限' },
        { text: '个人信息收集清单' },
        { text: '第三方信息共享清单' },
        { text: '关于宠AI有家' }
    ])

</script>

<style scoped>

    .header {
        text-align: center;
        font-size: 22px;
        margin: 30px;
        font-family: ali;
        font-weight: 600;
    }

    .menu-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 10px;
    }

    .menu-text {
        font-size: 16px;
    }

    .logout {
        display: flex;
        justify-content: center;
    }
</style>

