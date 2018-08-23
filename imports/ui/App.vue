<template>
    <div class="app">
        <navbar></navbar>
        <!--<modals-container></modals-container>-->
        <!--<addBot></addBot>-->
        <div class="container">
            <router-link class="btn btn-primary" to="/add">Add Bot</router-link>
            <!--<a class="btn btn-primary" href="/add">Add Bot</a>-->
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
                        <!--<a href="{{botResults this}}"><b>{{name}}</b></a>-->
                        <p><em>{{bot.name}}</em></p>
                    </td>
                    <td>{{bot.subreddit}}</td>
                    <td>{{bot.keyword}}</td>
                    <td>{{bot.minimumScore}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import {Bots} from "/imports/api/bots/bots.js";
    import navbar from "/imports/ui/components/navbar/navbar.vue";
    import addBotModal from "/imports/ui/components/add-bot/AddBot.vue";

    export default {
        components: {
            navbar,
            addBotModal,
        },
        methods: {
            showAddBotModal() {
                this.$refs.addBotModal.open()
            }
        },
        meteor: {
            $subscribe: {
                'bots.all': []
            },
            bots() {
                let bots = Bots.find({});
                return bots;
            }
        }
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
