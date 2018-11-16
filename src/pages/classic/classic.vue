<template>
    <div>
        <cmp-like></cmp-like>
    </div>
</template>
<script>
import  ClassicModel  from '@/model/classic.js'
import CmpLike from '@/components/like/like'
let classModel = new ClassicModel()
export default {
    name:"Classic",
    components:{
        CmpLike
    },
    methods:{
        getLastet(){
            classModel.getLatest().then((res) =>{
                console.log(res)
            }).catch((error) => {
                console.log(error)
            })
        }
    },
    mounted(){
        this.getLastet()
    }
}
</script>
<style lang="stylus" scoped>

</style>
