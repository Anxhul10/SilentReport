import { PythonShell } from "python-shell";

PythonShell.run("./core/cyborgdb/langchain.py").then((messages) => {
  console.log(messages);
  console.log("finished");
});
