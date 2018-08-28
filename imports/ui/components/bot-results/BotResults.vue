<template>
    <div class="container">
        <button id="run-bot" class="btn btn-primary" @click="runBot">Run Bot</button>
        <table class="table table-hover" data-cy="bot-list">
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
                <!--<tr>-->
                    <!--<th scope="row">-->
                    <!--</th>-->
                    <!--&lt;!&ndash;FIXME colspan&ndash;&gt;-->
                    <!--<td><em>No data available</em></td>-->
                <!--</tr>-->
            </tbody>
        </table>
    </div>
</template>

<script>
    import {Meteor} from 'meteor/meteor';
    import {BotResults} from '/imports/api/bot-results/bot-results.js';

    export default {
        name: "BotResults",
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
                return BotResults.find({botId: this.id});
            },
        }
    }
</script>

<style scoped>

</style>
