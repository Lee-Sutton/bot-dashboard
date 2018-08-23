<template>
    <div class="app">
        <div class="container">
            <router-link class="btn btn-primary" to="/add">Add Bot</router-link>
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

    export default {
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
