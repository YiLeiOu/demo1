<template>
<div class="container">
  <v-header :title="title"></v-header>
  <section class="container">

        <div class="m-show">
            <loading title="文章加载中……" class="loading-top" v-if="isLoading"></loading>
            <div class="show-cnt">
                  <p v-for="item of list">{{item}}</p>
            </div>
        </div>
        <div class="show-page">

            <router-link :to="`/text/${this.other.id}/${this.other.sid}/${this.other.previd}`">上一章</router-link>

            <router-link :to="`/dir/${this.other.id}/${this.other.sid}`" class="show-dir">目录</router-link>

            <router-link :to="`/text/${this.other.id}/${this.other.sid}/${this.other.nextid}`" v-if="this.other.nextid !== this.other.sid">下一章</router-link>

        </div>
    </section>
</div>
</template>

<script>
import axios from 'axios'
import VHeader from '@/components/header'
import Loading from '@/components/loading/loading'
export default {
  data () {
    return {
      title: '章节加载中……',
      content: '',
      other: '',
      list: []
    }
  },
  created () {
    const _sid = this.$route.params.sid
    const _listid = this.$route.params.listid
    const _textid = this.$route.params.textid
    this._getCatalogList(_sid, _listid, _textid)
  },
  watch: {
    '$route' (to, from) {
      this._getCatalogList(to.params.sid, to.params.listid, to.params.textid)
    }
  },
  methods: {
    _getCatalogList (_sid, _listid, _textid) {
      // 保证作用域一致
      const _this = this
      // 提示“加载中……”的小组件
      _this.isLoading = true
      // 获取服务器端定义的url
      const url = `/bookzw/show/${_sid}/${_listid}/${_textid}`
      this.sid = _sid
      axios.get(url)
        .then(function (res) {
          const _data = res.data
          _this.isLoading = false
          if (_data.code === 0) {
            let _content = _data.data.content
            _content = _content.replace('三七中文手机版 m.37zw.com', '阿雷的小说网')
            _this.title = _data.data.title
            _this.content = _data.data.content
            _this.other = _data.data.other
            _this.list = _content.split(/\s{4}/g)
          }
        })
    }
  },
  components: {
    VHeader,
    Loading
  }
}
</script>

<style lang = "css">
.list{
}
.loading-top{
  padding-top: 20px;
}
</style>
