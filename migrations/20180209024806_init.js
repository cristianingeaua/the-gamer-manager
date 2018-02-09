exports.up = function(knex, Promise) {
  knex.schema.raw('SET FOREIGN_KEY_CHECKS = 0').then(() => {
    Promise.all([
      knex.schema.createTable('User', (table) => {
        table.increments()
        table.string('email')
        table.string('password')
        table.dateTime('createdAt').defaultTo(knex.fn.now())
      }),
      knex.schema.createTable('Character', (table) => {
        table.increments()
        table.integer('str').unsigned()
        table.integer('con').unsigned()
        table.integer('dex').unsigned()
        table.integer('int').unsigned()
        table.integer('wis').unsigned()
        table.integer('cha').unsigned()
        table.integer('luk').unsigned()
        table.integer('User_id').unsigned()
        table.foreign('User_id').references('User.id')
        table.dateTime('createdAt').defaultTo(knex.fn.now())
      }),
    ])
  }).then(() => {
    knex.schema.raw('SET FOREIGN_KEY_CHECKS = 1')
  })
};

exports.down = function(knex, Promise) {
  knex.schema.raw('SET FOREIGN_KEY_CHECKS = 0').then(() => {
    Promise.all([
      knex.schema.dropTableIfExists('User'),
      knex.schema.dropTableIfExists('Character'),
    ])
  }).then(() => {
    knex.schema.raw('SET FOREIGN_KEY_CHECKS = 1')
  })
};
