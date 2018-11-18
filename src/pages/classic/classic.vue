<template>
    <div>
        <div class="header">
            <cmp-episode class="episode" :index="index"></cmp-episode>
            <cmp-like class="like" :like="like" :count="count" @status='handleStatus'></cmp-like>
        </div>
        <cmp-movie :img="img" :content="content"></cmp-movie>
    </div>
</template>
<script>
import  ClassicModel  from '@/model/classic.js'
import LikeModel from '@/model/like.js'

import CmpLike from '@/components/like/like'
import CmpMovie from '@/components/classic/movie/movie'
import CmpEpisode from '@/components/episode/episode'

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
            index:0
        }
    },
    components:{
        CmpLike,
        CmpMovie,
        CmpEpisode
    },
    methods:{
        getLastet(){
            classModel.getLatest().then((res) =>{
                console.log(res.data)
                if(res.status == 200 && res.statusText == 'OK'){
                    this.count = res.data.fav_nums
                    this.like =  res.data.like_status == 0 ? false : true 
                    this.img = res.data.image
                    this.content = res.data.content
                    this.artID = res.data.id
                    this.category = res.data.type
                    this.index = res.data.index
                    // console.log(this.count)
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        /**
         * handelOnLike 处理用户点赞还是取消点赞
         */
        handleStatus:function(like){
            // console.log(this.artID)
            likeModel.like(like,this.artID,this.category).then((res)=>{
                console.log(res)
            })
        }
    },
    mounted(){
        this.getLastet()
    }
}
</script>
<style lang="stylus" scoped>
    .header{
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
    .like{
        margin-top .1rem
    }
</style>
