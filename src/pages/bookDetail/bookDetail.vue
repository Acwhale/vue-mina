<template>
    <div class="container ext-content">
        <div class="head" v-if="book">
            <img :src="book.image" alt="">
            <span class="title">{{book.title}}</span>
            <span class="author">{{book.author[0]}}</span>
        </div>
        <div class="sub-container">
            <span class="headline">短评</span>
            <span class="shadow" v-show="comments.comments == false">暂无短评</span>
            <div class="comments-container ">
                <div v-for="(item,index) of comments.comments" :key="index">
                    <cmp-tag class="ex" :text="item.content"> 
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

        <div class="post-container" v-if="!posting">
            <div @click="postFake" class="post-fake">
                <span>输入短评</span>
            </div>
            <div class="like-container">
                <cmp-like :count="likeCount" :like="likeStatus" class="cmplike" @status=handleStatus></cmp-like>
            </div>
        </div>
        <div class="posting-container" v-if="posting">
            <div class="post-header">
                <span v-if =" !(comments.comments == false)">仅可点击标签+1</span>
                <span v-else >暂无短评</span>
                <span class="cancel" @click="handleCancel">取消</span>
            </div>
            <div class="comments-container">
                   <div v-for="(item,index) of comments.comments" :key="index">
                    <cmp-tag class="ex-tag" :text="item.content"  @tag='handlePost'> 
                    <span class="num" slot="after">{{"+" +item.nums}}</span>
                    </cmp-tag>
                </div>
            </div>
            <input type="text" class="post"  placeholder="短评最多12个字" v-model="content" @click="handlePostInput">
        </div>
        <cmp-mask v-if="posting"></cmp-mask>
    </div>
</template>
<script>
import CmpTag from "@/components/tag/tag";
import CmpLike from "@/components/like/like"
import CmpMask from "@/components/mask/mask"
import { Toast, TreeSelect } from 'vant';

import LikeModel from"@/model/like.js";
const likeModel = new LikeModel();
import BookModel from "@/model/book.js"
const bookModel = new BookModel();

