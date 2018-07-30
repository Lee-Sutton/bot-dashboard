import {Meteor} from 'meteor/meteor';
import {RedditScraper} from './reddit-scraper.js';
import {BotResults} from './bot-results.js';
import {Bots} from '../bots/bots.js';

export const scrapeReddit = (bot, scraper = new RedditScraper()) => {
    scraper.run(bot.subreddit, (posts) => {
        posts.forEach((post) => {
            if (post.title.toLowerCase.contains(bot.keyword) && post.score > bot.minimumScore) {
                BotResults.insert({
                    title: post.title,
                    score: post.score,
                    url: post.url,
                    createdAt: new Date(),
                });
            }
        });
    });
};

Meteor.methods({
    runBot (botId) {
        const bot = Bots.findOne({_id: botId});
        scrapeReddit(bot);
    },
});
