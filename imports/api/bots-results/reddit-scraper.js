import snoowrap from 'snoowrap';

const DEFAULT_SNOO = new snoowrap({
    clientId: '1N5T8Noo3BgQrA',
    clientSecret: 'V_vLG2NLfe4jdiGvaZ6zWh9BHDI',
    password: 'LucyDog2009',
    username: 'hip_hop_bot',
    userAgent: 'HipHopBot 0.1',
});

export class RedditScraper {
    constructor({snoo = DEFAULT_SNOO, minimumScore, keyword, subreddit}) {
        this.snoo = snoo;
        this.minimumScore = minimumScore;
        this.subreddit = subreddit;
        this.keyword = keyword;
    }
    run(callback) {
        this.snoo
            .getSubreddit('hiphopheads')
            .getHot()
            .map((post) => {
                return post.score;
            })
            .then(callback);
    }
}
