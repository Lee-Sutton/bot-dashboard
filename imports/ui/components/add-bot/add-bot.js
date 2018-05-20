import { Meteor } from 'meteor/meteor';
import './add-bot.html';

Template.addBot.events({
    'submit #add-bot'(event, instance) {
        event.preventDefault();
        let target = event.target,
            name = target['bot-name'].value,
            description = target['bot-description'].value;
        Meteor.call('bots.insert', name, description);
    },
});
