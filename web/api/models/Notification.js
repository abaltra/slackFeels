/**
* Notification.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/model
 *
 * type
 * :general
 * :buyer
 * :seller
*/

var Notification = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    name      : { type: 'string', unique: true },
    label     : { type: 'string' },
    type      : { type: 'string', enum: ['general', 'buyer', 'seller'] },

    users: {
      collection: 'user',
      via: 'notifications'
    }
  },

  seedData:[
    {
      name: 'general_daily_update',
      label: 'Daily Update',
      type: 'general'
    },
    {
      name: 'general_weekly_update',
      label: 'Weekly Update',
      type: 'general'
    },
    {
      name: 'general_news_events',
      label: 'News & Events',
      type: 'general'
    },
    {
      name: 'buyer_campaign_ends',
      label: 'When campaign ends',
      type: 'buyer'
    },
    {
      name: 'buyer_campaign_not_funded',
      label: 'When campaign not funded',
      type: 'buyer'
    },
    {
      name: 'seller_campaign_ends',
      label: 'When campaign ends',
      type: 'seller'
    },
    {
      name: 'seller_campaign_not_funded',
      label: 'When campaign not funded',
      type: 'seller'
    },
    {
      name: 'seller_daily_update',
      label: 'Daily Update (# raffles, # views, # likes)',
      type: 'seller'
    },
    {
      name: 'seller_weekly_update',
      label: 'Weekly Update (# raffles, # views, # likes)',
      type: 'seller'
    }
  ]
};

module.exports = Notification;
