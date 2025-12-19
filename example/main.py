import psycopg2

# 1. Connection string (USE YOUR REAL PASSWORD)
DATABASE_URL = "postgresql://postgres:caimyhzrrug@db.ucfskdcaimyhzrrugkpc.supabase.co:5432/postgres"

# 2. Connect to Supabase Postgres
conn = psycopg2.connect(DATABASE_URL)
cur = conn.cursor()

# 3. Create a test table
cur.execute("""
CREATE TABLE IF NOT EXISTS test_messages (
    id SERIAL PRIMARY KEY,
    message TEXT
);
""")

# 4. Insert data
cur.execute(
    "INSERT INTO test_messages (message) VALUES (%s);",
    ("Hello from Python to Supabase!",)
)

# 5. Commit + close
conn.commit()
cur.close()
conn.close()

print("✅ Data successfully inserted into Supabase")
