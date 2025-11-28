// import { Client } from 'cyborgdb';
// import { config } from 'dotenv';
// config();

// const API: string = 'cyborg_7027b4e7ad9c4313b8a80d1ba93356a7' ;

// console.log(API);
// const localClient = new Client({baseUrl: 'http://localhost:8000', apiKey:API});
import { Client } from 'pg';
const client = new Client()
await client.connect()
 
const res = await client.query('SELECT $1::text as message', ['Hello world!'])
console.log(res.rows[0].message) // Hello world!
await client.end()