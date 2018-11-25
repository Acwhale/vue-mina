<template>
    <div class="essay-container">
        <img class="essay-img" :src="img" alt="">
        <img class="essay-tag" :src="essaySrc" alt="">
        <div class="essay-content">{{content}}</div>
    </div>
</template>

<script>
import essaySrc from './images/essay@tag.png'
export default {
    name:"CmpEssay",
    props:{
        img:String,
        content:String
    },
    data(){
        return{
            essaySrc
        }
    },
}
</script>

<style lang='stylus' scoped>
    .essay-container {
        display flex
        flex-direction column
        align-items center
        width 100%
    }
    .essay-img{
        width 7.5rem
        height 5rem
    }
            
    .essay-tag{
        position relative
        right 3.1rem
        bottom .58rem
        width .46rem
        height 1.42rem
    }
    .essay-content{
        max-width 5.5rem
        line-height .5rem
        font-size .36rem
    } 
</style>
