<template>
    <div class="page">
        <div class="section">
            <vue-danmaku v-model:danmus="danmus" loop style="height:100px; width:100%;" :speeds=70 :top=10 :right=8
                randomChannel :fontSize=16
                extraStyle="background-color: #00000058;padding: 5px 8px;border-radius: 50px;" />
        </div>
        <!-- <u-toast ref="uToast" /> -->
        <div class="box flex-row justify-between" style="margin-top: -30px">
            <div class="flex-col items-center">
                <div class="radius justify-center items-center">
                    <img src="@/assets/images/help/1.png" class="img" style="width: 47px" />
                </div>
                <div class="radius_text">四季服饰</div>
            </div>
            <div class="flex-col items-center">
                <div class="radius justify-center items-center">
                    <img src="@/assets/images/help/2.png" class="img" style="width: 36px" />
                </div>
                <div class="radius_text">各式裤子</div>
            </div>
            <div class="flex-col items-center">
                <div class="radius justify-center items-center">
                    <img src="@/assets/images/help/3.png" class="img" style="width: 46px; margin-left: 5px" />
                </div>
                <div class="radius_text">各类鞋子</div>
            </div>
            <div class="flex-col items-center">
                <div class="radius justify-center items-center">
                    <img src="@/assets/images/help/4.png" class="img" />
                </div>
                <div class="radius_text">二手包包</div>
            </div>
        </div>
        <div class="box">
            <div class="title">援助类型</div>
            <div class="flex-row items-center justify-between">
                <div v-if="type == 1" class="flex-row items-center">
                    <img class="image" src="@/assets/images/help/bone.png"></img>
                    <div style="margin-left: 5px">狗粮需助力22000kg</div>
                </div>
                <div v-else class="flex-row items-center">
                    <img class="image" src="@/assets/images/help/fishbone.png"></img>
                    <div style="margin-left: 5px">猫粮需助力18000kg</div>
                </div>

                <text>8KG旧物=1袋{{ type == 1 ? '狗粮' : '猫粮' }} </text>

            </div>
            <router-link to="/addresslist">
                <div class="title">地址信息</div>
                <div class="flex-row items-center justify-between" v-if="address.address == undefined"
                    style="margin: 0px 3px;">
                    <div class="row_text">您还没有添加地址，点击添加</div>
                    <t-icon name="chevron-right" color="#7c7c7c" size="24" />
                </div>
                <div class="flex-row justify-between" v-else style="margin: 0px 3px;">
                    <div>
                        <div class="row_text" style="font-size: 14px;color: #000;">{{ address.name }} {{ address.phone
                            }}
                        </div>
                        <div class="row_text">{{ address.address }} {{ address.moreAddres }}</div>
                    </div>

                    <t-icon name="chevron-right" color="#7c7c7c" size="24" />
                </div>
            </router-link>
            <t-divider />
            <div class="title">上门时间</div>

            <div class="input_form_box" @click="dateState.show = true">
                <div class="input_box">
                    <div class="name required">上门时间</div>
                    <div class="select_info">
                        <div class="value" v-if="time">{{ time }}
                        </div>
                        <div class="select" v-else>请选择</div>
                        <t-icon name="chevron-right" color="#7c7c7c" size="24" style="margin-top: 2px" />
                    </div>
                </div>
            </div>
            <t-popup v-model="dateState.show" placement="bottom">
                <t-picker v-model="dateState.date" :columns="seasonColumns" @confirm="onConfirmPick"
                    @cancel="onCancelPick" />
            </t-popup>
            <t-divider />
            <div class="flex-row justify-between items-center" @click="isShowDialog = true" style="padding: 0 5px;">
                <div class="row_text">备注</div>
                <div class="flex-row items-center">
                    <div class="value"> {{ tip ? tip : "当前无备注" }}</div>
                    <t-icon name="chevron-right" color="#7c7c7c" size="24" />
                </div>
            </div>
            <t-dialog v-model:visible="isShowDialog" close-on-overlay-click title="备注" :cancel-btn="cancelBtn"
                :confirm-btn="confirmBtn" @confirm="onConfirmDia">
                <t-input placeholder="请输入备注" v-model="newTip" maxlength="10" clearable tips="最大输入10个字符" />
            </t-dialog>

            <t-divider />
            <div class="flex-row justify-between items-center">
                <div class="title">预估重量</div>
                <div style="color: #666;font-size: 12px;">预估重量仅供参考，以实际重量为准</div>
            </div>
            <div class="flex-row justify-between">
                <div class="samllbox flex-col items-center justify-center" :class="{ 'check': check === 1 }"
                    @click="checkChange(1)">
                    <div class="samllbox_text">5-10KG</div>
                    <div style="font-size: 12px;">约8-15件</div>
                </div>
                <div class="samllbox flex-col items-center justify-center" :class="{ 'check': check === 2 }"
                    @click="checkChange(2)">
                    <div class="samllbox_text">10-20KG</div>
                    <div style="font-size: 12px;">约15-40件</div>
                </div>
                <div class="samllbox flex-col items-center justify-center" :class="{ 'check': check === 3 }"
                    @click="checkChange(3)">
                    <div class="samllbox_text">20-30KG</div>
                    <div style="font-size: 12px;">约40-60件</div>
                </div>
                <div class="samllbox flex-col items-center justify-center" :class="{ 'check': check === 4 }"
                    @click="checkChange(4)">
                    <div class="samllbox_text">30KG以上</div>
                    <div style="font-size: 12px;">约60-80件</div>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <div class="footer">
            <t-button theme="primary" type="submit" style="flex: 1;" @click="submit">提交</t-button>

        </div>
    </div>
