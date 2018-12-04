<template>
    <div class="container ext-content">
        <div class="head" v-if="book">
            <img :src="book.image" alt="">
            <span class="title">{{book.title}}</span>
            <span class="author">{{book.author[0]}}</span>
        </div>
        <div class="sub-container">
            <span class="headline">短评</span>
            <div class="comments-container  ">
                <div v-for="(item,index) of comments.comments" :key="index">
                    <cmp-tag class="ex-tag" :text="item.content"> 
                    <span class="num" slot="after">{{"+" +item.nums}}</span>
                    </cmp-tag>
                </div>
            </div>
        </div>
        <div class="sub-container" v-if="book">
            <span class="headline">内容简介</span>
            <p class="content"  v-html="bookSummary"></p>
        </div>
        <div class="sub-container">
            <span class="headline">书本信息</span>
            <div class="detail-contaner">
            <div class="vertical">
                <div class="description">出版社</div>
                <div class="description">出版年</div>
                <div class="description">页数</div>
                <div class="description">定价</div>
                <div class="description">装帧</div>
            </div>
            <div class="vertical" v-if="book">
                <div class="">{{book.publisher}}</div>
                <div class="">{{book.pubdate}}</div>
                <div class="">{{book.pages}}</div>
                <div class="">{{book.price}}</div>
                <div class="">{{book.binding}}</div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import CmpTag from '@/components/tag/tag'

import BookModel from '@/model/book.js'
const bookModel = new BookModel()

export default {
    name:'BookDetail',
    components:{
        CmpTag
    },
    data() {
        return {
            comments:[],
            book:null,
            likeStatus:false,
            likeCount:0,
            text:"123",
        }
    },
    methods:{
        /**
        * 获取书籍详细信息
        */
        getBookDeatail(id){
            bookModel.getBookDeatail(id).then((res)=>{
                if(res.status ==200 &&　res.statusText == "OK"){
                    res = res.data
                    this.book = res
                }
            })
        },
        /**
         * 获取书籍的短评
         */
        getBookComments(id){
            bookModel.getBookComments(id).then((res)=>{
                if(res.status ==200 &&　res.statusText == "OK"){
                    res = res.data
                    this.comments = res
                }
            })
        }

    },
    computed:{
        bookSummary:function(){
            if(!this.book.summary) {
                return  ''
            }
            let reg = new RegExp('\\\\n','g')
            let text = this.book.summary.replace(reg,'<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
            return text
        }
    },
    mounted() {
        let id = this.$route.params.id
        this.getBookDeatail(id)
        this.getBookComments(id)
    }
}
</script>
<style lang='stylus' scoped>
    .container{
        background-color #f5f5f5
        width 100%
    }
    .head{
        background-color #ffffff
        padding-top .4rem
        padding-bottom .4rem
        display flex
        flex-direction column
        align-items center
    }
    .head img{
       width 2rem
       height 3rem
       box-shadow .1rem .1rem .1rem #e3e3e3
    }
    .title{
        color #2f2f2f
        margin-top .2rem
        font-size .4rem
        font-weight 600
    }
    .author{
        margin-top .1rem
        font-size .3rem
        color #999
    }
    .sub-container{
        width 6.9rem
        display flex
        flex-direction column
        align-items center
        margin-top .3rem
        background-color #ffffff
        padding .3rem
    }
    .headline{
        font-size .3rem
        font-font-weight 600
        color #2f2f2f
        margin-bottom .2rem
    }
    .comments-container{
        display inline-flex
        flex-direction row
        align-items  flex-start
        width 100%
        flex-wrap wrap
        padding  0 .3rem
    }
    .num{
        margin-left .1rem
        font-size .22rem
        color #aaa
    }
    .ex-tag{
        background-color #fffbdd !important
    }
    .ext-content{
        margin-bottom 1rem
    }
    .content{
        line-height .4rem
        letter-spacing .01rem
        font-size .28rem
        text-indent .6rem
        color #000
        font-weight 500
    }
    .detail-contaner{
        width 100%
        display flex
        flex-direction row
        justify-content flex-start
        margin-top .5rem
        font-size .28rem
        color #666
    }
    .vertical {
        display flex
        flex-direction column
    }
    .description{
        color #999
        margin-right .3rem
    }

</style>

