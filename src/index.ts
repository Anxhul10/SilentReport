import { Client } from 'cyborgdb';
import 'dotenv/config'

const client = new Client('http://localhost:8000', process.env.CYBORGDB_API_KEY)
