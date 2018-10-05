<template>
    <div>
        <div v-if="loggedIn">
            <b-nav-item-dropdown id="login-sign-in-link" v-bind:text="userState">
                <b-dropdown-item id="logout" @click="logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
        </div>
        <div v-else>
            <b-nav-item v-b-modal.loginModal id="login-sign-in-link">{{userState}}</b-nav-item>
        </div>
        <b-modal id="loginModal" ref="loginModalRef" title="Login" @ok="handleOk">
            <div class="d-block">
                <div v-if="newUser">
                    <b-form ref="form" @submit.prevent="createUser">
                        <b-form-group
                                label="Email"
                                label-for="email">
                            <b-form-input required type="email" id="email" v-model.trim="email"></b-form-input>
                        </b-form-group>
                        <b-form-group
                                label="Password"
                                label-for="password">
                            <b-form-input required type="password" id="password" v-model.trim="password"></b-form-input>
                        </b-form-group>

                        <b-form-group
                                label="Confirm Password"
                                label-for="password">
                            <b-form-input required type="password" id="password-confirm"
                                          v-model.trim="passwordConfirm"></b-form-input>
                        </b-form-group>
                    </b-form>
                    <a href="#" @click.prevent="newUser = false">Existing users</a>
                </div>
                <div v-else>
                    <b-form ref="form" @submit="login">
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
                    <a href="#" @click.prevent="newUser = true">Create an account</a>
                </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
    import {User} from '/imports/api/users/users.js';
    import {Meteor} from 'meteor/meteor';
    import {Accounts} from 'meteor/accounts-base';

    export default {
        name: 'UserAccount',
        data() {
            return {
                email: '',
                password: '',
                passwordConfirm: '',
                newUser: false
            }
        },
        meteor: {
            userState() {
                if (Meteor.user()) {
                    let currentUser = Meteor.user();
                    return User.findOne(currentUser).primaryEmail();
                }
                return 'Login';
            },
            loggedIn() {
                return !!Meteor.user();
            }
        },
        methods: {
            handleOk(event) {
                event.preventDefault();
                if (this.newUser) {
                    this.createUser();
                } else {
                    this.login();
                }
            },
            createUser() {
                Accounts.createUser({email: this.email, password: this.password}, (err) => {
                    if (err) {
                        this.$notify({group: 'auth', text: err.reason, type: 'error'})
                    } else {
                        this.$refs.loginModalRef.hide();
                    }
                });
            },
            logout() {
                Meteor.logout();
            },
            login() {
                Meteor.loginWithPassword(this.email, this.password, (err) => {
                    if (err) {
                        this.$notify({group: 'auth', text: err.reason, type: 'error'})
                    } else {
                        this.$refs.loginModalRef.hide();
                    }
                });
            }
        }
    }
</script>