<template>
    <b-navbar toggleable="md" type="dark" variant="info">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#">Reddit Bots</b-navbar-brand>

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
<!--<template>-->
    <!--<nav class="navbar navbar-default">-->
        <!--<div class="container">-->
            <!--<div class="navbar-header">-->
                <!--<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">-->
                    <!--<span class="sr-only">Toggle navigation</span>-->
                    <!--<span class="icon-bar"></span>-->
                    <!--<span class="icon-bar"></span>-->
                    <!--<span class="icon-bar"></span>-->
                <!--</button>-->
                <!--<a class="navbar-brand" href="">Reddit Bots</a>-->
            <!--</div>-->

            <!--&lt;!&ndash; Collect the nav links, forms, and other content for toggling &ndash;&gt;-->
            <!--<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">-->
                <!--<form v-if="loggedIn" class="navbar-form navbar-left">-->
                    <!--<div class="form-group">-->
                        <!--<input type="text" class="form-control" placeholder="Search">-->
                    <!--</div>-->
                    <!--<button type="submit" class="btn btn-default">Submit</button>-->
                <!--</form>-->
                <!--<ul class="nav navbar-nav">-->
                    <!--<li class="navbar-text" data-cy=""><blaze-template template="loginButtons" align="left"></blaze-template></li>-->
                <!--</ul>-->
            <!--</div>-->
        <!--</div>-->
    <!--</nav>-->
<!--</template>-->

<script>
    import {Meteor} from 'meteor/meteor';
    import Login from "./Login";

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

