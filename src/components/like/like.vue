<template>
    <div class="container" @click="onLike" >
        <img :src="selfLike ? yesSrc : noSrc" alt="like">
        <span>{{selfCount}}</span>
    </div>
   
</template>
<script>
import likeSrc from './images/like.png'
import likeDisSrc from './images/like@dis.png'
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
            selfLike: false,
            selfCount: 0,
            yesSrc: likeSrc,
            noSrc : likeDisSrc
        }
    },
    methods:{
        /**
            点击like组件
         */
        onLike(e){
            this.selfLike = !this.selfLike 
            this.selfCount = this.selfLike ? this.selfCount+1 : this.selfCount-1
            this.$emit('status',this.selfLike)
        }
    },
    created(){
        
        this.selfLike = this.like 
        this.selfCount = this.count
    }
}
</script>
<style lang='stylus' scoped>
    @import '~@/assets/style/varibles.styl'
    .container
        display inline-flex
        flex-direction row
        position relative
        margin-top .1rem
        line-height .24rem
        width .9rem
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
