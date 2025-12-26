from langchain_ollama import ChatOllama
import base64
from dotenv import load_dotenv
import os
from cyborgdb import Client

load_dotenv()
connection_string = os.getenv('CONNECTION_STRING')
indexKeyBase64 = os.getenv('indexKeyBase64')
api_key = os.getenv('CYBORGDB_API_KEY')
base_url = os.getenv('baseURL')

llm = ChatOllama(
    model="gemma3:270m",
    temperature=0,
)
client = Client(base_url=base_url, api_key=api_key)
index_key = base64.b64decode(indexKeyBase64)
# index = client.load_index("reports", index_key)

from cyborgdb_core.integrations.langchain import CyborgVectorStore
from cyborgdb_core import DBConfig

store = CyborgVectorStore(
        index_name="reports",
        index_key=index_key,
        api_key=api_key,
        base_url=base_url,
        embedding="sentence-transformers/all-MiniLM-L6-v2",
        index_type="ivfflat",
        metric="cosine",
    )
# store = CyborgVectorStore(
#     index_name="reports",
#     index_key=index_key,
#     api_key=api_key,
#     embedding="sentence-transformers/all-MiniLM-L6-v2",
#     index_location=DBConfig("postgres", 'index', connection_string),
#     config_location=DBConfig("postgres", 'config', connection_string),
#     index_type="ivfflat",
#     metric="cosine"
# )
docs = store.similarity_search("hello")
print(docs)
# index = client.load_index("reports", index_key)
# print(index)
# ai_msg = llm.invoke(messages)
# print(ai_msg.content)
