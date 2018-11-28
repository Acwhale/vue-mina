<template>
    <div>
        <div v-for="(item,key) of books" :key="key" >
            <cmp-book v-if="item" :book = "item"></cmp-book>
        </div>
    </div>
</template>

<script>
import CmpBook from '@/components/book/book'

import BookModel from '@/model/book.js'

let bookModel = new BookModel()

export default {
    name : "Book",
    components:{
        CmpBook
    },
    data (){
        return {
            books : []
        }
    },
    methods : {
        getHotList(){
            bookModel.getHotList().then((res)=>{
                if(res.status == 200 &&　res.statusText == 'OK'){
                    this.books = res.data
                }
            })
        }
    },
    mounted(){
        this.getHotList()
    }
}
</script>
<style lang="stylus" scoped>

</style>

