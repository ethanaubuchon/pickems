
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user', function(table) {
      table.uuid('id').unique().primary();
      table.string('email').unique();
      table.string('password');
      table.string('first_name');
      table.string('last_name');
      table.timestamps();
    }),

    knex.schema.createTable('team', function(table) {
      table.uuid('id').primary();
      table.string('city');
      table.string('name');
      table.string('short');
      table.timestamps();
    }),

    knex.schema.createTable('game', function(table) {
      table.uuid('id').primary();
      table.string('home_id')
        .references('id')
        .inTable('team');
      table.string('away_id')
        .references('id')
        .inTable('team');
      table.datetime('game_time');
      table.string('winner')
        .references('id')
        .inTable('team');
      table.timestamps();
    }),

    knex.schema.createTable('pick', function(table) {
      table.uuid('id').primary();
      table.string('user')
        .references('id')
        .inTable('user');
      table.string('game')
        .references('id')
        .inTable('game');
      table.string('team')
        .references('id')
        .inTable('team');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {

};
