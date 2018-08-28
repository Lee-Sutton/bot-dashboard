<template>
    <nav class="navbar navbar-default">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="">Reddit Bots</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <form v-if="loggedIn" class="navbar-form navbar-left">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Search">
                    </div>
                    <button type="submit" class="btn btn-default">Submit</button>
                    <button class="btn btn-default" @click="openModal">Modal test</button>
                </form>
                <ul class="nav navbar-nav">
                    <li class="navbar-text" data-cy=""><blaze-template template="loginButtons" align="left"></blaze-template></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import {Meteor} from 'meteor/meteor';
    import SignInModal from '/imports/ui/components/sign-in-modal/SignInModal';

    export default {
        name: "navbar",
        components: {
            SignInModal
        },
        methods: {
            openModal () {
                this.$store.commit('showModal');
            }
        },
        meteor: {
            loggedIn() {
                return !!Meteor.user();
            }
        }
    }
</script>

<style scoped>

</style>
