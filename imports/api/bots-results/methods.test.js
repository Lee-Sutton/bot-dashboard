import './methods.js';
import {expect} from 'chai';
import {Meteor} from 'meteor/meteor';

describe('bot results methods tests', function() {
    describe('#RedditScraper', function() {
        const runBot = Meteor.server.method_handlers['runBot'];
        it('stores results in the database', function() {

        });
    });
});
