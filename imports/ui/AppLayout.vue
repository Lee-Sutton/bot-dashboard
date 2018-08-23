<template>
    <div id="app">
        <navbar></navbar>
        <router-view></router-view>
    </div>
</template>

<script>
    import navbar from "/imports/ui/components/navbar/navbar.vue";
    export default {
        components: {
            navbar
        },
        name: "AppLayout"
    }
</script>

<style scoped>

</style>
