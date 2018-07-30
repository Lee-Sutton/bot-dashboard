import { Meteor } from 'meteor/meteor';
import { Bots } from '/imports/api/bots/bots.js';

Meteor.publish('bots.all', function () {
    if (this.userId)
        return Bots.find({userId: this.userId});
    this.ready();
});
