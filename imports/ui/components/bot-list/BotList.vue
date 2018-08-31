<template>
    <div class="app">
        <div v-if="loggedIn" class="container">
            <router-link class="btn btn-primary" to="/add" data-cy="add-bot">Add Bot</router-link>
            <br>
            <table class="table table-hover" data-cy="bot-list">
                <thead>
                <tr>
                    <td></td>
                    <td>Name</td>
                    <td>Subreddit</td>
                    <td>Keywords</td>
                    <td>Min Score</td>
                </tr>
                </thead>
                <tbody v-for="bot in bots">
                <tr>
                    <th scope="row">
                    </th>
                    <td>
                        <router-link :to="{name: 'results', params: {id: bot._id}}">{{bot.name}}</router-link>
                    </td>
                    <td>{{bot.subreddit}}</td>
                    <td>{{bot.keyword}}</td>
                    <td>{{bot.minimumScore}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <welcome></welcome>
        </div>
    </div>
</template>

<script>
    import {Bots} from '/imports/api/bots/bots';
    import Welcome from '/imports/ui/components/welcome/Welcome.vue'
    import {Meteor} from 'meteor/meteor';

    export default {
        components: {
            Welcome
        },
        methods: {
            botResults(id) {
                this.$router.push(`/results/${id}`);
            }
        },
        meteor: {
            $subscribe: {
                'bots.all': []
            },
            bots() {
                return Bots.find({});
            },
            loggedIn() {
                return !!Meteor.user();
            }
        },
    }
</script>

<style>
    body {
        margin: 30px;
    }
    a {
        color: #40b883;
        text-decoration: none;
    }
    h1, h2 {
        font-weight: normal;
    }
</style>
