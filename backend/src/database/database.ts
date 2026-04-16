import { Pool } from "pg";

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Pr_app',
    password: '12345',
    port: 5432,
});