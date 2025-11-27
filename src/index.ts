import { Client } from 'cyborgdb';
import { config } from 'dotenv';

config();

const API = process.env.CYBORGDB_API_KEY;

const localClient = new Client({baseUrl: 'http://localhost:8000'});

