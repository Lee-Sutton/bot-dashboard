<template>
    <div>
        <b-navbar-nav>
            <UserAccount/>
        </b-navbar-nav>

    </div>
</template>
<script>
    import UserAccount from "./UserAccount";

    export default {
        name: 'Login',
        components: {UserAccount}
    }
</script>
