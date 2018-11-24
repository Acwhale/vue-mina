<template>
    <div class="essay-container">
        <img class="essay-img" :src="img" alt="">
        <img class="essay-tag" :src="essaySrc" alt="">
        <div class="essay-content">{{content}}</div>
    </div>
</template>

<script>
import essaySrc from './images/essay@tag.png'
export default {
    name:"CmpEssay",
    props:{
        img:String,
        content:String
    },
    data(){
        return{
            essaySrc
        }
    },
}
</script>

<style>

</style>
