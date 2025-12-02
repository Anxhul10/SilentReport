import 'dotenv/config'
import { listIdx } from './src/cyborgdb/listIdx.ts';

const api = process.env.CYBORGDB_API_KEY || 'no key';
await listIdx(api);