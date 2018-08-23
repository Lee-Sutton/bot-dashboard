// Libs
import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import AppLayout from '/imports/ui/AppLayout';
import {store} from '/imports/startup/client/store.js';
import { Accounts } from 'meteor/accounts-base'
import {routerFactory} from '/imports/startup/client/routes';

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL',
});

import VModal from 'vue-js-modal';
Vue.use(VModal, { dialog: true });

// import Vuex from 'vuex'
// Vue.use(Vuex);

import VueTracker from 'vue-meteor-tracker';
Vue.use(VueTracker);

import VueMeta from 'vue-meta';
Vue.use(VueMeta);

const router = routerFactory.create();

Meteor.startup(() => {
    new Vue({
        store,
        router,
        render: h => h(AppLayout),
    }).$mount('app');
});
