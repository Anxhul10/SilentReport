# Demo Video ( along with installation )

https://github.com/user-attachments/assets/1327669f-088c-4a9a-aea4-3fd6f70f31b1

# SilentReport

**Encrypted Whistleblower System for Healthcare**

SilentReport is a secure whistleblower platform designed to protect highly sensitive healthcare disclosures.  
It ensures that sensitive data is cryptographically unreadable—even to database administrators—by using **CyborgDB** on top of **Supabase PostgreSQL**.

---

## Tech Stack

- **Node.js**: `v22.21.1`
- **Package Manager**: `npm`
- **Framework**: Next.js
- **Database**: Supabase (PostgreSQL)
- **Encryption Layer**: CyborgDB SDK + Cyborg Service

---

## Prerequisites

- Node.js `22.21.1`
- npm
- Supabase PostgreSQL project
- CyborgDB API key
- CyborgDB service installed and available in PATH

---

## Installation

1. clone the repo

```
git clone git@github.com:Anxhul10/SilentReport.git
cd SilentReport
```

2. install dependencies

```
npm install
```

3. setup cyborgdb-service ( important )

```
export CYBORGDB_DB_TYPE=postgres

export CYBORGDB_CONNECTION_STRING="host=db.<your-project>.supabase.co port=5432 dbname=postgres user=postgres password=<YOUR_PASSWORD> sslmode=require"

export CYBORGDB_API_KEY="your api key"
cyborgdb-service
```
4. Run this to create index( It will log `indexKeyBase64` which is needed in .env )

```
npm run g-index
```

6. set the env
```env
baseURL=http://localhost:8000
CYBORGDB_API_KEY=API_KEY
// On the first run, CyborgDB generates an `indexKeyBase64`
indexKeyBase64=YOUR_KEY_HERE
supabaseUrl=YOUR_SUPABASE_URL
supabaseKey=YOUR_SUPABASE_KEY
```
  
5. Start the Cyborg API server

```
npm run c-server
```

> [!NOTE]
> If you see any errors related to imports types please use node `22.21.1` node version or more.

6. run the application

```
npm run start
```

> [!NOTE]
> Ensure the steps 3, 4, 5 are running to run the whole application

---

## 🔍 How SilentReport Works

1. Users submit sensitive healthcare data
2. Data is encrypted via CyborgDB
3. Encrypted, semantically meaningless data is stored in Supabase PostgreSQL
4. Only authorized queries using `indexKeyBase64` can retrieve meaningful results

Even database administrators cannot read the stored data.

---

## Security Highlights

- No plaintext sensitive data
- Human-incomprehensible encrypted storage
- Index-based secure querying
- Designed for whistleblower safety

---

## Notes

- Never expose API keys or index keys
- Restart services after changing environment variables
- Keep `.env.local` private

---

## License

MIT License (or specify otherwise)

---

**SilentReport – Silence protected by cryptography.**
