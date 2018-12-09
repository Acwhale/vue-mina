<template>
    <div>
        <div class="container">
            <div class="header">
                <div class="search-container">
                    <img class="icon" :src="search" alt="">
                    <input placeholder-class='in-bar' placeholder='书籍名' class='bar' 
                            auto-focus v-model="word" @click="handleHistory" />
                    <img @click="handleClose" class="cancel-img"  :src="cancel" alt="">
                </div>
                <div class="cancel" @click="handleCancel"> 取消</div>
            </div>
        </div>
        <div v-show="!searching">
            <div class="history">
                <div class="title">
                    <div class="chunk"></div>
                    <span>历史搜索</span>
                </div>
                <div class="tags">
                    <div v-for="(item,key) of history" :key="key"> 
                        <cmp-tag :text="item" @tag="handleTag"></cmp-tag>
                    </div>
                </div> 
            </div>
             <div class="history hot-search">
                <div class="title">
                    <div class="chunk"></div>
                    <span>热门搜索</span>
                </div>
                 <div class="tags">
                    <div v-for="(item,key) of hotKeyword" :key="key"> 
                        <cmp-tag :text="item" @tag="handleTag"></cmp-tag>
                    </div>
                </div> 
            </div>
        </div>
        <div class="books-container" v-show="searching">
            <div v-for="(item,index) of searchResult" :key="index">
                <cmp-book :book="item"></cmp-book>
            </div>
        </div>

    </div>
</template>
<script>
import search from './images/search.png'
import cancel from './images/cancel.png'

import CmpTag from "@/components/tag/tag"
import CmpBook from "@/components/book/book"

import { Toast, Tab } from 'vant'

import keywordModel from './keyword.js'
import BookModel from '@/model/book.js'
let bookModel = new BookModel()
let keyword = new keywordModel()
export default {
    name:"CmpSearch",
    components:{
        CmpTag,
        CmpBook
    },
    data(){
        return {
            search,
            cancel,
            word:'',
            history:[],
            hotKeyword:[],
            searchResult:[],
            searching:false,
            loading:false,
            total:0
        }
    },
    methods:{
        handleClose(){
            this.searching = false
            this.searchResult = []
            this.word = ''
        },
        handleCancel(){
            this.searching = false
            this.word = ''
            this.$emit('cancel')
            
        },
        handleHistory(){
            if(this.word.length == 0){
                Toast('请输入搜索的内容')
                return
            }
            this.getSearchByWord()   
        },
        handleTag(text){
            this.word = text
            this.getSearchByWord()
        },
        getHotKeyword(){
            keyword.getHot().then((res)=>{
                if(res.status == 200 && res.statusText == "OK"){
                    res = res.data
                    this.hotKeyword = res.hot
                }
            })
        },
        getSearchByWord(){
            this.searching = true
            bookModel.bookSearch(0,this.word).then(res=>{
                //历史搜索
                keyword.setHistory(this.word)
                if(res.status ==200 && res.statusText == "OK"){
                    res = res.data
                    if(res.total == 0 ){
                        Toast(`暂时没有${this.word}的内容`)
                        return
                    }
                    this.searchResult = res.books
                    this.total = res.total
                }
            })
        },
        handleScroll(){
            let scrollTop = document.documentElement.scrollTop
            let clientHeight = document.documentElement.clientHeight
            let scrollHeight = document.documentElement.scrollHeight
            
            if(scrollHeight - (scrollTop + clientHeight) == 0){
                if(!this.word){
                    return
                }
                if(this._isLocked()){
                    return
                }
                let length = this.searchResult.length
                if(length != this.total){
                    // this.loading = true
                    this._locked()
                    bookModel.bookSearch(length,this.word).then((res)=>{
                        if(res.status == 200 && res.statusText =="OK"){
                            res = res.data.books
                            this.searchResult = this.searchResult.concat(res)
                            // this.loading = false
                            this._unLocked()
                        }
                    },()=>{
                        this._unLocked()
                    })
                }
                
            }
                
        },
        _isLocked(){
            return this.loading ? true :false
        },
        _locked(){
            this.loading = true
        },
        _unLocked(){
            this.loading = false
        }
    },
    mounted(){
        this.history = keyword.getHistory()
        this.getHotKeyword()
    },
    activated(){
        window.addEventListener('scroll',this.handleScroll)
    },
    deactivated(){
        window.removeEventListener('scroll',this.handleScroll)
    }
}
</script>
<style lang="stylus" scoped>
    .books-container{
        fmargin-top .1rem
        display flex
        flex-direction row
        flex-wrap wrap
        padding 0 .9rem 0 .9rem
        justify-content space-around
        margin-bottom  1rem
    }
    .books-container cmo-book{
        margin-bottom .25rem
    }
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

