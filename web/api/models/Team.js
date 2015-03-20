var Team = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    name    : { type: 'string' },
    team_id : { type: 'string', unique: true },
    users: { 
      collection: 'User', 
      via: 'teams',
      dominant: true
    },
  }
};

module.exports = Team;
