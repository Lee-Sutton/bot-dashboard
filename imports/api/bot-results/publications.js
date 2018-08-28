import { Meteor } from 'meteor/meteor';
import { BotResults } from '/imports/api/bot-results/bot-results.js';

// FIXME replace this with publication count
Meteor.publish('botResults.all', function () {
    if (!this.userId) this.ready();
    return BotResults.find({});
});

Meteor.publish('botResults', function (botId) {
    if (!this.userId) this.ready();
    return BotResults.find({botId});
});

