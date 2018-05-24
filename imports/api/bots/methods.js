import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Bots } from '/imports/api/bots/bots.js';

Meteor.methods({
    'bots.insert'(name, description) {
        check(name, String);
        check(description, Match.OneOf(String, null));
        return Bots.insert({name, description});
    }
});
