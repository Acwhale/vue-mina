<template>
    <div class="container" @click="onLike">
        <img :src="selfLike ? yesSrc : noSrc" alt="like">
        <span>{{selfCount}}</span>
    </div>
   
</template>
<script>
import like from './images/like.png'
import likeDis from './images/like@dis.png'
export default {
    name:"CmpLike",
    props:{
        count:{
            type:Number,
            default:0,
        },
        like:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            selfLike: this.like,
            selfCount:this.count,
            yesSrc: like,
            noSrc : likeDis
        }
    },
    methods:{
        /**
            点击like组件
         */
        onLike(e){
            this.selfLike = !this.selfLike
            let count = this.selfCount
            this.selfCount = this.selfLike ? this.selfCount+1 : this.selfCount-1
        }
    }
}
</script>
<style lang='stylus' scoped>
    @import '~@/assets/style/varibles.styl';
    
    .container
        display inline-flex
        flex-direction row
        position relative
        margin-top .1rem
        line-height .24rem
    .container img 
        width .32rem           
        height .28rem 
    .container span 
        position absolute
        bottom .1rem
        left .35rem
        font-family $fontFamily
        font-size  .24rem
        color #bbbbbb
</style>
