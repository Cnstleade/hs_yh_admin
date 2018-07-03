<template>
    <div id="register">
      <scroll ref="scroll" class="recommend-content" :data="discList"> 
        <div  class="recommend-list">
            <form class="form-list">
                <input 
                class="form-mobile"
                type="tel" name="mobile"
                 id="" placeholder="手机号码">         
                <input 
                class="form-sms"
                type="tel" name="mobile"
                 id="" placeholder="短信验证码">  
                <button class="btn-1">获取</button>      
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
                >    立即拿钱  </button>                                                             
            </form>

        </div>
      </scroll>
    </div>
</template>

<script>
import Scroll from "@/components/app/scroll";
export default {
  data() {
    return {
      recommends: [],
      loop: true,
      discList: [
        {
          img: require("../../assets/logo.png"),
          name: "1鹅鹅鹅",
          dissname:
            "鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。"
        },
        {
          img: require("../../assets/logo.png"),
          name: "2曲项向天歌",
          dissname: "鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。"
        },
        {
          img: require("../../assets/logo.png"),
          name: "3白毛浮绿水",
          dissname: "鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。"
        },
        {
          img: require("../../assets/logo.png"),
          name: "4红掌拨清波",
          dissname: "鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。"
        },
        {
          img: require("../../assets/logo.png"),
          name: "5春种一粒粟",
          dissname: "鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。"
        },
        {
          img: require("../../assets/logo.png"),
          name: "6秋收万颗子",
          dissname: "鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。"
        },
        {
          img: require("../../assets/logo.png"),
          name: "7四海无闲田",
          dissname: "鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。"
        },
        {
          img: require("../../assets/logo.png"),
          name: "8农夫犹饿死",
          dissname: "鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。"
        },
        {
          img: require("../../assets/logo.png"),
          name: "9锄禾日当午",
          dissname: "鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。"
        },
        {
          img: require("../../assets/logo.png"),
          name: "10汗滴禾下土",
          dissname: "鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。"
        }
      ]
    };
  },
  components: {
    Scroll
  },
  methods: {
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
}
</style>

