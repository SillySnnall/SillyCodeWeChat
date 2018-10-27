<!--新闻详情页-->
<template>
  <div class="root">
    <wxParse :content="article" @preview="preview" @navigate="navigate"/>
  </div>
</template>

<script>
  import wxParse from 'mpvue-wxparse'
  import {post} from "../../util";

  export default {
    // 传入组件的变量
    props: [""],
    // 变化频繁的变量
    data() {
      return {
        newsId: "",
        article: "  "
      };
    },
    // 组件
    components: {
      wxParse
    },
    // 变化频繁的方法,和界面有直接联系
    computed: {},
    // 初始化，只执行一次
    mounted() {
      this.newsId = this.$root.$mp.query.newsId;
      this.init()
    },
    // 普通的方法
    methods: {
      // 初始化数据
      init() {
        this.getNewsDetail()
      },

      // 获取新闻数据
      async getNewsDetail() {
        let newsDetailData = await post("/news_detail", {
          newsId: this.newsId
        });
        this.article = newsDetailData.contents
      },
    },
  }
</script>

<style lang='scss' scoped>
  @import url("~mpvue-wxparse/src/wxParse.css");

  @function rpx($value) {
    @return $value * 1rpx;
  }

  .root {
    padding: rpx(20);
  }

</style>
