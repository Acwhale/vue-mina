<template>
    <div>
        <div class="container">
            <div class="header">
                <div class="search-container">
                    <img class="icon" :src="search" alt="">
                    <input placeholder-class='in-bar' placeholder='书籍名' class='bar' 
                            auto-focus v-model="word" @click="handleHistory" />
                    <img class="cancel-img"  :src="cancel" alt="">
                </div>
                <div class="cancel" @click="handleCancel"> 取消</div>
            </div>
        </div>
        <div>
            <div class="history">
                <div class="title">
                    <div class="chunk"></div>
                    <span>历史搜索</span>
                </div>
                <div class="tags">
                    <div v-for="(item,key) of history" :key="key"> 
                        <cmp-tag :text="item"></cmp-tag>
                    </div>
                </div> 
            </div>
             <div class="history hot-search">
                <div class="title">
                    <div class="chunk"></div>
                    <span>热门搜索</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import search from './images/search.png'
import cancel from './images/cancel.png'

import CmpTag from "@/components/tag/tag"

import { Toast } from 'vant'

import keywordModel from './keyword.js'
let keyword = new keywordModel()
export default {
    name:"CmpSearch",
    components:{
        CmpTag
    },
    data(){
        return {
            search,
            cancel,
            word:'',
            history:[]
        }
    },
    methods:{
        handleCancel(){
            this.$emit('cancel')
        },
        handleHistory(){
            if(this.word.length == 0){
                Toast('请输入搜索的内容')
                return
            }
            keyword.setHistory(this.word)
        }
    },
    mounted(){
        this.history = keyword.getHistory()
    }
}
</script>
<style lang="stylus" scoped>
    .tags{
        display flex
        flex-direction row
        flex-wrap wrap
        margin-top .3rem
        margin-left .2rem
        width 100%
        // padding .05rem
    }
    .hot-search{
        margin-top .7rem
    }
    .chunk{
        height .3rem
        width .05rem
        background-color #000
        display inline-block
        margin-right .1rem
    }
    .title{
        line-height .15rem
        display flex
        flex-direction row
        align-items center
    }
    .history{
        width 100%
        margin  .4rem 0 .2rem 0
        display flex
        font-size .14rem
        margin-top 1rem
        flex-direction column
    }
    .cancel{
        line-height .3rem
        width .6rem
        text-align center
        display inline-block
        border none
    }
    .cancel-img{
        width .28rem
        height .28remm
        margin-right .3rem 
        margin-left .1rem
    }
    .bar{
       border-top-right-radius .15rem
       border-bottom-right-radius .15rem
       display inline-block
       height .6rem
       width 5rem
       font-size .15rem
       background-color #f5f5f5
    }
    .in-bar {
        color #999
    }
    .icon{
        width .28rem
        height .28remm
        margin-left .4rem
        margin-right .08rem
    }
    .container{
        display flex
        flex-direction column
        align-items center
        width 100%
    }
    .header{
        background-color #ffffff
        position relative
        height 1rem
        border-top .01rem solid #f5f5f5
        border-bottom .01rem solid #f5f5f5
        display  flex
        flex-direction row
        width 7.5rem
        align-items center
        z-index 9
    }
    .search-container{
        display inline-flex
        flex-direction row
        align-items center
        background-color #f5f5f5
        border-radius .5rem
        margin-left .2rem
    }
</style>

