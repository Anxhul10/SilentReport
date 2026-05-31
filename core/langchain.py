from langchain_community.llms import Ollama

# Initialize Ollama with your chosen model
llm = Ollama(model="llama3.2")

# Invoke the model with a query
response = llm.invoke("What is LLM?")
print(response)