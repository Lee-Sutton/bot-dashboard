import {Meteor} from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './bot-results.html';

Template.botResults.events({
    'click #run-bot': function () {
        let botId = FlowRouter.getParam('botId');
        Meteor.call('runBot', botId);
    }
});
