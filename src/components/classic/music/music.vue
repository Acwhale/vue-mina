<template>
    <div class="music-container">
        <img :class=" playing ? 'music-img rotation ' : 'music-img' " :src="img" alt="">
        <img class="music-player" @click="handleMusicPlay" :src="!playing ? playSrc : pauseSrc" alt="">
        <img class="music-tag" :src="musicTag" alt="">
        <audio ref="music" :src="musicSrc"></audio>
        <div class="music-content" >{{content}}</div>
    </div>
</template>

<script>
import pauseSrc from './images/player@pause.png'
import playSrc  from './images/player@play.png'
import musicTag from './images/music@tag.png'
export default {
    name:"CmpMusic",
    props:{
        img: String,
        content: String,
        musicSrc: String
    },
    data(){
        return{
            playing:false,
            pauseSrc,
            playSrc,
            musicTag,
        }
    },
    methods:{
        handleMusicPlay(){
            this.playing = !this.playing
            let audio = this.$refs.music
            if(this.playing){
                let src = audio.src
                audio.src = src
                audio.play()
            }else{
                 audio.pause()
            }
            audio.addEventListener('ended',()=>{
                this.playing = false
            },false);
        }
       
    }
}
</script>

<style lang="stylus" scoped>
    .music-container{
        display flex
        flex-direction column
        align-items center
        width 100%
    }
    .music-img{
        width 4.22rem
        height 4.22rem
        margin-top .6rem
        border-radius 50%
    }
    .music-player{
        width 1.2rem
        height 1.2rem
        position relative
        bottom 2.7rem
    }
    .music-tag{
        width .44rem
        height 1.28rem
        position relative
        bottom 1.6rem
        right 3.1rem
    }
    @-webkit-keyframes rotation {
        from {
            -webkit-transform: rotate(0deg);
        }

        to {
            -webkit-transform: rotate(360deg);
        }
    }
    .rotation {
    -webkit-transform: rotate(360deg);
    animation: rotation 12s linear infinite;
    -moz-animation: rotation 12s linear infinite;
    -webkit-animation: rotation 12s linear infinite;
    -o-animation: rotation 12s linear infinite;
    }
</style>
