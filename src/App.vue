<template>
  <div id="app" class="header">
    <!-- <img src="./assets/logo.png"> -->
     <div class="title border-bottom">林间有风</div>
     <keep-alive >
      <router-view/>
     </keep-alive>
    <div>
       <van-tabbar v-model="active" >
              <van-tabbar-item to="/">
                  <span>流行</span>
                  <img
                  slot="icon"
                  slot-scope="props"
                  :src="props.active ? icon.active : icon.normal"
                
                  >
              </van-tabbar-item>
              <van-tabbar-item to="/book" >
                  <span>书籍</span>
                  <img
                  slot="icon"
                  slot-scope="props"
                  :src="props.active ? iconBook.active : iconBook.normal"
                  >
              </van-tabbar-item>
              <van-tabbar-item to="/my">
                  <span>我的</span>
                  <img
                  slot="icon"
                  slot-scope="props"
                  :src="props.active ? iconMy.active : iconMy.normal"
                  >
              </van-tabbar-item>
          </van-tabbar>
      </div>
  </div>
</template>

<script>
import classic from '@/assets/images/tab/classic.png'
import classicActive from '@/assets/images/tab/classic@highlight.png'
import book from '@/assets/images/tab/book.png'
import bookActive from '@/assets/images/tab/book@highlight.png'
import my from '@/assets/images/tab/my.png'
import myActive from '@/assets/images/tab/my@highlight.png'


export default {
  name: 'App',
  data() {
    return{
      active: 0,
      icon: {
        normal: classic,
        active: classicActive
      },
      iconBook:{
        normal: book,
        active: bookActive
      },
      iconMy:{
        normal: my,
        active: myActive
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
   .van-tabbar-item--active{
    color : #000
    
  }
  .van-tabbar{
    z-index:10
  }
  
  .van-tabbar-item{
    font-size .24rem 
  }  
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
