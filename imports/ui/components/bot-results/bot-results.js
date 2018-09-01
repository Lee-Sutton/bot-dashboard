import {Meteor} from 'meteor/meteor';
import {BotResults} from '/imports/api/bot-results/bot-results.js';
import './bot-results.html';
import moment from 'moment';

Template.botResults.onCreated(function () {
    Meteor.subscribe('botResults', FlowRouter.getParam('botId'));
});

Template.botResults.events({
    'click #run-bot': function () {
        let botId = FlowRouter.getParam('botId');
        Meteor.call('runBot', botId);
    }
});

Template.botResults.helpers({
    results: () => {
        const results = BotResults.find({botId: FlowRouter.getParam('botId')});
        return results;
    },
    moment: (date) => moment(date).format("MMM Do YY").toString(),
});
