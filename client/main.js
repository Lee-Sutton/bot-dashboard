// Libs
import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import {store} from '/imports/startup/client/store.js';
import { Accounts } from 'meteor/accounts-base'
import {router} from '/imports/startup/client/routes';
import AppLayout from '../imports/ui/AppLayout.vue';

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL',
});

import VueTracker from 'vue-meteor-tracker';
Vue.use(VueTracker);

import VueMeta from 'vue-meta';
Vue.use(VueMeta);

Meteor.startup(() => {
    new Vue({
        store,
        router,
        render: h => h(AppLayout),
    }).$mount('app');
});
