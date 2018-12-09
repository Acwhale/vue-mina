<template>
   <div>
        <div class="container">
            <div class="header">
                <cmp-episode class="episode" :index="index"></cmp-episode>
                <cmp-like  class="likes" :like="like" :count="count" @status='handleStatus'></cmp-like>
            </div>
            <cmp-movie v-if="category == 100" :img="img" :content="content" ></cmp-movie>
            <cmp-music v-if="category == 200" :img="img" :content="content" :musicSrc="musicSrc"></cmp-music>
            <cmp-essay v-if="category == 300" :img="img" :content="content"></cmp-essay>
            <cpm-navi @left="handleNext" @right="handlePervious" class="navi" :first="first" :latest="latest" :title="title"></cpm-navi>
        </div>
   </div>
</template>
<script>
import  ClassicModel  from '@/model/classic.js'
import LikeModel from '@/model/like.js'


import CmpLike from '@/components/like/like'
import CmpMovie from '@/components/classic/movie/movie'
import CmpEssay from '@/components/classic/essay/essay'
import CmpMusic from '@/components/classic/music/music'
import CmpEpisode from '@/components/episode/episode'
import CpmNavi from '@/components/navi/navi'

import { Toast } from 'vant';

let classModel = new ClassicModel()
let likeModel = new LikeModel()

export default {
    name:"Classic",
    data () {
        return {
            count:0,
            like:false,
            img:'',
            content:'',
            artID: 0 ,
            category: 0,
            index:0,
            latest:true,
            first:false,
            title:'',
            musicSrc: ''
        }
    },
    components:{
        CmpLike,
        CmpMovie,
        CmpEssay,
        CmpMusic,
        CmpEpisode,
        CpmNavi
    },
    methods:{
        getLastet(){
            classModel.getLatest().then((res) =>{
                // console.log(res.data)
                if(res.status == 200 && res.statusText == 'OK'){
                    this.count = res.data.fav_nums
                    this.like =  res.data.like_status == 0 ? false : true 
                    this.img = res.data.image
                    this.content = res.data.content
                    this.artID = res.data.id
                    this.category = res.data.type
                    this.index = res.data.index
                    this.title = res.data.title
                    this.setLatestIndex(this.index)
                   
                    // console.log(this.count)
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        /**
         * 设置最新一期的期刊
         */
        setLatestIndex(index){
            localStorage.setItem('latest',index)
        },
        /**
         * handelOnLike 处理用户点赞还是取消点赞
         */
        handleStatus:function(like){
            // console.log(this.artID)
            likeModel.like(like,this.artID,this.category).then((res)=>{
                console.log(res)
            })
        },
        /**
         * handleNext
         * 获取上一期
         */
        handleNext(){
            this._updateClassic('next')
        },
        /**
         * handlePervious
         * 获取下一期
         */
        handlePervious(){
           this._updateClassic('previous')
        },

        _updateClassic(nextOrPrevious){
            // TODO 做缓存
            // console.log(this.index)
            // let key = nextOrPrevious == 'next' ? this._getKey(this.index + 1) : this._getKey(this.index + 1)

            classModel.getClassic(this.index,nextOrPrevious).then(res=>{
                if(res.status == 200 && res.statusText == 'OK'){
                    if(res.data.type == 200){
                        this.musicSrc = res.data.url
                    }
                    this.count = res.data.fav_nums
                    this.like =  res.data.like_status == 0 ? false : true 
                    this.img = res.data.image
                    this.content = res.data.content
                    this.artID = res.data.id
                    this.category = res.data.type
                    this.index = res.data.index
                    this.title = res.data.title
                    this.latest = classModel.isLatest(this.index)
                    this.first = classModel.isFirst(this.index)
                    // console.log(this.count)
                }
            })
        },

        _getKey(index){
            return 'classic-' + index
        }
    },
    mounted(){
        this.getLastet()
    }
}
</script>
<style lang="stylus" scoped>
    .container{
        display flex
        flex-direction column
        align-items center
        width 100%
    }
    .header{
        width 100%
        margin-top .2rem
        margin-bottom .2rem
        display flex
        flex-direction row
        align-items center 
        justify-content space-between
        // border-bottom .01rem solid #f5f5f5
        // border-top .01rem solid #f5f5f5
    }
    .episode{
        margin-left .2rem
        margin-top .1rem
    }
    .likes{
        margin-top .1rem
    }
    .navi{
         position absolute
         bottom 1.4rem
    }
</style>
