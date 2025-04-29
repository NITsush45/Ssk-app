import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db',
  password: 'Sush@postgres24',
  port: 5432,
});

export default pool;
