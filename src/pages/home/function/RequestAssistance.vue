<template>
  <t-notice-bar class="notice-bar" visible marquee :content="content">
    <template #prefixIcon>
      <SoundIcon />
    </template>
  </t-notice-bar>
  <t-form ref="form" :data="formData" :rules="rules" reset-type="initial" show-error-message label-align="left"
    scroll-to-first-error="auto" @submit="onSubmit">
    <t-form-item label="类型" name="type">
      <t-radio-group v-model="formData.type" borderless @change="groupChangeFn">
        <t-radio :block="false" name="radio" value="流浪猫" label="小猫" />
        <t-radio :block="false" name="radio" value="流浪狗" label="小狗" />
      </t-radio-group>
    </t-form-item>

    <t-form-item arrow label="地区" name="region" content-align="right">
      <t-input v-model="formData.region" borderless placeholder="请选择地区" @click="showCascader"></t-input>
      <t-cascader v-model:visible="visibleCascader" title="选择地址" :options="options" @change="onChangeCascader" />
    </t-form-item>
    <t-form-item label="详细地址" name="address">
      <t-input v-model="formData.address"></t-input>
    </t-form-item>
    <t-form-item label="常出没地" name="often">
      <t-radio-group v-model="formData.often" borderless @change="groupChangeFn">
        <t-radio :block="false" name="radio" value="是" label="是" />
        <t-radio :block="false" name="radio" value="否" label="否" />
      </t-radio-group>
    </t-form-item>
    <t-form-item label="说明" name="intro">
      <t-textarea v-model="formData.intro" class="textarea" indicator :maxlength="50"></t-textarea>
    </t-form-item>
    <t-form-item label="联系电话" name="telephone">
      <t-input v-model="formData.telephone" :maxlength="11" type="number"></t-input>
    </t-form-item>
    <t-form-item label="上传照片" name="photo">
      <t-upload class="upload" v-model="files" multiple :max="3" :action="action" :on-success="onSuccess"
        accept="image/*">
      </t-upload>
    </t-form-item>
    <t-checkbox icon="rectangle" label="以上信息真实有效，如有虚假，愿意承担责任" v-model="checkbox1" />
    <div class="button-group">
      <t-button theme="primary" type="submit" size="large">提交</t-button>
    </div>
  </t-form>
</template>
<script setup>
  import {
    MessagePlugin
  } from 'tdesign-mobile-vue';
  import { ref, reactive, onMounted } from "vue";
  import { SoundIcon } from "tdesign-icons-vue-next";

  const files = ref([]);
  const onSuccess = (res) => {
    console.log("===onSuccess", res);
    files.value.map((item) => {
      item.url = item.response.data;
    });
    console.log("===files", files.value);
  };

  const checkbox1 = ref(false);

  const groupChangeFn = (e) => {
    console.log("===groupChangeFn", e);
  };

  const content =
    "路边的流浪猫猫狗狗,让我们给它找一个新的家！发布援助后官方会联系当地的援助队伍进行救助";


  const action = import.meta.env.VITE_UPLOAD_URL;

  const formData = reactive({
    type: "",
    region: "",
    address: "",
    often: "",
    intro: "",
    telephone: "",
  });

  const rules = {
    type: [{ validator: (val) => val !== "", message: "不能为空" }],
    region: [{ validator: (val) => val !== "", message: "不能为空" }],
    address: [{ validator: (val) => val !== "", message: "不能为空" }],
    often: [{ validator: (val) => val !== "", message: "不能为空" }],
    intro: [{ validator: (val) => val !== "", message: "不能为空" }],
    telephone: [{ validator: (val) => val?.length === 11, message: "请输入正确的电话号码" }],
  };

  import areaList from "@/utils/area.js";
  // 级联选择器
  const data = {
    areaList,
  };
  const options = data.areaList;
  const visibleCascader = ref(false);

  const onChangeCascader = (value, options) => {
    formData.region = options?.map((item) => item.label).join("-");
    visibleCascader.value = false;
  };

  const showCascader = () => {
    visibleCascader.value = true;
  };

  import { useRouter } from 'vue-router';
  import { addAssistanceData } from "@/api/home.js"
  const router = useRouter();
  const onSubmit = (context) => {
    if (!checkbox1.value) {
      MessagePlugin.error("请勾选以上信息真实有效");
      return;
    }
    if (files.value.length === 0) {
      MessagePlugin.error("请上传照片");
      return;
    }
    console.log(context);
    if (context.validateResult === true) {
      let data = {
        type: formData.type,
        description: formData.intro,
        area: formData.region,
        address: formData.address,
        isAvailable: formData.often,
        phone: formData.telephone,
        image: files.value.map((item) => item.url).join(','),
      }
      addAssistanceData(data).then(res => {
        MessagePlugin.success("提交成功，感谢您对流浪宠物的关心！");
        setTimeout(() => {
          router.go(-1);
        }, 1000);
      }).catch(err => {
        console.log(err);
      })
    }
  };

  const form = ref(null);
  onMounted(() => {
    form.value.setValidateMessage(rules);
  });
</script>

<style lang="less" scoped>
  .notice-bar {
    --td-notice-bar-info-color: var(--primary-color);
    --td-notice-bar-info-bg-color: #fff;
  }


  .upload {
    --td-upload-grid-columns: 3;
  }

  .textarea {
    height: 100px;
    width: 100%;
  }

  .button-group {
    box-sizing: border-box;
    padding: 16px;
    display: flex;
    border-bottom: 0.5px solid #e7e7e7;

    .t-button {
      height: 40px;
      flex: 1;
    }
  }
</style>
