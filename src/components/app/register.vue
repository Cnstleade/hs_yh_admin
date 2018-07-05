<template>
    <div id="register">
      <scroll ref="scroll" class="recommend-content" :data="discList" :click="false"> 
        <div>
          <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
              <slider>
                  <div v-for="item in recommends" :key = "item.uid">
                      <a :href="item.linkUrl">
                          <img  class="needsclick" :src="item.picUrl" @load="loadImage">
                      </a>
                  </div>
              </slider>
          </div>          
          <div  class="recommend-list">
            <div class="form-list">
              <div>
                  <input 
                  class="form-mobile"
                  v-model="mobile"
                  type="tel" name="mobile"
                   id="" placeholder="手机号码"> 
                  <input 
                  class="form-sms"
                  v-model="sms"
                   id="" placeholder="短信验证码">  
                  <button class="btn-1" @click="getSms()">获取</button> 
                  <div class="text">
                      <label >
                          <input type="checkbox" checked="" id="agree" value="0">
                          我已阅读并同意
                          <a href="/api/newslist/view_new/19">《提钱付服务协议》</a>
                          和
                          <a href="/api/pop/agreement">《赠送保险协议》</a>
                      </label>              
                  </div>  
                  <button 
                  class="form-go"
                  @click="submit()"
                  >    立即拿钱  </button>  
              </div>
            </div>
          </div>
        </div>
      </scroll>
    </div>
</template>

<script>
import Slider from "@/components/app/slider";
import { getH5Register, getH5Sms } from "../../service/http";
import Scroll from "@/components/app/scroll";
export default {
  data() {
    return {
      code: "",
      mobile: "",
      sms: "",
      recommends: [
        {
          uid: 1,
          picUrl: require("../../assets/img/bannner1.jpg"),
          linkUrl: ""
        },
        {
          uid: 2,
          picUrl: require("../../assets/img/bannner2.jpg"),
          linkUrl: ""
        },
        {
          uid: 3,
          picUrl: require("../../assets/img/bannner3.jpg"),
          linkUrl: ""
        }
      ],
      loop: true,
      discList: [
        {
          img: require("../../assets/top.jpg"),
          name: "1鹅鹅鹅",
          dissname: "鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅浮绿水，红掌拨清波。"
        }
      ]
    };
  },
  components: {
    Scroll,
    Slider
  },
  methods: {
    loadImage() {
      if (!this.checkloaded) {
        this.checkloaded = true;
        setTimeout(() => {
          this.$refs.scroll.refresh();
        }, 20);
      }
    },
    _rem(div) {
      var docEl = document.documentElement,
        di = document.getElementById(div),
        clientWidth = docEl.clientWidth;
      di.style.fontSize = 20 * (clientWidth / 320) + "px";
    },
    rem(doc, win, div) {
      var docEl = doc.documentElement,
        di = document.getElementById(div),
        resizeEvt =
          "orientationchange" in window ? "orientationchange" : "resize",
        recalc = function() {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          di.style.fontSize = 20 * (clientWidth / 320) + "px";
        };
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener("DOMContentLoaded", recalc, false);
    },
    getSms() {
      let _this = this;
      var isMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      if (this.mobile && isMobile.test(this.mobile)) {
        console.log(1);
        getH5Sms(this.mobile)
          .then(res => {
            _this.code = null;
            console.log(res);
            _this.code = res.data;
          })
          .catch();
      } else {
        this.$message.error("请输入正确手机号");
      }
    },
    submit() {
      var isMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

      if (this.mobile && isMobile.test(this.mobile)) {
        console.log(this.code);
        if (this.sms == this.code) {
          getH5Register(this.mobile)
            .then(res=>{
              let data = res.data;
              if(data.message="注册成功"){
                this.$message({
                  message: "注册成功",
                  type: "success"
                });
              }
            })
            .catch();
        }else{
          this.$message.error("请输入验证码")
        }
      } else {
        this.$message.error("请输入正确手机号");
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this._rem("register");
      this.rem(document, window, "register");
    });
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/common.scss";
@import "@/assets/css/mixin.scss";
#register {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  background: #ccc;
  background-size: 100% auto;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .recommend-list {
      padding: 2rem 1.2rem;
      font-size: 0;
      .form-mobile {
        padding: 0 0.5rem;
        @include wh(100%, 4rem);
        @include borderRadius(0.8rem);
        @include font(1.2rem, 4rem);
      }
      .form-sms {
        margin-top: 0.8rem;
        padding: 0 0.5rem;
        @include wh(60%, 4rem);
        @include font(1.2rem, 4rem);
        @include borderRadius(0.8rem);
      }
      .btn-1 {
        @include wh(35%, 4rem);
        @include borderRadius(0.8rem);
        margin-left: 5%;
        @include font(1.2rem, 4rem);
      }
      .text {
        margin-top: 0.5rem;
        padding: 0;
        color: red;
        @include font(0.4rem, 1rem);
        input {
          vertical-align: -2px;
        }
      }
      .form-go {
        margin-top: 0.5rem;
        @include wh(100%, 4rem);
        @include borderRadius(0.8rem);
        @include font(1.2rem, 4rem);
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .needsclick {
    height: 12rem;
  }
}
</style>

