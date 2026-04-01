// ==========================================
// 🔥 JavaScript Execution (Offline + Input)
// ==========================================
export const runJavaScript = (code, inputs = []) => {
  let output = [];
  let inputIndex = 0;

  try {
    const originalLog = console.log;

    // capture console.log
    console.log = (...args) => {
      output.push(args.join(" "));
    };

    // fake prompt
    const prompt = (msg = "") => {
      const value = inputs[inputIndex++] || "";
      return value;
    };

    // execute user code safely
    new Function("console", "prompt", code)(
      { log: console.log },
      prompt
    );

    console.log = originalLog;

    return output.join("\n") || "> (no output)";
  } catch (error) {
    return "❌ Error: " + error.message;
  }
};


// ==========================================
// 🐍 Python Execution (Pyodide + Input)
// ==========================================

let pyodide = null;

// load Pyodide only once
export const loadPyodideInstance = async () => {
  if (pyodide) return pyodide;

  if (!window.loadPyodide) {
    throw new Error("Pyodide not loaded. Check index.html");
  }

  pyodide = await window.loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
  });

  return pyodide;
};

export const runPython = async (code, inputs = []) => {
  try {
    const py = await loadPyodideInstance();

    // convert array → safe string
    const safeInput = inputs
      .map((i) => i.replace(/\\/g, "\\\\").replace(/"/g, '\\"'))
      .join("\\n");

    // reset Python environment each run
    py.runPython(`
import sys
from io import StringIO

sys.stdout = StringIO()

input_data = """${safeInput}""".split("\\n")
input_index = 0

def input(prompt=""):
    global input_index
    if input_index < len(input_data):
        value = input_data[input_index]
        input_index += 1
        return value
    return ""
`);

    // execute user code
    py.runPython(code);

    const output = py.runPython("sys.stdout.getvalue()");

    return output.trim() || "> (no output)";
  } catch (error) {
    return "❌ Error: " + error.message;
  }
};