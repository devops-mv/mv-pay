import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user_roles", (table) => {
    table.increments("id");
    table.integer("role_id").unsigned().notNullable();
    table.integer("user_id").unsigned().notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());

    table.foreign("role_id").references("id").inTable("roles");
    table.foreign("user_id").references("id").inTable("users");
    table.unique(["role_id", "user_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("user_roles");
}

