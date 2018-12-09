<template>
    <div class="container">
        <img :src="book.image" alt="">
        <div class="description">
            <div class="title">{{book.title}}</div>
            <div class="author">{{bookAuthor}}</div>
            <div class="foot">
                <div class="footer" v-if="book.fav_nums">{{book.fav_nums}} 喜欢</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    name : "CmpBook",
    props:{
        book:Object
    },
    computed:{
        bookAuthor(){
            return Array.isArray(this.book.author) ? this.book.author[0] : this.book.author
        }
    }
}
</script>
<style lang="stylus" scoped>
    .container{
        margin-top .3rem
        display flex
        position relative
        box-shadow .1rem .1rem .1rem #e3e3e3
        flex-direction column
        width 2.4rem
        height 3.6rem
    }
    .container img{
        height 100%
        width 100%
        border-radius .2rem
    }
    .description{
        width 2.4rem
        position absolute
        bottom 0
        background-color #fff
        padding: .1rem .1rem .1rem .1rem 
        font-size: .24rem
        display: flex
        flex-direction: column
        border-bottom-right-radius: .1rem
        border-bottom-left-radius: .1rem
    }
    title{
        margin-top .1rem
        text-overflow  ellipsis
        overflow hidden
        white-space nowrap
    }
    .author{
        margin-top .1rem
        font-size .2rem
        color #999
        margin-bottom .1rem
        text-overflow  ellipsis
        overflow hidden
        white-space nowrap
    }
    .foot{
        font-size .1rem
        display flex
        flex-direction row
        justify-content flex-end
    }
    .footer{
        color #666
    }
</style>

