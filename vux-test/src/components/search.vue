<template>
  <div class="m-img">
    <ul>
      <li v-for="item in list">
        <img :src="item.img">
        <span v-text="item.title"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="less">
.m-img{
  li{
    img{
      display: block;
      width: 100%;
    }
  }
}
</style>
