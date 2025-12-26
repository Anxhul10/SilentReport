#  fastapi dev main.py
# pip install "fastapi[standard]"
from typing import Union
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
origins = [
    # allow from the 
    "http://localhost:3000",
]

app = FastAPI()


if __name__ == "__main__":

    from pathlib import Path
    import os

    current_dir = Path(__file__).parent.resolve()
    app_file = current_dir / "main.py"

    os.system(f"fastapi run {app_file} --port 8080")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
