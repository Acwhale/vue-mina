<template>
    <div class="classic-container">
        <img class="classic-img" :src="img" alt="">
        <img class="classic-tag" :src="movieTag" alt="">
        <div class="classic-content">{{content}}</div>
    </div>
</template>
<script>
import movieTag from './images/movie@tag.png'
export default {
    name:'CmpMovie',
    props:{
        img:String,
        content:String
    },
    data(){
        return{
            movieTag,
        }
    }
}
</script>
<style lang='stylus' scoped>
    .classic-container
        display flex
        flex-direction column
        align-items center
        width 100%
        .classic-img
            width 7.5rem
            height 5rem
        .classic-tag
            position relative
            right 3.1rem
            bottom .58rem
            width .46rem
            height 1.42rem
        .classic-content
            max-width 5.5rem
            line-height .5rem
            font-size .36rem
</style>

