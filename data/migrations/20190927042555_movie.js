exports.up = function(knex) {
    return knex.schema.createTable("movies", tbl => {
        tbl.increments()
  
        tbl.string("title", 128)
          .notNullable()
  
          tbl.string("director", 128)
          .notNullable()
  
          tbl.integer("metascore", 128)
          .notNullable()
  
    })
    .createTable("stars", tbl => {
        tbl.increments()

        tbl.string('name', 128)
        .notNullable()
        .unique()
    })
    .createTable('movie_stars', tbl => {
        tbl.integer('movie_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('movies')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
        
        tbl.integer('star_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('stars')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')

        tbl.primary('movie_id', 'star_id')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('movie_stars')
    return knex.schema.dropTableIfExists('stars')
    return knex.schema.dropTableIfExists('movies')
  };
