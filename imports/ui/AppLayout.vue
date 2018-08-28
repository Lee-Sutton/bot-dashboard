<template>
    <div id="app">
        <navbar></navbar>
        <router-view></router-view>
        <notifications group="notifcations" />
        <modal v-if="modalDisplayed"></modal>
    </div>
</template>

<script>
    import navbar from "/imports/ui/components/navbar/navbar.vue";
    import Modal from '/imports/ui/components/modal/Modal';
    export default {
        name: "AppLayout",
        components: {
            navbar,
            Modal
        },
        computed: {
            modalDisplayed () {
                return this.$store.state.modalDisplayed;
            }
        },
    }
</script>

<style scoped>

</style>
