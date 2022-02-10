import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("permissions", (table) => {
    table.string("id").primary();
    table.string("name", 255).notNullable();
    table.integer("permission_resource_id").unsigned().notNullable();
    table.foreign("permission_resource_id").references("id").inTable("permission_resources");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("permissions");
}

