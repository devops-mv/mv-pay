import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("role_permissions", (table) => {
    table.increments("id");
    table.string("permission_id").notNullable();
    table.integer("role_id").unsigned().notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());

    table.foreign("permission_id").references("id").inTable("permissions");
    table.foreign("role_id").references("id").inTable("roles");
    table.unique(["permission_id", "role_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("role_permissions");
}