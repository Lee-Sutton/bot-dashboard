<template>
    <div class="container col-xs-6 col-xs-offset-3">
        <form v-on:submit.prevent="submitBot" class="form-group" id="add-bot-form">
            <div class="" data-cy='add-bot'>
                <div class="">
                    <h4 class="modal-title">Add a bot</h4>
                </div>
                <div class="">
                    <div class="form-group">
                        <label for="bot-name">Name</label>
                        <input type="text" class="form-control" name="bot-name" v-model="name" id="bot-name"/>
                    </div>

                    <div class="form-group">
                        <label for="bot-subreddit">Subreddit</label>
                        <input type="text" class="form-control" name="bot-subreddit" v-model="subreddit" id="bot-subreddit"/>
                    </div>

                    <div class="form-group">
                        <label for="bot-keyword">Keyword</label>
                        <input type="text" class="form-control" name="bot-keyword" v-model="keyword" id="bot-keyword"/>
                    </div>

                    <div class="form-group">
                        <label for="bot-score">Minimum Score</label>
                        <input type="number" class="form-control" v-model="score" name="bot-score" id="bot-score"/>
                    </div>
                    <div class="form-group">
                        <label for="bot-description">Description</label>
                        <textarea class="form-control" placeholder="Optional description..." v-model="description" name="bot-description" id="bot-description" rows="3"></textarea>
                    </div>
                </div>

                <div class="">
                    <button data-cy="add-bot-btn" type="submit" class="btn btn-primary">Add</button>
                </div>
            </div>
        </form>

    </div>
</template>

<script>
    import {Meteor} from 'meteor/meteor';

    export default {
        name: "addBot",
        data() {
            return {
                name: '',
                subreddit: '',
                keyword: '',
                score: '',
                description: ''
            }
        },
        methods: {
            submitBot() {
                let bot = {
                        name: this.name,
                        subreddit: this.subreddit,
                        keyword: this.keyword,
                        minimumScore: this.score,
                        description: this.description
                    };
                Meteor.call('bots.insert', bot, (err) => {
                    if (err) {
                        this.$notify({
                            group: 'foo',
                            type: 'Danger',
                            title: 'Error adding bot',
                            text: err,
                        });
                    } else {
                        this.$notify({
                            group: 'foo',
                            title: 'Bot Added',
                            type: 'success',
                            text: 'Bot added successfully',
                        });
                    }

                    this.$router.push('/');
                });
            }
        },
    }
</script>

<style scoped>
    .form {
        max-height: 500px;
        overflow-y: auto;
    }
</style>
