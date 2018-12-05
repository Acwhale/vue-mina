<template>
    <div class="tag-container" @click="handleTag">
        <span >{{text}}</span>
        <slot name="after"></slot>
    </div>
</template>

<script>
export default {
    name : "CmpTag",
    props:{
        text:String
    },
    methods:{
       handleTag(){
           this.$emit('tag',this.text)
       } 
    }
}
</script>
<style lang='stylus' scoped>
    .tag-container{
        padding .1rem .1rem
        background-color #f5f5f5
        color #666
        border-radius .1rem
        display inline-flex
        flex-direction row
        align-items center
        justify-content center
        font-size .28rem
        margin-right .2rem
        margin-bottom .2rem
    }
        
</style>

