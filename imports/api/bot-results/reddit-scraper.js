import snoowrap from 'snoowrap';

const DEFAULT_SNOO = new snoowrap({
    clientId: '1N5T8Noo3BgQrA',
    clientSecret: 'V_vLG2NLfe4jdiGvaZ6zWh9BHDI',
    password: 'ilovekeela',
    username: 'hip_hop_bot',
    userAgent: 'HipHopBot 0.1',
});

export class RedditScraper {
    constructor(snoo = DEFAULT_SNOO) {
        this.snoo = snoo;
    }
    run(subreddit, callback) {
        this.snoo
            .getSubreddit(subreddit)
            .getHot()
            .map((post) => {
                return {
                    title: post.title,
                    score: post.score,
                    url: post.url
                };
            }).then(callback);
    }
}
