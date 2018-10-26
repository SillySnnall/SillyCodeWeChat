<template>
  <div class="flex root"  @click="itemClick">
    <div class="img_div">
      <img class="img"
           :src="news.imgurl"
           :alt="news.summary">
    </div>
    <div class="content flex">
      <p class="title">{{news.title}}</p>
      <div class="flex remarks">
        <p>{{news.source}}</p>
        <p>{{getTime}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "../util";
  export default {
    // 传入组件的变量
    props: ["news"],
    // 变化频繁的变量
    data() {
      return {};
    },
    // 组件
    components: {},
    // 变化频繁的方法，和界面有直接联系
    computed: {
      getTime () {
        return formatDate(this.news.cdateTime)
      },
    },
    // 初始化，只执行一次
    mounted() {
    },
    // 普通的方法
    methods: {
      itemClick() {
        wx.navigateTo({
          url: "/pages/news_detail/main?newsId=" + this.news.newsId
        });
      }
    },
  }
</script>

<style lang='scss' scoped>
  @function rpx($value) {
    @return $value * 1rpx;
  }

  .root {
    width: 100%;
    background-color: white;
    flex-direction: row;
    justify-content: space-around;
    padding: rpx(8);
    margin: rpx(2);
    .img_div {
      height: rpx(162);
      width: rpx(216);
      .img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      flex-direction: column;
      justify-content: space-between;
      width: rpx(500);
      .title {
        color: #1a1a1a;
        font-weight: 400;
        font-size: rpx(36);
      }
      .remarks {
        font-size: rpx(24);
        color: #888;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
</style>
