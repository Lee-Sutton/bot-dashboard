import { Bots } from '/imports/api/bots/bots.js';

export const getBots = Bots.createQuery({
    name: 1,
    description: 1
});
