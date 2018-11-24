<template>
    <div>
        <img :src="img" alt="">
        <img :src="pauseSrc" alt="">
        <img class="music-tag" :src="musicTag" alt="">
        <div>{{content}}</div>
    </div>
</template>

<script>
import pauseSrc from './images/player@pause.png'
import playSrc  from './images/player@play.png'
import musicTag from './images/music@tag.png'
export default {
    name:"CmpMusic",
    props:{
        img:String,
        content:String
    },
    data(){
        return{
            pauseSrc,
            playSrc,
            musicTag
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
