// Import server startup through a single index entry point

import './fixtures.js';
import './register-api.js';


Meteor.startup(function () {
    let sendgridUser = Meteor.settings.private.sendgrid.username,
        sendgridPassword = Meteor.settings.private.sendgrid.password;
    process.env.MAIL_URL = `smtp://${sendgridUser}:${sendgridPassword}@smtp.sendgrid.net:587`;
});

