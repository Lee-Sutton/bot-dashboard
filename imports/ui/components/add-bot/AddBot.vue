<template>
    <div class="container col-xs-6 col-xs-offset-3">
        <form @submit.prevent="handleSubmit" data-cy="add-bot">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" v-model="name" v-validate="'required'" name="name" class="form-control" placeholder="Name" :class="{ 'is-invalid': errors.has('name') }" />
                <div v-if="errors.has('name')" class="invalid-feedback">{{ errors.first('name') }}</div>
            </div>
            <div class="form-group">
                <label for="subreddit">Subreddit</label>
                <input type="text" id="subreddit" v-model="subreddit" v-validate="'required'" name="subreddit" placeholder="r/subreddit" class="form-control" :class="{ 'is-invalid': errors.has('subreddit') }" />
                <div v-if="errors.has('subreddit')" class="invalid-feedback">{{ errors.first('subreddit') }}</div>
            </div>
            <div class="form-group">
                <label for="keyword">Keyword</label>
                <input type="text" id="keyword" v-model="keyword" v-validate="'required'" name="keyword" placeholder="Keyword" class="form-control" :class="{ 'is-invalid': errors.has('keyword') }" />
                <div v-if="errors.has('keyword')" class="invalid-feedback">{{ errors.first('keyword') }}</div>
            </div>
            <div class="form-group">
                <label for="minimumScore">Minimum Score</label>
                <input id="minimumScore" type="number" v-model="minimumScore" v-validate="'required'" name="minimumScore" class="form-control" :class:vs="{ 'is-invalid': errors.has('minimumScore') }" />
                <div v-if="errors.has('minimumScore')" class="invalid-feedback">{{ errors.first('minimumScore') }}</div>
            </div>
            <div class="form-group">
                <label for="bot-description">Password</label>
                <textarea class="form-control" placeholder="Optional description..." v-model="description"
                          name="bot-description" id="bot-description" rows="3"></textarea>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" data-cy="add-bot-btn" @click.prevent="handleSubmit">Save</button>
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
            handleSubmit() {
                this.$validator.validate().then(result => {
                    if (!result) return;

                    let fields = ['name', 'subreddit', 'keyword', 'description'],
                        bot = _.pick(this, fields);
                    bot.minimumScore = parseInt(this.minimumScore);

                    if (this.bot && this.bot._id) {
                        bot._id = this.bot._id;
                        updateBot.call(bot, (err) => {
                            if (err) {
                                this.$notify({
                                    group: 'sAlert',
                                    type: 'Danger',
                                    title: 'Error updating bot',
                                    text: err,
                                });
                            } else {
                                this.$notify({
                                    group: 'sAlert',
                                    title: 'Bot updated',
                                    type: 'success',
                                    text: 'Bot updated successfully',
                                });
                            }
                        });

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
