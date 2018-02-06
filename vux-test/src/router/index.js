import Vue from 'vue'
import Router from 'vue-router'
import Book from '@/components/book'
import List from '@/components/List'
import Dir from '@/components/Dir'
import Text from '@/components/text'
import Test from '@/components/test'
import Trains from '@/components/train'
import Searchlist from '@/components/search_list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Book',
      component: Book
    },
    {
      path: '/list/:catalogid/:listid',
      name: 'List',
      component: List
    },
    {
      path: '/dir/:sid/:listid',
      name: 'Dir',
      component: Dir
    },
    {
      path: '/text/:sid/:listid/:textid',
      name: 'text',
      component: Text
    },
    {
      path: '/test/',
      name: 'test',
      component: Test
    },
    {
      path: '/train',
      name: 'train',
      component: Trains
    },
    {
      path: '/search_list',
      name: 'search_list',
      component: Searchlist
    }
  ]
})
