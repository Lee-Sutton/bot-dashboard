import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '/imports/ui/components/bot-list/bot-list.js';
import '/imports/ui/components/add-bot/add-bot.js';
import '../../ui/components/bot-results/bot-results.js';
import '/imports/ui/components/navbar/navbar.js';
import '../../ui/pages/not-found/not-found.js';

FlowRouter.route('/', {
    name: 'Home',
    action: () => {
        BlazeLayout.render('App_body', {body: 'botList'});
    }
});

FlowRouter.route('/results/:botId', {
    name: 'botResults',
    action: () => {
        console.log('This is rendered');
        BlazeLayout.render('App_body', {body: 'botResults'});
    }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