</template>
<script setup>
    import { ref, reactive, onMounted, computed, getCurrentInstance } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import vueDanmaku from 'vue3-danmaku'
    import useUserInfoStore from '../../store/user';
    const userInfoStore = useUserInfoStore();

    const tip = ref("");
    const newTip = ref("");
    const address = reactive({});
    const check = ref(0);
    const type = ref(1);

    const router = useRouter();
    const route = useRoute();
    const danmus = ref([])
    const isShowDialog = ref(false);
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
    const time = computed(() => {
        return dateState.date.length ? dateState.date.join(' ') + ':00:00' : '';
    });

    const generateDateOptions = () => {
        const dateOptions = [];
        const currentDate = new Date();
        for (let i = 0; i < 5; i++) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() + i);
            dateOptions.push({
                label: `${date.getMonth() + 1} 月 ${date.getDate()} 日`,
                value: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
            });
        }
        return dateOptions;
    };

    const generateHourOptions = () => {
        const hourOptions = [];
        for (let i = 7; i <= 19; i++) {
            hourOptions.push({
                label: `${i} 时`,
                value: i,
            });
        }
        return hourOptions;
    };

    const dateOptions = generateDateOptions();
    const hourOptions = generateHourOptions();
    const seasonColumns = [dateOptions, hourOptions];



    const dateState = reactive({
        show: false,
        date: [],
    });

    const onCancelPick = () => {
        dateState.show = false;
    };

    const onConfirmPick = (val) => {

        console.log(time.value);

        dateState.show = false;
    };

    const onConfirmDia = () => {
        tip.value = newTip.value;
        isShowDialog.value = false;
    }

    onMounted(() => {
        const options = route.query;
        console.log(options);
        if (options.type) type.value = options.type;

        if (userInfoStore.userAddress !== '') {
            Object.assign(address, userInfoStore.userAddress);
        }

        setInterval(() => {
            const random = Math.floor(Math.random() * 3)
            // 随机生成用户名
            var randomUsername = "用户" + Math.floor(Math.random() * 1000);
            // 随机生成1到39之间的数字
            var randomNumber = Math.floor(Math.random() * 39) + 1;
            danmus.value.push(`${new Array(random).fill('~').join('🤩')}${randomUsername}捐赠${randomNumber}kg旧物 🥰`)
        }, Math.floor(Math.random() * 1000))
    });


    function checkChange(e) {
        check.value = e;
    }
    const { proxy } = getCurrentInstance()
    function submit() {
        proxy.$message({
            text: '预约成功',
            type: 'success',
        });
        setTimeout(() => {
            router.back()
        }, 1000);
    }
</script>
<style scoped>

    .router-link-active {
        text-decoration: none;
    }

    a {
        text-decoration: none;
        color: black;
    }

    .page {
        width: 100%;
        height: 100%;
        padding-bottom: 60px;
        background-color: #f1f1f1;
    }

    .footer {
        position: fixed;
        left: 50%;
        transform: translate(-50%);
        bottom: 2%;
        width: 88%;
        height: 40px;
        z-index: 999;
        display: flex;
        justify-content: center;
    }

    .section {
        padding: 80px 0 120px;
        background-image: url("@/assets/images/help/12.jpg");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

    .box {
        background-color: white;
        border-radius: 10px;
        padding: 12px 16px;
        margin: 10px 10px;
    }

    .radius {
        width: 56px;
        height: 56px;
        margin-bottom: 3px;
        background-color: #fdedee;
        border-radius: 50%;
        display: flex;
    }

    .img {
        width: 40px;
    }

    .radius_text {
        font-size: 12px;
        color: #666;
    }

    .image {
        width: 35px;
        height: 35px;
        background-color: #ffd2d2;
        border-radius: 50%;
    }

    .inputlen {
        position: absolute;
        right: 30px;
        bottom: 77px;
        color: #c0c4cc;
        font-size: 16px;
    }

    .title {
        font-size: 18px;
        font-weight: bold;
        margin: 10px 0;
    }

    .input_form_box .input_box {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 0 5px;
        background-color: #fff;
    }

    .input_form_box .input_box .name {
        font-size: 15px;
        color: #666;
        min-width: 60px;
        flex-shrink: 0;
        padding: 1px 0;
    }

    .value {
        font-size: 14px;
    }

    .input_form_box .select_info {
        padding: 1px 0;
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .row_text {
        font-size: 15px;
        color: #666;
        min-width: 60px;
        flex-shrink: 0;
        padding: 1px 0;
    }

    .samllbox {
        width: 72px;
        height: 72px;
        border: 1px solid #cdcdcd;
        border-radius: 8px;
    }

    .check {
        background-color: #fdedee;
        border: 1px solid #fdedee;
        animation: big 0.5s ease-in-out forwards;
    }

    @keyframes big {
        to {
            transform: scale(1.1);
        }
    }

    .samllbox_text {
        font-weight: bold;
        font-size: 15px;
        color: #6dadff;
    }
</style>
