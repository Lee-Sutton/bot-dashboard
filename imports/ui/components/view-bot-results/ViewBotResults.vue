<template>
    <div class="container">
        <button id="run-bot" class="btn btn-primary" @click="runBot">Run Bot</button>
        <table v-if="results" class="table table-hover" data-cy="bot-list">
            <thead>
            <tr>
                <td></td>
                <td>Date</td>
                <td>Title</td>
                <td>Score</td>
                <td>url</td>
            </tr>
            </thead>
            <tbody v-for="result in results">
                <tr>
                    <th scope="row">
                    </th>
                    <td>{{result.date}}</td>
                    <td>{{result.title}}</td>
                    <td>{{result.score}}</td>
                    <td><a :href="result.url">{{result.url}}</a></td>
                </tr>
            </tbody>
        </table>
        <div v-else>
            <div class="row"></div>
            <div class="container col-xs-6 col-xs-offset-3 center text-center">
                <p><em>No data available</em></p>
            </div>
        </div>
    </div>
</template>

<script>
    import {Meteor} from 'meteor/meteor';
    import {BotResults} from '/imports/api/bot-results/bot-results.js';

    export default {
        name: "ViewBotResults",
        props: ['id'],
        created () {
            this.$subscribe('botResults', this.id);
        },
        methods: {
            runBot() {
                Meteor.call('runBot', this.id);
            }
        },
        meteor: {
            results () {
                let botResults = BotResults.find({botId: this.id});
                return botResults.count() ? botResults : false;
            },
        }
    }
</script>

<style scoped>

</style>
