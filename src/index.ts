import { Client } from 'cyborgdb';
import { config } from 'dotenv';

config();
const client = new Client('http://localhost:8000', process.env.CYBORGDB_API_KEY.)
