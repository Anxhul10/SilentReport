# SilentReport 🛡️  
**Encrypted Whistleblower System for Healthcare**

SilentReport is a secure whistleblower platform designed to protect highly sensitive healthcare disclosures.  
It ensures that sensitive data is cryptographically unreadable—even to database administrators—by using **CyborgDB** on top of **Supabase PostgreSQL**.

---

## 🧩 Tech Stack

- **Node.js**: `v22.21.1`
- **Package Manager**: `npm`
- **Framework**: Next.js
- **Database**: Supabase (PostgreSQL)
- **Encryption Layer**: CyborgDB SDK + Cyborg Service

---

## ⚙️ Prerequisites

- Node.js `22.21.1`
- npm
- Supabase PostgreSQL project
- CyborgDB API key
- CyborgDB service installed and available in PATH

---

## 📦 Installation

```bash
git clone <repository-url>
cd silent-report
npm install
```

---

## 🔐 Environment Variables

> ⚠️ Do **not** commit real credentials

Create a `.env.local` file:

```env
CYBORGDB_DB_TYPE=postgres
CYBORGDB_CONNECTION_STRING="host=<YOUR_HOST> port=5432 dbname=postgres user=postgres password=<YOUR_PASSWORD> sslmode=require"
CYBORGDB_API_KEY=<YOUR_CYBORGDB_API_KEY>

# Required after first run
indexKeyBase64=<GENERATED_BASE64_KEY>
```

---

## 🧠 First-Time Run (Important)

On the first run, CyborgDB generates an `indexKeyBase64`.

Steps:
1. Run all services
2. Copy the printed `indexKeyBase64` from logs
3. Add it to `.env.local`
4. Restart all services

Without this key, queries and basic operations will fail.

---

## ▶️ Running the Application

This project requires **three services** running in parallel.

### 1️⃣ Start the Next.js App

```bash
npm run dev
```

---

### 2️⃣ Start CyborgDB SDK Server

```bash
npm run server-c
```

> CyborgDB SDK must run separately.  
> Running it inside Next.js causes ECMAScript module errors.

---

### 3️⃣ Start CyborgDB Service

Export environment variables:

```bash
export CYBORGDB_DB_TYPE=postgres
export CYBORGDB_CONNECTION_STRING="host=<YOUR_HOST> port=5432 dbname=postgres user=postgres password=<YOUR_PASSWORD> sslmode=require"
export CYBORGDB_API_KEY=<YOUR_CYBORGDB_API_KEY>
```

Run the service:

```bash
cyborg-service
```

---

## 🧹 Linting (Mandatory)

Before pushing changes:

```bash
npm run lint
```

All lint errors must be fixed before pushing.

---

## 🔍 How SilentReport Works

1. Users submit sensitive healthcare data
2. Data is encrypted via CyborgDB
3. Encrypted, semantically meaningless data is stored in Supabase PostgreSQL
4. Only authorized queries using `indexKeyBase64` can retrieve meaningful results

Even database administrators cannot read the stored data.

---

## 🛡️ Security Highlights

- No plaintext sensitive data
- Human-incomprehensible encrypted storage
- Index-based secure querying
- Designed for whistleblower safety

---

## 📝 Notes

- Never expose API keys or index keys
- Restart services after changing environment variables
- Keep `.env.local` private

---

## 📄 License

MIT License (or specify otherwise)

---

**SilentReport – Silence protected by cryptography.**
