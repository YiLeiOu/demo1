<template>
  <div class="m-dir">
      <v-header :title="title"></v-header>
      <div class="container">
          <div class="m-info clearfix">
            <div class="info-thumb">
            <img :src="info.thumb" :alt="info.title">
            </div>
            <div class="info-text">
            <h1>{{title}}</h1>
              <ul>
                <li>{{info.author}}</li>
                <li>{{info.sorts}}</li>
                <li>{{info.start}}</li>
                <li>{{info.update}}</li>
                <li>{{info.newest}}</li>
            </ul>
            </div>
          </div>

          <div class="m-intro">
            <div class="intro-cnt">
              {{info.introInfo}}
            </div>
          </div>

          <div class="m-dir">
            <div class="m-dir-tit">目录</div>
              <ul class="dir-list">
                <li v-for="item in list">
                  <router-link :to="`/text/${item.id}/${item.sid}/${item.aid}`">{{item.name}}</router-link>
                </li>
              </ul>
            </div>
          </div>
          <loading title="目录加载中……" v-if="isLoading" class="loading-top"></loading>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import VHeader from '@/components/header'
import Loading from '@/components/loading/loading'
export default {
  data () {
    return {
      title: '标题加载中……',
      info: {},
      list: []
    }
  },
  created () {
    const _sid = this.$route.params.sid
    const _listid = this.$route.params.listid
    this._getList(_sid, _listid)
  },
  methods: {
    _getList (_sid, _listid) {
      const _this = this
      _this.isLoading = true
      const url = `/bookzw/dir/${_sid}/${_listid}`
      console.log(url)
      this.sid = _sid
      axios.get(url)
        .then(function (res) {
          _this.isLoading = false
          const _data = res.data
          if (_data.code === 0) {
            let _dataIn = _data.data
            _this.title = _dataIn.info.name
            _this.info = _dataIn.info
            _this.list = _dataIn.list.reverse()   // 章节按升序排列
            //  怎么实现记录上次阅读的位置？
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

<style lang="css">
.list{

}
.loading-top{
  padding-top: 40px;
}
</style>
