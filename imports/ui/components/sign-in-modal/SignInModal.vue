<template>
    <modal>
        <template slot="modal-header">
            <h1>Page Header</h1>
        </template>
        <template slot="modal-body">
            <p>Content would go here</p>
        </template>
    </modal>
</template>

<script>
    import Modal from '/imports/ui/components/modal/Modal';

    export default {
        name: "SignInModal",
        components: {
            Modal
        }
    }
</script>

<style scoped>

</style>
