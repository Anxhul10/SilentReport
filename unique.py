from langchain_ollama import ChatOllama
import base64
from dotenv import load_dotenv
import os
from cyborgdb import Client

load_dotenv()

indexKeyBase64 = os.getenv('indexKeyBase64')
api_key = os.getenv('CYBORGDB_API_KEY')
base_url = os.getenv('baseURL')

llm = ChatOllama(
    model="gemma3:270m",
    temperature=0,
)
client = Client(base_url=base_url, api_key=api_key)
index_key = base64.b64decode(indexKeyBase64)
index = client.load_index("reports", index_key)

print(index)
# index = client.load_index("reports", index_key)
# print(index)
# ai_msg = llm.invoke(messages)
# print(ai_msg.content)
