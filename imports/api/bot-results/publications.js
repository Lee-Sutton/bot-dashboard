import {Meteor} from 'meteor/meteor';
import {BotResult} from '/imports/api/bot-results/bot-results.js';

if (Meteor.isServer) {
    Meteor.publish('botResults', function (botId) {
        if (this.userId)
            return BotResult.find({botId});

        this.ready();
    });

    Meteor.publish('botResultCount', function () {
        if (this.userId)
            return BotResult.find({userId: this.userId}, {fields: {_id: 1, botId: 1}});

        this.ready();
    });
}
