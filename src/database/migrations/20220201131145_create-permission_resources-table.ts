import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("permission_resources", (table) => {
    table.increments("id");
    table.string("name", 255).unique().notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("permission_resources");
}

