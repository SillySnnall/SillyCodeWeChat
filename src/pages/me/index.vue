<!--我的-->
<template>
  <div class="root_v flex root">
    <div class="head flex">
      <button open-type="getUserInfo" class="flex login_btn" @getuserinfo="bindGetUserInfo">
        <img :src="avatar" class="image">
        {{username}}
      </button>
    </div>

    <!--<div class="server flex">-->
      <!--<div class="server_item flex">-->
        <!--<div class="server_item_text"><img src="../../../static/img/shou_can.svg" class="text_img">收藏</div>-->
        <!--<img src="../../../static/img/right.svg" class="server_image">-->
      <!--</div>-->
      <!--<div class="server_item flex">-->
        <!--<div class="server_item_text"><img src="../../../static/img/you_hui_juan.svg" class="text_img">优惠券</div>-->
        <!--<img src="../../../static/img/right.svg" class="server_image">-->
      <!--</div>-->
      <!--<div class="server_item flex">-->
        <!--<div class="server_item_text"><img src="../../../static/img/yao_qing.svg" class="text_img">邀请好友</div>-->
        <!--<img src="../../../static/img/right.svg" class="server_image">-->
      <!--</div>-->

      <!--<div class="server_item flex">-->
        <!--<div class="server_item_text"><img src="../../../static/img/help.svg" class="text_img">帮助与客服</div>-->
        <!--<img src="../../../static/img/right.svg" class="server_image">-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import config from "../../config";
  import {post} from "../../util";

  export default {
    // 传入组件的变量
    props: [""],
    // 变化频繁的变量
    data() {
      return {
        username: "",
        avatar: "",
      };
    },
    // 组件
    components: {},
    // 变化频繁的方法,和界面有直接联系
    computed: {},
    // 初始化，只执行一次
    mounted() {
      this.init()
    },
    // 普通的方法
    methods: {
      // 初始化数据
      init() {
        const self = this;
        // 判断微信是否是新版本
        if (!wx.canIUse('button.open-type.getUserInfo')) {
          //TODO 微信版本过低，请升级微信
          return
        }
        // 判断是否获取了权限直接登录
        wx.getSetting({
          success: set => {
            if (set.authSetting['scope.userInfo']) {
              // 已经授权
              console.log("已授权")
              self.login()
            } else {
              // 未授权
              console.log("未授权")
              self.username = "登录"
              self.avatar = "../../../static/img/unlogin.png"
            }
          }
        })
      },
      // 判断用户是否授权
      bindGetUserInfo(e) {
        if (wx.getStorageSync("userinfo")) {
          //todo 点击头像已经登录
          return
        }
        if (e.mp.detail.rawData) {
          //用户按了允许授权按钮
          this.login()
        } else {
          //用户按了拒绝按钮
        }
      },
      // 登录
      async login() {
        // 判断是否已经登录过了
        let user = wx.getStorageSync("userinfo");
        if (user) {
          // 已经登陆过,后端数据库已有数据，直接向后端获取userinfo
          let login = await post("/login", {
            account: user.account
          });
          this.username = login.username
          this.avatar = login.avatar
          wx.setStorageSync("userinfo", login);
        } else {
          // 第一次登录，类似注册，向后端发送wxcode，后端获取openid，创建userinfo入库
          wx.getUserInfo({
            success: user => {
              wx.login({
                success: async key => {
                  let login = await post("/login", {
                    username: user.userInfo.nickName,
                    avatar: user.userInfo.avatarUrl,
                    account: key.code
                  });
                  this.username = login.username
                  this.avatar = login.avatar
                  wx.setStorageSync("userinfo", login);
                }
              })
            }
          })
        }
      },
    },
  }
</script>

<style lang='scss' scoped>
  @function rpx($value) {
    @return $value * 1rpx;
  }

  .root {
    height: 100vh;
    background-color: #e8e8e8;
    .head {
      width: 100%;
      flex-direction: column;
      align-items: center;
      background-color: #1890ff;
      .image {
        width: rpx(150);
        height: rpx(150);
        border-radius: 50%;
      }
      button::after {
        border: none;
      }
      .login_btn {
        margin-top: rpx(40);
        margin-bottom: rpx(60);
        background-color: #1890ff;
        flex-direction: column;
        align-items: center;
        color: white;
      }
    }
    .server {
      flex-direction: column;
      width: 100%;
      margin-top: rpx(15);
      .server_item {
        flex-direction: row;
        background-color: white;
        justify-content: space-between;
        align-items: center;
        margin-bottom: rpx(5);
        padding-bottom: rpx(30);
        padding-top: rpx(30);

        .server_item_text {
          margin-left: rpx(30);
          font-size: rpx(35);
          .text_img {
            margin-right: rpx(15);
            width: rpx(35);
            height: rpx(35);
          }
        }
        .server_image {
          margin-right: rpx(30);
          width: rpx(30);
          height: rpx(30);
        }
      }
    }
  }

</style>
