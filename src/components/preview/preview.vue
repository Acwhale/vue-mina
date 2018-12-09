<template>
    <div class="container">
        <div class="head">
            <cmp-tag :text="classicText" class="tag"></cmp-tag>
            <cmp-like class="like" :like="status" :count="classic.fav_nums"></cmp-like>
        </div>
        <img :class="classic.type == '200' ? 'music-img' : 'other-img'" :src="classic.image" alt="">
        <div class="text">{{classic.content}}</div>
    </div>
</template>

<script>
import CmpTag  from "@/components/tag/tag"
import CmpLike from "@/components/like/like"
export default {
    name :"CmpPerview",
    props:{
        classic:Object
    },
    components:{
        CmpTag,
        CmpLike
    },
    computed:{
        classicText(){
            switch(this.classic.type){
                case 100:
                    return '电影'
                    break
                case 200:
                    return "音乐"
                    break
                case 300:
                    return "句子"
                    break
            }
        },
        status(){
            return this.classic.like_status == 1 ? true : false 
        }
    }
}
</script>
<style lang="stylus" scoped>    
    .text{
        padding .3rem
        font-size .28rem
        height 1.3rem
        color #666666
        overflow  hidden
    }
    .other-img{
        width 100%
        height 2.4rem
    }
    .music-img{
        border-radius 50%
        width 2.4rem
        height 2.4rem
    }
    .like{
        margin-top .04rem
        margin-right .04rem
    }
    .tag{
        margin-left .2rem
        margin-top -.02rem
        height .4rem 
        width .72rem
        font-size .3rem
        background-color #f7f7f7 !important
    }
    .head{
        display flex
        flex-direction  row
        width 100%
        align-items center
        justify-content space-between
        height .8rem

    }
    .container{
        display  flex
        flex-direction column
        align-items center
        width 3.3rem
        background-color #ffffff
    }
</style>
