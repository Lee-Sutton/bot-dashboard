import { Bots } from '/imports/api/bots/bots.js';
import './add-bot.html';

Template.addBot.events({
    'submit #add-bot'(event, instance) {
        event.preventDefault();
        let target = event.target;
        // TODO add meteor method
        Bots.insert({name: target['bot-name'].value});
    },
});
