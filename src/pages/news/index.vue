<!--我的-->
<template>
  <div class="root_v flex root">
    <News v-for="news in newsData" :key="news.news_id" :news="news"/>
    <p class="text-footer" v-if="!more">没有更多数据</p>
  </div>
</template>

<script>
  import {post} from "../../util";
  import News from "../../components/News";

  export default {
    // 传入组件的变量
    props: [""],
    // 变化频繁的变量
    data() {
      return {
        newsData: [],
        page: 0,
        size: 30,
        more: true,
      };
    },
    // 组件
    components: {
      News
    },
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
        this.getNews(true)
      },

      // 获取新闻数据
      async getNews(isRefresh) {
        if (isRefresh) {
          this.page = 0;
          this.more = true;
        } else {
          this.page = this.page + 1;
        }
        wx.showNavigationBarLoading(); // title显示刷新圈
        let newsData = await post("/news", {
          page: this.page
        });
        if (newsData.content.length < this.size && this.page > 0) {
          this.more = false;
        }
        if (isRefresh) {
          // 下拉刷新
          this.newsData = newsData.content
          wx.stopPullDownRefresh();
        } else {
          // 加载更多
          this.newsData = this.newsData.concat(newsData.content);
        }
        wx.hideNavigationBarLoading();// title刷新圈消失
      },
    },

    // 下拉刷新
    onPullDownRefresh() {
      this.getNews(true);
    },

    // 上拉加载更多
    onReachBottom() {
      if (!this.more) {
        //没有更多了
        return false;
      }
      this.getNews();
    },
  }
</script>

<style lang='scss' scoped>
  @function rpx($value) {
    @return $value * 1rpx;
  }

  .root {
    background-color: #e8e8e8;
  }

</style>
