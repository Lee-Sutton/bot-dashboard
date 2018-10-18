
import App from '/imports/ui/components/bot-list/BotList';
import AddBot from '/imports/ui/components/add-bot/AddBot';
import ViewBotResults from '/imports/ui/components/view-bot-results/ViewBotResults';
import NotFound from '/imports/ui/NotFound.vue';
import VueRouter from "vue-router";
import Vue from 'vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: App,
    },
    {
        path: '/add',
        name: 'add',
        component: AddBot,
        props: true,
    },
    {
        path: '/results/:id',
        name: 'results',
        component: ViewBotResults,
        props: true
    },
    {
        path: '*',
        component: NotFound,
    }
];

export const router = new VueRouter({
    mode: 'history',
    routes,
});


