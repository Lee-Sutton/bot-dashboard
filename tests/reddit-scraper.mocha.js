import {RedditScraper} from '/imports/api/bots-results/reddit-scraper.js';
import {expect} from 'chai';
import sinon from 'sinon';

describe('#RedditScraper', function() {
    const getHot = () => {
        return [
            {
                title: 'FRESH',
                score: 100,
            },
            {
                title: 'FRESH',
                score: 200,
            },
            {
                title: 'invalid title',
                score: 200,
            },
        ];
    };

    const getSubreddit = sinon.stub().returns({getHot});

    beforeEach(function() {});

    it('should scrape reddit', function() {
        const callback = sinon.spy();
        const snoo = {getSubreddit},
            subreddit = 'hiphopheads',
            keyword = 'fresh',
            minimumScore = 100;
        const redditScraper = new RedditScraper({
            snoo,
            subreddit,
            minimumScore,
            keyword,
        });
        expect(redditScraper).to.be.ok;
        redditScraper.run(callback);

        sinon.assert.called(callback);
    });
});
