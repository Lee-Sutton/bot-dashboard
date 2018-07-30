import {RedditScraper} from '/imports/api/bots-results/reddit-scraper.js';
import {expect} from 'chai';
import sinon from 'sinon';

describe('#RedditScraper', function() {
    beforeEach(function() {});

    it('should scrape reddit (e2e test)', function() {
        const redditScraper = new RedditScraper();
        const callback = (posts) => {
            posts.forEach((post) => {
                if (post.title.toLowerCase().includes('fresh') && post.score > 100)
                    console.log(post);
            });
        };
        redditScraper.run({callback, subreddit: 'hiphopheads'});
    });
});
