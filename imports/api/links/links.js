// Definition of the links collection

import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection('links');
export const linkQuery = Links.createQuery({
    title: 1,
    url: 1,
});

