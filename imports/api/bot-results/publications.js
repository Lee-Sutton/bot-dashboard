import { Meteor } from 'meteor/meteor';
import { BotResults } from '/imports/api/bot-results/bot-results.js';

Meteor.publish('botResults', function (botId) {
    if (!this.userId) this.ready();
    return BotResults.find({botId});
});
