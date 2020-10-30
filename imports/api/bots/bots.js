import {Mongo} from 'meteor/mongo';
import {Class} from 'meteor/jagi:astronomy';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {BotResult} from '../bot-results/bot-results';

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
    helpers: {
        results () {
            return BotResult.find({botId: this._id});
        }
    }
});

export const insertBot = new ValidatedMethod({
    name: 'insertBot',
    validate (bot) {},
    run(bot) {
        if (!Meteor.user()) {
            throw new Meteor.Error('user not logged in');
        }
        bot.userId = Meteor.user()._id;
        return bot.save();
    }
});

export const setNotification = new ValidatedMethod({
    name: 'setNotification',
    validate () {},
    run({bot, notification}) {
        if (!Meteor.user()) {
            throw new Meteor.Error('user not logged in');
        }
        bot.notification = notification;
        return bot.save();
    }
});

export const updateBot = new ValidatedMethod({
    name: 'updateBot',
    validate () {},
    run (bot) {
        if (!Meteor.user()) {
            throw new Meteor.Error('user not logged in');
        }

        return Bot.update({_id: bot._id}, {$set: bot});
    }
});

export const deleteBot = new ValidatedMethod({
    name: 'deleteBot',
    validate () {},
    run (bot) {
        Bot.remove({_id: bot._id});
    }
});
