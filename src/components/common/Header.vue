<template>
  <div class="header" :style="{backgroundColor:color}">
    <!-- 折叠按钮 -->
    <div class="header-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="header-logo">
      中安租赁
    </div>
    <div class="menu">
      <el-tag>
        <a href="" style="color: #409eff;">系统设置</a>
      </el-tag>
      <el-tag type="success">
        <a href="" style="color:#67c23a">用户管理</a>
      </el-tag>
      <el-tag type="info">
        <a href="" style="color:#909399">理财管理</a>
      </el-tag>
      <el-tag type="warning">
        <a href="" style="color:#e6a23c;">资金管理</a>
      </el-tag>
    </div>
    <div class="header-right">
      <!-- 全屏显示 -->
      <div class="header-fullscreen" @click="handleFullScreen">
        <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
          <i class="el-icon-rank"></i>
        </el-tooltip>
      </div>
      <!-- 用户头像 -->
      <div class="header-user-avator">
        <img src="static/img/img.jpg" alt="">
      </div>
      <!-- 用户名下拉列表 -->
      <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{username}}<i class="el-icon-caret-bottom"></i>
                </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="admin/basicInformation">基本资料</el-dropdown-item>
          <el-dropdown-item command="editPassword">密码管理</el-dropdown-item>
          <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="btn-bell">
        <el-color-picker
          v-model="color"
          show-alpha
          :predefine="predefineColors">
        </el-color-picker>
      </div>
    </div>
  </div>
</template>

<script>
  import bus from "../../config/bus";

  export default {
    data() {
      return {
        name: "admin",
        fullscreen: false,
        color: "#242f42",
        predefineColors: [
          "#ff4500",
          "#ff8c00",
          "#ffd700",
          "#90ee90",
          "#00ced1",
          "#1e90ff",
          "#c71585",
          "rgba(255, 69, 0, 0.68)",
          "rgb(255, 120, 0)",
          "hsv(51, 100, 98)",
          "hsva(120, 40, 94, 0.5)",
          "hsl(181, 100%, 37%)",
          "hsla(209, 100%, 56%, 0.73)",
          "#c7158577"
        ]
      };
    },
    computed: {
      username() {
        let username = sessionStorage.getItem("fk_username");
        if (username != '' && username != null && username != 'undefined') {
          return username ? username : this.name;
        }else {
          this.$router.push("/login");
        }
      }
    },
    methods: {
      // 用户名下拉菜单选择事件
      handleCommand(command) {
        if (command == "loginout") {
          sessionStorage.removeItem("fk_username");
          this.$router.push("/login");
        } else {
          this.$router.push("/" + command);
        }
      },
      // 侧边栏折叠
      collapseChage() {
        this.collapse = !this.collapse;
        bus.$emit("collapse", this.collapse);
      },
      // 全屏事件
      handleFullScreen() {
        let element = document.documentElement;
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      }
    }
  };
</script>

<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    font-size: 22px;
    color: #fff;
    background: #000;
  }

  .header-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 50px;
  }

  .header-logo {
    float: left;
    width: 250px;
    line-height: 50px;
  }

  .header-right {
    float: right;
    padding-right: 50px;
    display: flex;
    height: 50px;
    align-items: center;
  }

  .header-user-avator {
    margin-right: 10px;
  }

  .header-user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .header-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
    transform: rotate(45deg);
    margin-right: 10px;
    font-size: 24px;
  }

  .btn-bell {
    margin-top: 5px;
  }

  .user-name {
    margin-right: 10px;
    color: #fff;
    cursor: pointer;
  }

  .header .menu {
    float: left;
    line-height: 50px;
  }
</style>
