
// Import the router
import { RouterFactory, nativeScrollBehavior } from 'meteor/akryum:vue-router2'
import App from '/imports/ui/components/bot-list/BotList';
import AddBot from '/imports/ui/components/add-bot/AddBot';
import BotResults from '/imports/ui/components/bot-results/BotResults';

// Create router instance
export const routerFactory = new RouterFactory({
    mode: 'history',
    scrollBehavior: nativeScrollBehavior
});

// Not found
import NotFound from '/imports/ui/NotFound.vue';

RouterFactory.configure(router => {
    router.addRoute({
        path: '*',
        component: NotFound,
    });
}, -1);

RouterFactory.configure(factory => {
    // Simple routes
    factory.addRoutes([
        {
            path: '/',
            name: 'home',
            component: App,
        },
        {
            path: '/add',
            name: 'add',
            component: AddBot,
        },
        {
            path: '/results/:id',
            name: 'results',
            component: BotResults,
            props: true
        }
    ])
});
