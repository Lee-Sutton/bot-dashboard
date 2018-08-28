<template>
    <div id="app">
        <navbar></navbar>
        <router-view></router-view>
        <notifications group="notifcations" />
        <sign-in-modal v-if="modalDisplayed"></sign-in-modal>
    </div>
</template>

<script>
    import navbar from "/imports/ui/components/navbar/navbar.vue";
    import SignInModal from '/imports/ui/components/sign-in-modal/SignInModal';
    export default {
        name: "AppLayout",
        components: {
            navbar,
            SignInModal
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
