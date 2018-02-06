<template>
  <div class="search_list">
    <vHeader :title="title"></vHeader>
    <div class="container">
      <section class="cont" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
          <div v-for="item in list" @click=goDir(item.url) class="story_list">
            <div class="story_cover">
              <img :src="item.image">
            </div>
            <div class="story_info">
              <h3 class="story_title">{{item.name}}</h3>
              <ul>
                <li>作者：{{item.author_name}}</li>
                <li>分类：{{item.genre}}</li>
                <li>状态：{{item.updateStatus}}</li>
                <li>最新：{{item.newestChapter_headline}}</li>
              </ul>
            </div>
          </div>
      </section>
      <div v-if="!isLoading" class="nocenter">暂无更多内容！</div>
      <loading title="结果加载中..." v-if="isLoading && busy" class="loading-top"></loading>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'
import VHeader from '@/components/header'
import Loading from '@/components/loading/loading'
export default{
  data () {
    return {
      title: '',
      list: [],
      busy: true,
      isLoading: false,
      isConent: true,
      page: 0,  // 当前页
      totalNum: 0  // 一共有多少页
    }
  },
  // http://s.youmeixun.com/book/sapi?q=%E5%BF%A0&page=0
  created () {
    const searchValue = this.$route.query.q
    this.title = searchValue + '-搜索结果'
    this._getSearchValue(searchValue, this.page)
  },
  methods: {
    _getSearchValue (searchValue, page) {
      const _this = this
      const _query = encodeURI(searchValue)
      const url = `http://s.youmeixun.com/book/sapi?q=${_query}&page=${page}`
      _this.isLoading = true
      axios.get(url)
        .then(function (res) {
          _this.isLoading = false
          const _data = res.data
          _this.totalNum = Math.floor(_data.totalNum / 10)  // 计算有多少条数据并除以10，得到需要显示的页数
          if (_this.page === 0) {
            _this.list = _data.results
            _this.busy = false  // 再次打开
            _this.isConent = true
          } else {
            _this.list = _this.list.concat(_data.results)   // 旧数据与新数据拼加
            // 如果没有内容了
            if (_this.page === _this.totalNum) {
              _this.busy = true  // 关闭滚动加载的开关
              _this.isLoading = false
              _this.isConent = false
            } else {
              _this.busy = false
            }
          }
        }).catch((err) => {
          const searchValue = this.$route.query.q
          // 接口请求错误时触发
          console.log(err)
          this.busy = true
          this._getSearchValue(searchValue, this.page)
        })
    },
    loadMore () {
      this.busy = true
      this.isLoading = true
      const searchValue = this.$route.query.q
      console.log(this.page, this.list)
      setTimeout(() => {
        if (this.isConent) {
          this.page ++
          this._getSearchValue(searchValue, this.page)
        }
      }, 1000)
    },
    goDir (url) {
      // 把URL地址中的文章ID提取出来并存进数组strarr
      var strarr = url.match(/\d+/g)
      this.$router.push({ path: `dir/${strarr[1]}/${strarr[2]}` }) // --> /dir/2/2430
      // const userId = 123
      // router.push({ name: 'user', params: { userId }}) // -> /user/123
      // router.push({ path: `/user/${userId}` }) // -> /user/123
      // 这里的 params 不生效
      // router.push({ path: '/user', params: { userId }}) // -> /user
      // "http://www.37zw.com/2/2699
      // http://localhost:8081/#/dir/6/6298
    }
  },
  directives: {
    infiniteScroll
  },
  components: {
    VHeader,
    Loading
  }
}
</script>
<style>
  .search_list{
    background: #eeeff1;
  }
  .story_list{
    display: -webkit-flex;
    display: flex;
    width: 94%;
    padding: 0.2rem 3%;
    margin-top: 0.2rem;
    background: #ffffff;
    border-bottom: 0.01rem solid #d8d8d8;
  }
  .story_cover img{
    width: 2rem;
    height: 2.4rem;
  }
  .story_info{
    padding-left: 0.2rem;
    flex: 1;
  }
  .story_info h3{
    line-height: 0.6rem;
    font-size: 0.32rem;
    font-weight: normal;
    color: #434343;
  }.story_info li{
    line-height: 0.5rem;
    font-size: 0.22rem;
    list-style: none;
    color: #434343;
  }
  .loading-top{
    margin: .2rem 0;
  }
  .nocenter{
    padding: .3rem;
    text-align: center;
    color: #666;
    font-size: .26rem;
  }
</style>
