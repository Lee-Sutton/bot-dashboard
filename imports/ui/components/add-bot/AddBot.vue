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
                        <input type="number" class="form-control" v-model="minimumScore" name="bot-score" id="bot-score"/>
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
    import {Bot, insertBot, updateBot} from '/imports/api/bots/bots';
    import _ from 'lodash'

    export default {
        name: "addBot",
        props: ['bot'],
        data() {
            return this.bot || {
                name: '',
                subreddit: '',
                keyword: '',
                minimumScore: 0,
                description: ''
            }
        },
        methods: {
            submitBot() {
                let bot = _.pick(this, ['name', 'subreddit', 'keyword', 'minimumScore', 'description']);

                if (this._id) {
                    bot._id = this._id;
                    updateBot.call(bot);

                } else {
                    insertBot.call(new Bot(bot), (err) => {
                        if (err) {
                            this.$notify({
                                group: 'sAlert',
                                type: 'Danger',
                                title: 'Error adding bot',
                                text: err,
                            });
                        } else {
                            this.$notify({
                                group: 'sAlert',
                                title: 'Bot Added',
                                type: 'success',
                                text: 'Bot added successfully',
                            });
                        }

                        this.$router.push('/');
                    });
                }
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
