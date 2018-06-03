import { Meteor } from 'meteor/meteor';
import './add-bot.html';

Template.addBot.events({
    'submit #add-bot-form'(event, instance) {
        event.preventDefault();
        let target = event.target,
            bot = {
                name: target['bot-name'].value,
                subreddit: target['bot-subreddit'].value,
                keyword: target['bot-keyword'].value,
                minimumScore: target['bot-score'].value,
                description: target['bot-description'].value
            };
        Meteor.call('bots.insert', bot);
        Modal.hide(this);
    },
});
