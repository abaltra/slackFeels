var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    name      : { type: 'string' },
    image     : { type: 'string' },
    role      : { type: 'string', enum: ['user', 'admin'], defaultsTo: 'user' },
    passports : { collection: 'Passport', via: 'user' },
    teams     : { 
      collection: 'Team', 
      via: 'users' 
    },
    notifications: {
      collection: 'Notification',
      via: 'users',
      dominant: true
    }
  },

  seedData:[
    {
      username: 'user@thetwobeards.com',
      email: 'user@thetwobeards.com',
      name: 'user',
      role: 'user',
      passports: [{
        protocol: 'local',
        password: 'p@ssw0rd'  // p@ssw0rd
      }]
    },
    {
      username: 'admin@thetwobeards.com',
      email: 'admin@thetwobeards.com',
      name: 'admin',
      role: 'admin',
      passports: [{
        protocol: 'local',
        password: 'B.F2(H6=mBsa3DZ' // B.F2(H6=mBsa3DZ
      }]
    }
  ]
};

module.exports = User;
