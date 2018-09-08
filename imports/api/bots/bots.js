import {Mongo} from 'meteor/mongo';
import {Class} from 'meteor/jagi:astronomy';

export const Bots = new Mongo.Collection('bots');

export const Bot = Class.create({
    name: 'Bot',
    collection: Bots,
    fields: {
        name: String,
        keyword: String,
        minimumScore: Number,
        subreddit: String,
        description: String,
    }
});

