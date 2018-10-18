import {Meteor} from 'meteor/meteor';
import {RedditScraper} from './reddit-scraper.js';
import {BotResult} from './bot-results.js';
import {Bots} from '../bots/bots.js';

export const scrapeReddit = (bot, scraper = new RedditScraper()) => {

    const postProcessor = Meteor.bindEnvironment((posts) => {
        posts.forEach((post) => {
            if (post.title && post.title.includes(bot.keyword) && post.score > bot.minimumScore) {
                BotResult.insert({
                    botId: bot._id,
                    title: post.title,
                    score: post.score,
                    url: post.url,
                    date: new Date(),
                    userId: Meteor.user()._id,
                });
            }
        });
    });

    scraper.run(bot.subreddit, postProcessor);
};

Meteor.methods({
    runBot (botId) {
        const bot = Bots.findOne({_id: botId});
        scrapeReddit(bot);
    },
});
