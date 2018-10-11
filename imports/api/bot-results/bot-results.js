
import {Mongo} from 'meteor/mongo';
import {Class} from 'meteor/jagi:astronomy';

export const BotResults = new Mongo.Collection('botResults');

export const BotResult = Class.create({
    name: 'BotResult',
    collection: BotResults,
    fields: {
        url: String,
        title: String,
        score: {type: Number, default: 0},
        userId: {type: String, default: null}
    }
});