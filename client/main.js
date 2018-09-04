// Libs
import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import {store} from '/imports/startup/client/store.js';
import { Accounts } from 'meteor/accounts-base'
import {router} from '/imports/startup/client/routes';
import AppLayout from '../imports/ui/AppLayout.vue';
import '/imports/startup/client/vue-plugins';

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL',
});

Meteor.startup(() => {
    new Vue({
        store,
        router,
        render: h => h(AppLayout),
    }).$mount('app');
});
