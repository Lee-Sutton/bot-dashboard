<template>
    <div id="app">
        <div class="mb-4">
            <navbar></navbar>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
        <notifications group="sAlert" position="bottom-left"/>
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
