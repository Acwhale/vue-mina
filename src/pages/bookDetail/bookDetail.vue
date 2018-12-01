<template>
    <div>
        bookDetatil
    </div>
</template>
<script>
export default {
    name:'BookDetail',
    data() {
        return {
            id : 0 
        }
    },
    mounted() {
        this.id = this.$route.params.id
        console.log(this.id)
    }
}
</script>
<style lang='stylus' scoped>

</style>

