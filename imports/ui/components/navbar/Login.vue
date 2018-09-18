<template>
    <div>
        <b-navbar-nav>
            <b-nav-item v-b-modal.loginModal>Login</b-nav-item>
        </b-navbar-nav>

        <LoginModal/>
    </div>
</template>
<script>
    import LoginModal from "./LoginModal";

    export default {
        name: 'Login',
        components: {LoginModal}
    }
</script>