export default {
  name: "BookDetail",
  components: {
    CmpTag,
    CmpLike,
    CmpMask
  },
  data() {
    return {
      content:'',  
      comments: [],
      book: null,
      likeStatus: false,
      likeCount: 0,
      posting: false
    };
  },
  methods: {
     /**
     * 提交短评
     */
    handlePost(text){
        let id = this.$route.params.id
        this._addComment(id,text)
    },
    handlePostInput(){
        let content = this.content
        let id = this.$route.params.id
        if(content.length == 0){
            Toast('请输入内容')
            return
        }
        if(content.length > 12){
            Toast('短评12个字')
            return
        }
        this._addComment(id,content)



    },
    _addComment(id,text){
         bookModel.addComment(id,text).then((res)=>{
            if(res.status == 201 ){
                this.comments.comments.unshift({
                    content:text,
                    nums:1
                })
                Toast('+1')
                this.posting = false
            }
        })
    },
    //取消
    handleCancel(){
        this.posting = false
    },
    /**
     * 提交短评
     */
    postFake(){
        this.posting = true
    },
    /**
     * 获取书籍详细信息
     */
    getBookDeatail(id) {
      bookModel.getBookDeatail(id).then(res => {
        if (res.status == 200 && res.statusText == "OK") {
          res = res.data;
          this.book = res;
        }
      });
    },
    /**
     * 获取书籍的短评
     */
    getBookComments(id) {
      bookModel.getBookComments(id).then(res => {
        if (res.status == 200 && res.statusText == "OK") {
          res = res.data;
          this.comments = res;

        }
      });
    },
    /**
     * 获取书籍点赞信息
     */
    getLikeStatus(id){
        bookModel.getLikeStatus(id).then((res)=>{
            if(res.status == 200 && res.statusText == 'OK'){
                res = res.data
                this.likeCount = res.fav_nums
                this.likeStatus =  res.like_status == 0 ? false :true
            }
        })
    },
    /**
     * 监听like事件
     */
    handleStatus(like){
        likeModel.like(like,this.book.id,400).then((res)=>{
                console.log(res)
            })
    }
  },
  computed: {
    bookSummary: function() {
      if (!this.book.summary) {
        return ""
      }
      let reg = new RegExp("\\\\n", "g")
      let text = this.book.summary.replace(
        reg,
        "<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
      )
      return text
    }
  },
  mounted() {
    let id = this.$route.params.id
    this.getBookDeatail(id)
    this.getBookComments(id)
    this.getLikeStatus(id)
  }
};
</script>
<style lang='stylus' scoped>
    .container {
        background-color: #f5f5f5;
        width: 100%;
    }

    .head {
        background-color: #ffffff;
        padding-top: 0.4rem;
        padding-bottom: 0.4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .head img {
        width: 2rem;
        height: 3rem;
        box-shadow: 0.1rem 0.1rem 0.1rem #e3e3e3;
    }

    .title {
        color: #2f2f2f;
        margin-top: 0.2rem;
        font-size: 0.4rem;
        font-weight: 600;
    }

    .author {
        margin-top: 0.1rem;
        font-size: 0.3rem;
        color: #999;
    }

    .sub-container {
        width: 6.9rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 0.3rem;
        background-color: #ffffff;
        padding: 0.3rem;
    }

    .headline {
        font-size: 0.3rem;
        font-font-weight: 600;
        color: #2f2f2f;
        margin-bottom: 0.2rem;
    }

    .comments-container {
        display inline-flex
        flex-direction row
        align-items flex-start
        width 100%
        flex-wrap: wrap
        padding 0 0.3rem
    }

    .num {
        margin-left 0.1rem
        font-size 0.22rem
        color #aaa
    }

    .ex-tag {
        background-color #fffbdd !important
    }
    .ex{
        background-color #eefbff !important
    }

    .ext-content {
        margin-bottom:1.5rem
    }

    .content {
        line-height 0.4rem
        letter-spacing 0.01rem
        font-size 0.28rem
        text-indent 0.6rem
        color #000
        font-weight 500
    }

    .detail-contaner {
        width 100%
        display flex
        flex-direction row
        justify-content: flex-start
        margin-top 0.5rem;
        font-size 0.28rem;
        color #666
    }

    .vertical {
        display flex
        flex-direction column
    }

    .description {
        color #999
        margin-right 0.3rem
    }
    .post-container{
        height 1rem
        box-box-shadow  .1rem -.1rem .1rem #e3e3e3
        position fixed
        width 6.9rem
        background-color #ffffff
        align-items center
        bottom .8rem
        display flex
        flex-direction row
        padding 0 .3rem
        justify-content space-between
    }
    .post-fake{
        display flex
        flex-direction row
        align-items center
        height .5rem
        width 4.6rem
        border-radius .1rem
        font-size .22rem
        padding-left .2rem
        border  .01rem solid #999
    }
    .like-container{
        display flex
        flex-direction row
        justify-content space-between
        align-items center
    }
    .cmplike{
        margin-right  1rem
        margin-top -.1rem
    }
    .posting-container{
        bottom 1rem
        position  fixed
        display flex
        flex-direction column
        align-items center
        background-color #ffffff
        width 100%
        z-index 999
    }
    .posting-container .comment-container {
        width 6.9rem
        padding 0 .3rem
    }
    .post-header{
        width 100%
        border-bottom .01rem solid #f5f5f5
        border-top .01rem solid #f5f5f5
        height 1rem
        display flex
        flex-direction row
        align-items center
        justify-content space-between
    }
    .post-header > span:first-child {
        font-size .28rem
        color #bbb
        padding-left .1rem
    }
    .cancel {
        padding-right .1rem
        color #666
    }
    .post{
        width 6.9rem
        margin .3rem auto 
        height .9rem
        background-color #f5f5f5
        border-radius .15rem
        padding-left .25rem
    }
    .shadow{
        color #999
    }
</style>

