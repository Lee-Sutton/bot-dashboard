import {Mongo} from 'meteor/mongo';
import {Class} from 'meteor/jagi:astronomy';
import {ValidatedMethod} from 'meteor/mdg:validated-method';

export const Bots = new Mongo.Collection('bots');

export const Bot = Class.create({
    name: 'Bot',
    collection: Bots,
    fields: {
        name: String,
        keyword: String,
        subreddit: String,
        userId: {type: String, default: null},
        description: {type: String, default: ''},
        minimumScore: {type: Number, default: 0},
        notification: {
            type: Boolean,
            default: false,
        }
    },
});

export const insertBot = new ValidatedMethod({
    name: 'insertBot',
    validate (bot) {
        bot.validate();
    },
    run(bot) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('user not logged in');
        }
        bot.userId = Meteor.userId();
        return bot.save();
    }
});

export const setNotification = new ValidatedMethod({
    name: 'setNotification',
    validate () {},
    run({bot, notification}) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('user not logged in');
        }
        bot.notification = notification;
        return bot.save();
    }
});
