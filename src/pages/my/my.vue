<template>
    <div class="container">
        <img :src="my" alt="my" class="bg">
        <div class="about-container">
            <div class="about-us">
                <img :src="about" alt="">
                <span class="description">关于我们</span>
            </div>
            <div class="about-us">
                <span class="favCount">{{favCount}}</span>
                <span class="description">喜欢的书</span>
            </div>
        </div>
        <div class="like-container">
            <img class="headline" :src="like" alt="">
            <div class="preview-container" >
                    <div  v-for="(item,index) of favCalssic" :key="index">
                        <cmp-perview :classic="item" class="preview"></cmp-perview>
                    </div>
            </div>
        </div>
    </div>

</template>
<script>
import my from "@/assets/images/my/my@bg.png"
import about from "@/assets/images/my/about.png"
import like from "@/assets/images/my/like.png"

import BookModel from "@/model/book.js"
let bookModel = new BookModel()
import ClassicModel from "@/model/classic.js"
let classicModel = new ClassicModel()

import CmpPerview from '@/components/preview/preview'
export default {
    name: "My",
    components:{
        CmpPerview
    },
    data(){
        return {
            my,
            about,
            like,
            favCount:0,
            favCalssic:[]
        }
    },
    methods:{
        getfavCount(){
            bookModel.getfavCount().then((res)=>{
                if(res.status == 200 && res.statusText == "OK"){
                    res = res.data
                    this.favCount = res.count
                }
            })
        },
        getfavCalssic(){
            classicModel.getfavCalssic().then((res)=>{
                if(res.status == 200 && res.statusText == "OK"){
                    res = res.data
                    this.favCalssic = res
                }
            })
        }
    },
    mounted(){
        this.getfavCount()
        this.getfavCalssic()
    }
}
</script>
<style lang="stylus" scoped>
    .preview{
        margin-bottom .3rem
    }
    .preview-container{
        margin-top .3rem
        display flex
        flex-direction row
        padding 0 .3rem
        flex-wrap  wrap
        justify-content space-between
    }
    .headline{
        margin-top .3rem
        width .97rem
        height .42rem
    }
    .like-container{
        width 100%
        display flex
        flex-direction column
        align-items  center 
        background-color #f5f5f5
        margin-bottom .9rem
    }
    .favCount{
        color #999
        font-size .3rem
    }
    .description{
        font-size .3rem
        color #999
    }
    .about-us image{
    width   .4rem
    height .4rem
    }
    .about-us{
        display flex
        flex-direction column
        align-items center
        justify-content space-between
    }
    .about-container{
        padding 0 1rem
        width 5.5rem
        display flex
        flex-direction row
        justify-content space-between
        position absolute
        top 5.4rem
    }
    .container{
        display flex
        flex-direction column
        align-items center
    }
    .bg{
        width 7.5rem
        height 5.7rem
    }
</style>
