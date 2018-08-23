
// Import the router
import { RouterFactory, nativeScrollBehavior } from 'meteor/akryum:vue-router2'
import App from '/imports/ui/components/bot-list/BotList';
import AddBot from '/imports/ui/components/add-bot/AddBot';

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
    ])
});
