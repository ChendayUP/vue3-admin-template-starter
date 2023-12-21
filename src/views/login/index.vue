<script setup lang="ts">
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { loginRules } from "./utils/rule";
import type { FormInstance } from "element-plus";
import { useLayout } from "@/layout/hooks/useLayout";
import { useUserStoreHook } from "@/store/modules/user";
import { initRouter, getTopMenu } from "@/router/utils";
import { ref, reactive, onMounted, onBeforeUnmount, onBeforeMount } from "vue";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";

import user from "@/assets/svg/user.svg?component";
import password from "@/assets/svg/password.svg?component";

defineOptions({
  name: "Login"
});
const router = useRouter();
const loading = ref(false);
const loginFormRef = ref<FormInstance>();

const { initStorage } = useLayout();
initStorage();

const loginForm = reactive({
  username: "admin",
  password: "admin123"
});

const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      useUserStoreHook()
        .loginByUsername({ username: loginForm.username, password: "admin123" })
        .then(res => {
          if (res.success) {
            // 获取后端路由
            initRouter().then(() => {
              router.push(getTopMenu(true).path);
              message("登录成功", { type: "success" });
            });
          }
        });
    } else {
      loading.value = false;
      return fields;
    }
  });
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (code === "Enter") {
    onLogin(loginFormRef.value);
  }
}

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});

onBeforeMount(() => {
  useDataThemeChange().dataThemeChange();
});
</script>

<template>
  <div class="login-container">
    <div class="login">
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
      >
        <div class="logo-header">
          <h3 class="title">用户登录</h3>
        </div>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            class="h-[48px]"
            type="text"
            auto-complete="off"
            placeholder="请输入11位手机号"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><user /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            size="large"
            type="password"
            auto-complete="off"
            placeholder="请输入密码"
            @keyup.enter="onLogin(loginFormRef)"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><password /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <div class="flex justify-end mb-[18px]">
          <span>忘记密码？</span>
        </div>
        <el-form-item style="width: 100%">
          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%"
            @click="onLogin(loginFormRef)"
            class="btnButton"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
        <div class="inject">还没有注册账号，立即<span>注册</span></div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
@import url("@/style/login.css");
</style>

<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: url("@/assets/images/login-background.png") no-repeat;
  background-size: 100% 548px;
}

.login {
  display: flex;
  align-items: center;
  justify-content: center;
  // background: url("~@/assets/images/login-background.png") no-repeat;
  // background-size: 100% 548px;
  // width: 500px;
  // height: 482px;
  width: 470px;
  // height: 437px;
  padding: 20px 0;
  background: rgb(255 255 255 / 35%);
  border-radius: 13px;
  box-shadow: 0 4px 11px 0 rgb(30 72 111 / 35%);
}

.title {
  margin: -30px auto 30px;
  font-size: 28px;
  font-weight: bold;
  color: #008f4d;
  text-align: center;
}

.login-form {
  width: 430px;
  padding: 25px 25px 5px;
  // height: 400px;
  background: #fff;
  border-radius: 13px;
  box-shadow: 0 4px 11px 0 rgb(30 72 111 / 16%);

  // :deep(.el-input) {
  //   // width: 361px;
  //   height: 48px;
  //   border: 2px solid #d7d7d7;
  //   border-radius: 5px;
  //   input {
  //     // width: 361px;
  //     height: 48px;
  //     font-size: 16px;
  //   }
  // }

  .input-icon {
    width: 14px;
    height: 48px;
    margin-left: 2px;
  }
}

.login-tip {
  font-size: 13px;
  color: #bfbfbf;
  text-align: center;
}

.login-code {
  float: right;
  width: 33%;
  height: 38px;

  img {
    vertical-align: middle;
    cursor: pointer;
  }
}

.login-code-img {
  height: 38px;
}

.logo-header {
  margin-top: 48px;
}

.remenber_pass {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 16px;
  color: #999;
  cursor: pointer;
}

.btnButton {
  width: 361px;
  height: 51px;
  // background: #008f4d;
  border: none;
  border-radius: 5px;
  box-shadow: 0 4px 10px 0 rgb(96 232 168 / 34%);

  span {
    font-size: 20px;
  }
}

.inject {
  margin-bottom: 15px;
  font-size: 14px;
  color: #999;
  text-align: right;

  span {
    font-size: 16px;
    color: #008f4d;
    text-decoration: underline;
    cursor: pointer;
  }
}

:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
