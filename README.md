## Installation
👉 Watch here:  
https://github.com/user-attachments/assets/31a28a69-9774-4c3c-a59a-b0d6bbb1d4c2

## 🎥 Demo Video

This short demo shows:

- User login and initial empty dashboard state
- No existing public or private reports at first launch
- Creating both **public** and **private** encrypted reports
- Dashboard counters updating in real time
- Searching reports and observing visibility-based filtering
- Viewing public and private reports in the viewer
- Editing a private report and changing its visibility to public
- Verifying that newly public reports become searchable
- Demonstrating that Supabase stores only encrypted (non-plaintext) data
- User logout flow

👉 Watch here:( **Fetch through cyborgdb takes time so that part is skipped**)
https://github.com/user-attachments/assets/854ac275-f2ac-4210-9cb6-0f97a25d88f5



## supabase snapshot:

<img width="1916" height="937" alt="Screenshot from 2025-12-29 00-39-50" src="https://github.com/user-attachments/assets/e6ab7741-9213-4596-a4e3-908d94d0bc92" />
<img width="1916" height="937" alt="Screenshot from 2025-12-29 00-40-29" src="https://github.com/user-attachments/assets/a0bc2f3f-fad4-411d-9ffd-41e1a781dd73" />

# SilentReport

**Encrypted Whistleblower System for Healthcare**

SilentReport enables secure, zero-trust whistleblowing where sensitive reports remain encrypted end-to-end — even database administrators cannot read the data.

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

3. Create a Supabase project
   Create a Supabase project and get the project name and database password.
   Go to Connect → Connection string
   Copy the Postgres connection parameters

4. setup cyborgdb-service ( important )

```
export CYBORGDB_DB_TYPE=postgres

export CYBORGDB_CONNECTION_STRING="host=db.<your-project>.supabase.co port=5432 dbname=postgres user=postgres password=<YOUR_PASSWORD> sslmode=require"

export CYBORGDB_API_KEY="your api key"

```

5. `cyborgdb-service`

6. set the env

```env
baseURL=http://localhost:8000
CYBORGDB_API_KEY=API_KEY
// On the first run, CyborgDB generates an `indexKeyBase64`
supabaseUrl=YOUR_SUPABASE_URL
supabaseKey=YOUR_SUPABASE_KEY
```
7. Run this to create index( It will log `indexKeyBase64` which is needed in .env )

```
npm run g-index
```
**set env**
```
indexKeyBase64=YOUR_KEY_HERE
```

8. Install and run the local LLM (Ollama)

SilentReport uses **Ollama with `qwen2.5:1.5b`** locally for:

- summarizing reports
- improving grammar
- generating readable responses

Install Ollama from:
https://ollama.com/download

After installation, pull and run the model:

```bash
ollama run qwen2.5:1.5b
```

9. build the application

```
npm run build
```

10. start the app in production
```
npm run start
```

> [!NOTE]
> Ensure the steps 3, 4, 5 are running to run the whole application

---

## Benefits of SilentReport

- A practical reference project for developers using **JS/TS SDKs with CyborgDB**
- Demonstrates how to integrate CyborgDB with **Supabase PostgreSQL**
- Developers can visually inspect encrypted (ciphertext) data directly in Supabase
- Protects whistleblower identity using strong cryptographic guarantees
- Even in the event of a database breach, stored data remains unusable

## Architecture Overview

The system follows an encrypted data lifecycle where plaintext never reaches persistent storage.

```
User Query
   ↓
Encrypted Vector Search
   ↓
Relevant Documents
   ↓
Ollama LLM
   ↓
Answer / Summary
```

```
                    ┌────────────────────────┐
                    │     Your Application   │
                    │                        │
                    │  ┌─────────────────┐ │
                    │  │  CyborgDB SDK   │ │
                    │  │ (Py / JS / TS / │ │
                    │  │        Go)      │ │
                    │  └─────────┬───────┘ │
                    └────────────┼─────────┘
                                 │
                                 ▼
                        ┌────────────────┐
                        │    REST API    │
                        └─────────┬──────┘
                                  │
                                  ▼
                        ┌──────────────────┐
                        │  CyborgDB Service│
                        └─────────┬────────┘
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
   ┌────────────┐         ┌────────────┐         ┌────────────┐
   │ PostgreSQL │         │   Redis    │         │   Memory   │
   └────────────┘         └────────────┘         └────────────┘
          ▲
          │
     ┌───────────┐
     │ Supabase  │
     └───────────┘
```

```
Encrypted Storage → Secure Fetch → Decode → Context Builder → Local LLM
```

### Benchmark

Load testing shows that CyborgDB-backed operations exhibit higher latency under sustained load.
This behavior is expected on the Free tier, where requests are queued and processed sequentially.

Measured latencies ranged from ~40 seconds for early requests up to ~10 minutes under sustained load. Despite increased latency, the system remained stable and processed requests without crashes, demonstrating correct backpressure behavior.

## Benchmark Results

We evaluated system performance using Artillery under three scenarios to understand
latency behavior when interacting with CyborgDB-backed APIs.

| Test Type       | Users       | Avg Latency | p95 Latency | Result           |
| --------------- | ----------- | ----------- | ----------- | ---------------- |
| Single request  | 1           | ~45s        | ~60s        | Success          |
| Low concurrency | 1 every 30s | ~90–200s    | ~250s       | Stable           |
| Saturation      | ≥1/sec      | 5–10 min    | ~9–10 min   | Queue saturation |

### Notes

- Latency increases due to CyborgDB’s queued execution model.
- Requests are processed sequentially on the Free tier.
- Under sustained load, requests wait in queue rather than failing immediately.
- This demonstrates controlled backpressure rather than instability.

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

## Why SilentReport Matters

Healthcare whistleblowers face serious risks if their identity or reports are exposed.
SilentReport demonstrates how modern cryptography and encrypted vector search can:

- Protect sensitive disclosures
- Prevent insider data access
- Enable safe querying without revealing plaintext
- Serve as a reference architecture for privacy-first systems

---
