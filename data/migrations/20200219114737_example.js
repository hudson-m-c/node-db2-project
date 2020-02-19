
exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
        // creates a primary key called id
        tbl.increments();
        // creates a text field called name which is both required and unique
        tbl.text('VIN').unique().notNullable();
        tbl.text('Make').notNullable();
        tbl.text('Model').notNullable();
        tbl.decimal('Mileage').notNullable();
        tbl.text('Transmission Type');
        tbl.text('Title Status');
      });
};

exports.down = function(knex) {
  // drops the entire table
  return knex.schema.dropTableIfExists('cars');
};
