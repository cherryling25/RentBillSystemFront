<template>
  <div class="login">
    <el-card class="login-form-layout">
      <el-form autocomplete="on" :model="loginForm" ref="loginForm" label-position="left">
        <h2 class="login-title color-main">租房账单管理系统</h2>
        <el-form-item prop="username">
          <el-input name="username" type="text" v-model="loginForm.username" autocomplete="on" placeholder="请输入用户名">
            <span slot="prefix">
              <i class="el-icon-user" style="width: 16px; color: #409EFF"></i>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type='password' @keyup.enter.native="handleLogin" v-model="loginForm.password"
            autocomplete="on" placeholder="请输入密码">
            <span slot="prefix">
              <i class="el-icon-view" style="width: 16px; color: #409EFF"></i>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 15px; margin-top: 40px">
          <el-button style="width: 100%" type="success" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" :loading="loading" @click="registerDialog = true">
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div>

    
    <el-dialog title="注册" :visible.sync="registerDialog" width="30%" :modal-append-to-body="false">
      <el-form :model="registerForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="registerForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="registerForm.confirmPwd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="registerDialog = false">取 消</el-button>
        <el-button type="primary" @click="register">确 定</el-button>
      </div>
    </el-dialog>
    </div>
  </div>
</template>
<script>
import Axios from 'axios';
export default {
  name: "login",
    data() {
      return {
        registerDialog: false,
        registerForm: {
          userName: '',
          password: '',
          confirmPwd: ''
        },
        formLabelWidth: '70px',
        loginForm: {
          username: "",
          password: ""
        },
        loading: false,
      };
    },
  methods: {
    register() {
      if(!this.registerForm.userName){
        this.$notify.error({
          message: '用户名不能为空'
        });
        return;
      }
      if(this.registerForm.password != this.registerForm.confirmPwd){
        this.$notify.error({
          message: '两次输入的密码不一致'
        });
        return;
      }
      var url = "useraccount/register";
      let requestData = {
        userName: this.registerForm.userName,
        password: this.registerForm.password,
        confirmPwd: this.registerForm.confirmPwd
      };
      
      Axios.post(url, requestData).then((response) => {
        if (response.data.data) {
          this.$notify({
            message: '注册成功',
            type: 'success'
          });
          this.registerDialog = false;
        } else {
          this.$notify.error({
            message: '注册失败'
          });
        }
      });
    },
    handleLogin() {
      this.$router.push({
            path: "/home"
          });
      /* var url = "useraccount/login";
      let requestData = {
        userName: this.loginForm.username,
        password: this.loginForm.password
      };
      Axios.post(url, requestData).then((response) => {
        let serverResponse = response.data;
        if (serverResponse && serverResponse.data != null) {
          this.$router.push({
            path: "/home/" + serverResponse.data.id
          });
        } else {
          this.$notify.error({
            message: '用户名或密码错误'
          });
        }
      }).catch((error) => {
        console.log(error);
      }) */
    }
  }
};
</script>
<style scoped>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
}

.login-title {
  text-align: center;
  padding-bottom: 20px;
}

/* 背景图 */
.login{
  background: url("../../public/2.jpg");
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%
} 
</style>