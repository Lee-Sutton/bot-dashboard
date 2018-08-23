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
                        <input type="text" class="form-control" name="bot-name" id="bot-name"/>
                    </div>

                    <div class="form-group">
                        <label for="bot-subreddit">Subreddit</label>
                        <input type="text" class="form-control" name="bot-subreddit" id="bot-subreddit"/>
                    </div>

                    <div class="form-group">
                        <label for="bot-keyword">Keyword</label>
                        <input type="text" class="form-control" name="bot-keyword" id="bot-keyword"/>
                    </div>

                    <div class="form-group">
                        <label for="bot-score">Minimum Score</label>
                        <input type="number" class="form-control" name="bot-score" id="bot-score"/>
                    </div>
                    <div class="form-group">
                        <label for="bot-description">Description</label>
                        <textarea class="form-control" placeholder="Optional description..." name="bot-description" id="bot-description" rows="3"></textarea>
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
    export default {
        name: "addBot",
        created () {
            console.log('this was created');
            // this.modalWidth = 1000;
        },
        methods: {
            submitBot(event) {
                let target = event.target,
                    bot = {
                        name: target['bot-name'].value,
                        subreddit: target['bot-subreddit'].value,
                        keyword: target['bot-keyword'].value,
                        minimumScore: target['bot-score'].value,
                        description: target['bot-description'].value
                    };
                Meteor.call('bots.insert', bot, (err, result) => {
                    if (err) {
                        console.log(err)
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
