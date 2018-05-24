import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Bots } from '/imports/api/bots/bots.js';

Meteor.methods({
    'bots.insert'(name, description) {
        if (!this.userId) {
            throw new Meteor.Error('User not logged in');
        }
        check(name, String);
        check(description, Match.OneOf(String, null));
        return Bots.insert({name, description, userId: this.userId});
    }
});
