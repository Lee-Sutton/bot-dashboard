<template>
    <b-navbar toggleable="md" type="dark" variant="info">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <router-link class="navbar-brand" to="/">Reddit Bots</router-link>

        <Login/>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav class="ml-auto">

                <b-nav-form v-if="loggedIn">
                    <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>


            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</template>

<script>
    import {Meteor} from 'meteor/meteor';
    import Login from "../user-accounts/Login";

    export default {
        name: "navbar",
        components: {Login},
        meteor: {
            loggedIn() {
                return !!Meteor.user();
            }
        }
    }
</script>

