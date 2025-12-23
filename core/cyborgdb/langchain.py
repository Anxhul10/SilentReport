import os
from dotenv import load_dotenv

load_dotenv()

indexKeyBase64 = os.getenv('indexKeyBase64')

print('indexKeyBase64'+indexKeyBase64)