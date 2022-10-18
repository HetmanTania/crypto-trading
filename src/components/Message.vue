<template>
    <div class="notification is-danger">
        <button @click="close" class="delete"></button>
        <p>{{text}}</p>
    </div>
</template>

<script>
export default {
    props: ["text", "title"],
    methods: {
        close(){
           this.$store.commit("removeMessage");
        }
    },
}
</script>

<style>

</style>