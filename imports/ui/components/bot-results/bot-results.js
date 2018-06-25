import {Meteor} from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './bot-results.html';

Template.botResults.events({
    runBot: function () {
        console.log('is this running?');
        let botId = FlowRouter.getParams('botId');
        console.log(botId);
        // Meteor.call('')
    }
});
