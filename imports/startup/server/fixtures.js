// Fill the DB with example data on startup
//
//
// { "_id" : "P8uudqKmgqqc8wj2o", "createdAt" : ISODate("2018-05-20T20:36:15.680Z"), "services" : { "password" : { "bcrypt" : "$2b$10$Ru8
// kQjC6pnCK1VCq0up7Ged8FOwcn8xEfBXDbc4aATYeXTOvaOPA6" }, "resume" : { "loginTokens" : [ { "when" : ISODate("2018-05-20T20:36:15.688Z"),
// "hashedToken" : "holLpX3jiPzNMxK7c5VPizzUPS71ti3g1hWNW9iZk4U=" }, { "when" : ISODate("2018-05-24T01:08:53.794Z"), "hashedToken" : "CMm
// PbdriiUr4bK8C2+1Wjhm808E5p9Iw6RWckGubEUg=" }, { "when" : ISODate("2018-05-24T01:50:12.538Z"), "hashedToken" : "A+LLiVWZrxDkwvPQYR+Fd5S
// j+9BZr7QHO0S3AlmNnkY=" } ] } }, "emails" : [ { "address" : "leesutton1@gmail.com", "verified" : false } ] }

import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // if the users collection is empty
  if (Meteor.users.find().count() === 0) {
    const data = [
      {
        title: 'Do the Tutorial',
        url: 'https://www.meteor.com/try',
        createdAt: new Date(),
      },
      {
        title: 'Follow the Guide',
        url: 'http://guide.meteor.com',
        createdAt: new Date(),
      },
      {
        title: 'Read the Docs',
        url: 'https://docs.meteor.com',
        createdAt: new Date(),
      },
      {
        title: 'Discussions',
        url: 'https://forums.meteor.com',
        createdAt: new Date(),
      },
    ];

    data.forEach(link => Links.insert(link));
  }
});
