import { Meteor } from 'meteor/meteor';
import { Bot } from '/imports/api/bots/bots.js';

if (Meteor.isServer) {
    Meteor.publish('bots.all', function () {
        if (this.userId)
            return Bot.find({userId: this.userId});
        this.ready();
    });
}
