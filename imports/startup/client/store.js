
import Vue from 'vue';

import Vuex from 'vuex'
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        modalDisplayed: false
    },
    mutations: {
        showModal (state) {
            state.modalDisplayed = true;
        },
        hideModal (state) {
            state.modalDisplayed = false;
        }
    }
});
