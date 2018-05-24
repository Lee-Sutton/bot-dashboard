// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Bots } from '/imports/api/bots/bots.js';

Meteor.publish('bots.all', function () {
    return Bots.find({});
});
