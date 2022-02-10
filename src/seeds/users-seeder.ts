import { Knex } from "knex";
import { generatePassword } from '../helpers/password';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
          name: "Admin",
          username: "admin",
          password: generatePassword("password"),
        },
    ]);
};
