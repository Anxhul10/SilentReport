# Configuration

Create a .env file in the root of the project with the following variables, replacing the placeholder values with your actual credentials:

    CYBORGDB_DB_TYPE=postgres
    CYBORGDB_CONNECTION_STRING="host=<YOUR_DB_HOST> port=5432 dbname=<YOUR_DB_NAME> user=<YOUR_DB_USER> password=<YOUR_DB_PASSWORD> sslmode=require"
    CYBORGDB_API_KEY=<YOUR_CYBORGDB_API_KEY>

**Note:** Ensure your .env file is added to .gitignore to avoid exposing credentials.
