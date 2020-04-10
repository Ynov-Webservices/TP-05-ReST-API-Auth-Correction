const insertedUser = db.users.insertOne({
  email: 'soapmctravich@gmail.com',
  password: '$2y$10$vBB7EqVJq27FrzedFrVyMO/HQufm4cOc53I.wO/iM/tHAjeumIEdO',
});

db.applications.insertOne({
  apiKey: '04XWXqJ9NzESl5e3cY1JmiWqY37eEH3q',
  clientId: 'dummy-client-id',
  clientSecret: 'dummy-client-secret',
  grants: ['client_credentials'],
  redirectUris: [''],
  user: insertedUser.insertedId
});