import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Ensure SSL for NeonDB
  },
});

pool.connect()
  .then(() => console.log('Connected to NeonDB successfully'))
  .catch((err) => console.error('Connection to NeonDB failed:', err.stack));

export default pool;
