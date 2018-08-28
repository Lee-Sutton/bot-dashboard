
import { Mongo } from 'meteor/mongo';
import {BotResults} from '../bot-results/bot-results';

export const Bots = new Mongo.Collection('bots');

Bots.helpers({
    results() {
        return BotResults.find({botId: this._id});
    }
});
