<template>
  <div id="app" class="header">
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
  .header
    display flex
    flex-direction  column
    align-items center
    .title
          width 100%
          text-align center
          line-height 1.2rem
          color #666
          font-size .32rem
</style>
