import os
from dotenv import load_dotenv
from cyborgdb import Client

# load_dotenv()
# baseURL = os.getenv('baseURL')
CYBORGDB_API_KEY = os.getenv('CYBORGDB_API_KEY')
# indexKeyBase64 = os.getenv('indexKeyBase64')
# client = Client(baseURL, CYBORGDB_API_KEY)

from cyborgdb_core.integrations.langchain import CyborgVectorStore
from cyborgdb_core import DBConfig

store = CyborgVectorStore.from_texts(
    texts=["hello world", "goodbye world"],
    embedding="all-MiniLM-L6-v2",  # sentence-transformer name
    index_key=CyborgVectorStore.generate_key(),
    api_key='cyborg_8c7f13429e2044d8853d8ce9f0a314e4',
    index_location=DBConfig("memory"),
    config_location=DBConfig("memory"),
    index_type="ivfflat",
    metric="cosine"
)

docs = store.similarity_search("hello")
print(docs)
