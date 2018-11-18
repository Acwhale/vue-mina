<template>
    <div class="container">
        <div class='episode-container'>
            <div class="plain">No.</div>
            <div class="index">{{episodeIndex}}</div>
            <div class="line"></div>
        </div>
        <div class="date-container">
            <div class="month">{{month}}</div>
            <div class="year">{{year}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"CmpEpisode",
    props:{
        index:{
            type:Number
        }
    },
    data(){
        return {
          months : [
            '一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月',
            '十二月'
            ],
        }
    },
    computed:{
        episodeIndex:function(){
            return this.index < 10 ? '0'+this.index : this.index
        },
        year:function(){
            return new Date().getFullYear()
        },
        month:function(){
            return this.months[new Date().getMonth()]
        }
    }
}
</script>

<style lang="stylus" scoped>
    .container{
        display inline-flex
        flex-direction row
        line-height .3rem
    }
        
    .episode-container{
        display flex
        flex-direction  row
        align-items baseline
    }
    .plain{
        font-size .32rem
    }
                    
    .index{
         font-size .48rem
         font-weight 600
         margin-left .07rem
    }
    .line{
       margin-left .1rem
       margin-right .1rem
       height .45rem
       border-left .01rem solid black 
    }
    .date-container{
        display flex
        flex-direction column
        justify-content center
    }
    .month, .yaer{
       font-size .2rem
       line-height .2rem
       margin-right .1rem
    }
    
                   
</style>
