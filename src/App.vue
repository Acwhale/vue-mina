<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
     <div class="title border-bottom">林间有风</div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='stylus' scoped>
  .title
        overflow hidden
        width 100%
        height 0
        padding-bottom 15%
        text-align center
        line-height 1.2rem
        color #666
        font-size .32rem
</style>
