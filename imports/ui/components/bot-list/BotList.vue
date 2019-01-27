<template>
    <div class="app">
        <div v-if="loggedIn" class="container">
            <div class="mb-4">
                <router-link class="btn btn-primary" to="/add" data-cy="add-bot">Add Bot</router-link>
            </div>
            <table class="table table-hover" data-cy="bot-list">
                <thead>
                <tr>
                    <td></td>
                    <td>Name</td>
                    <td>Subreddit</td>
                    <td>Keywords</td>
                    <td>Min Score</td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody v-for="(bot, index) in bots">
                <tr>
                    <th scope="row">
                    </th>
                    <td>
                        <router-link :to="{name: 'results', params: {id: bot._id}}">{{bot.name}}</router-link>
                        <p><em>Hits: {{bot.results().count()}}</em></p>
                    </td>
                    <td>{{bot.subreddit}}</td>
                    <td>{{bot.keyword}}</td>
                    <td>{{bot.minimumScore}}</td>
                    <td>
                        <router-link :to="{name: 'add', params: {bot}}" class="btn btn-secondary">Edit</router-link>
                        <button class="btn btn-danger" :data-cy="'delete-bot' + index">Delete</button>
                    </td>
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
    import {Bot} from '/imports/api/bots/bots';
    import Welcome from '/imports/ui/components/welcome/Welcome.vue'
    import {Meteor} from 'meteor/meteor';

    export default {
        components: {
            Welcome
        },
        meteor: {
            $subscribe: {
                'bots.all': [],
                'botResultCount': [],
            },
            bots() {
                return Bot.find({});
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
