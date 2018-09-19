<template>
    <div>
        <div v-if="loggedIn">
            <b-nav-item-dropdown id="login-sign-in-link" v-bind:text="userState">
                <b-dropdown-item @click="logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
        </div>
        <div v-else>
            <b-nav-item v-b-modal.loginModal id="login-sign-in-link">{{userState}}</b-nav-item>
        </div>
        <b-modal id="loginModal" ref="loginModalRef" title="Login" @ok="handleOk">
            <div class="d-block">
                <b-form @submit="handleSubmit">
                    <b-form-group
                            label="Email"
                            label-for="email">
                        <b-form-input required id="email" v-model.trim="email"></b-form-input>
                    </b-form-group>
                    <b-form-group
                            label="Password"
                            label-for="password">
                        <b-form-input required type="password" id="password" v-model.trim="password"></b-form-input>
                    </b-form-group>
                </b-form>
            </div>
        </b-modal>
    </div>
</template>
<script>
    import {User} from '/imports/api/users/users.js';

    export default {
        name: 'UserAccount',
        data () {
            return {
                email: '',
                password: ''
            }
        },
        meteor: {
            userState () {
                if (Meteor.user()) {
                    let currentUser = Meteor.user();
                    return User.findOne(currentUser).primaryEmail();
                }
                return 'Login';
            },
            loggedIn () {
                return !!Meteor.user();
            }
        },
        methods: {
            handleOk (event) {
                event.preventDefault();
                this.handleSubmit();
            },
            logout () {
                Meteor.logout();
            },
            handleSubmit () {
                Meteor.loginWithPassword(this.email, this.password, (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        this.$refs.loginModalRef.hide();
                    }
                });
            }
        }
    }
</script>