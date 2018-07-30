import './methods.js';
import {expect} from 'chai';
import {Meteor} from 'meteor/meteor';
import {scrapeReddit} from './methods.js';
import sinon from 'sinon';

describe('bot results methods tests', function() {
    describe('#scrapeReddit', function() {
        const runBot = Meteor.server.method_handlers['runBot'];

        it('scrapes reddit', function() {
            const scraper = {
                run: sinon.stub()
            };
            const bot = {
                _id: 'dummyBot',
                minimumScore: 100,
                subreddit: 'hiphopheads',
                keyword: 'fresh',
            };
            scrapeReddit(bot, scraper);
            sinon.assert.called(scraper.run);
        });
    });
});
