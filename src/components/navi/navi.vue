<template>
    <div class="navi-container">
        <img class="icon" :src="latest ? leftDis : left" alt="">
        <div class="title">{{title}}</div>
        <img class="icon" :src="first ? rightDis : right" alt="">
    </div>
</template>
<script>
import left from './images/triangle@left.png'
import right from './images/triangle@right.png'
import leftDis from './images/triangle.dis@left.png'
import rightDis from './images/triangle.dis@right.png'
export default {
    name:'CmpNavi', 
    data () {
        return {
            left,
            leftDis,
            right,
            rightDis
        }
    },
    props : {
        title:String,
        first:Boolean,
        latest:Boolean
    }
    
}
</script>

<style lang="stylus" scoped>
    .navi-container{
        width  6rem
        height .8rem
        background #f7f7f7
        border-radius .2rem
        display inline-flex
        flex-direction row
        justify-content space-between
        align-items center
    }
    .icon{
        height .8rem
        width .8rem
        
    }
    .title{
        font-size .28rem
    }
</style>
