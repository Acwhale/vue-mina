<template>
    <div>
        <cmp-search v-show="searching" @cancel="handleCancel"></cmp-search>
        <div class="container" v-show="!searching">
            <div class="header">
                <div class="box" @click="handleSearch">
                    <img :src="search" alt="">
                    <span>书籍搜索</span>
                </div>
            </div>
            <div class="sub-container">
                <img class="head-img" :src="quality" alt="">
                <div class="books-container" >
                    <div  v-for="(item,key) of books" :key="key" >
                        <router-link :to="{ name: 'BookDetail', params: { id: item.id }}">
                            <cmp-book  v-if="item" :book="item" ></cmp-book>
                        </router-link>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import search from '@/assets/images/icon/search.png'
import quality from '@/assets/images/book/quality.png'

import CmpBook from '@/components/book/book'
import CmpSearch from "@/components/search/search"


import BookModel from '@/model/book.js'

let bookModel = new BookModel()

export default {
    name : "Book",
    components:{
        CmpBook,
        CmpSearch
    },
    data (){
        return {
            books : [],
            search,
            quality,
            searching:false
        }
    },
    methods : {
        handleSearch(){
            this.searching = true
        },
        handleCancel(){
             this.searching = false
        },
        getHotList(){
            bookModel.getHotList().then((res)=>{
                if(res.status == 200 &&　res.statusText == 'OK'){
                    this.books = res.data
                }
            })
        }
    },
    mounted(){
        this.getHotList()
    }
}
</script>
<style lang="stylus" scoped>
    .container{
        position absolute
        right 0
        display flex
        flex-direction column
        align-items center
        width 100%
    }
    .header{
        // position fixed
        background-color #ffffff
        height 1rem
        width 100%
        // border-top .03rem solid #f5f5f5
        // border-bottom  .03rem solid #f5f5f5
        display flex
        flex-direction row
        align-items center
        justify-content center
        box-shadow:0 0 .1rem 0 #e3e3e3; 
        z-index 9
    }
    .box{
        display flex
        flex-direction row
        justify-content center
        align-items center
        border-radius .5rem
        background-color #f5f5f5
        height .6rem
        width 7rem
        color #999
    }
    .box img{
        margin-right .1rem
        width .4rem
        height .4rem
        margin-bottom -.04rem
    }
    .sub-container{
        width 100%
        display flex
        flex-direction column
        align-items center
        background-color #f5f5f5
        margin-top 1rem
        /* z-index:0;  */
    }
    .head-img{
       width 1rem
       height .4rem
       margin-top .4rem 
    }
    .books-container{
        margin-top .1rem
        display flex
        flex-direction row
        flex-wrap wrap
        padding 0 .9rem 0 .9rem
        justify-content space-around
        margin-bottom 1rem
    }
    .books-container cmp-book{
        margin-bottom .3rem
    }
</style>

