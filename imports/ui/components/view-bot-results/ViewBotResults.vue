<template>
    <div class="container">
        <div class="mb-4">
            <button id="run-bot" class="btn btn-primary mb-2 mr-1" @click="runBot">Run Bot</button>
            <button id="notifications" class="btn btn-secondary mb-2 mr-1" data-cy="notifications" v-b-modal.notificationModal>Notifications</button>
        </div>
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
        <notification-modal></notification-modal>
    </div>
</template>

<script>
    import {Meteor} from 'meteor/meteor';
    import {BotResult} from '/imports/api/bot-results/bot-results.js';
    import NotificationModal from '../notification-modal/NotificationModal';

    export default {
        components: {
            NotificationModal
        },
        name: "ViewBotResults",
        props: ['id'],
        created () {
            this.$subscribe('botResults', this.id);
        },
        methods: {
            runBot() {
                Meteor.call('runBot', this.id);
            },
        },
        meteor: {
            results () {
                let botResults = BotResult.find({botId: this.id});
                return botResults.count() ? botResults : false;
            },
        }
    }
</script>

<style scoped>

</style>
