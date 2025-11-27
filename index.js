import { Client } from 'cyborgdb';

const client = new Client('http://localhost:8000', process.env.CYBORGDB_API_KEY)

const localClient = new Client('http://localhost:8000');