import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Bots } from '/imports/api/bots/bots.js';

Meteor.methods({
    // FIXME convert to a validated method
    'bots.insert'(bot) {
        if (!this.userId) {
            throw new Meteor.Error('User not logged in');
        }
        check(bot.name, String);
        check(bot.description, Match.OneOf(String, null));
        bot.userId = this.userId;
        return Bots.insert(bot);
    },
    addBotNotification () {

    }
});
