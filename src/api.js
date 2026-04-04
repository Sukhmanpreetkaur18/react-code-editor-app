// ==========================================
// 🔥 JavaScript Execution (Offline + Input)
// ==========================================
export const runJavaScript = (code, input = "") => {
  let output = [];

  try {
    let inputs = input.split("\n");
    let inputIndex = 0;

    const originalLog = console.log;

    // 🔥 capture console.log
    console.log = (...args) => {
      output.push(args.join(" "));
    };

    // 🔥 fake prompt
    const prompt = (msg = "") => {
      const value = inputs[inputIndex++] || "";

      if (msg) output.push(`> ${msg}`);
      output.push(`> ${value}`);

      return value;
    };

    // execute code
    new Function("prompt", code)(prompt);

    // restore console
    console.log = originalLog;

    return output.length
      ? output.join("\n")
      : "✅ Code executed successfully!";
  } catch (error) {
    return "❌ Error: " + error.message;
  }
};

// ==========================================
// 🐍 Python Execution (Pyodide + Input)
// ==========================================

let pyodide = null;

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

export const runPython = async (code, input = "") => {
  try {
    const py = await loadPyodideInstance();

    // 🔥 escape input safely
    const safeInput = input.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

<<<<<<< Updated upstream
    py.runPython(`
import sys
from io import StringIO

input_data = """${safeInput}""".split("\\n")
input_index = 0

def input(prompt=""):
    global input_index
    if input_index < len(input_data):
        value = input_data[input_index]
        input_index += 1
        if prompt:
            print("> " + prompt)
        print("> " + value)
        return value
    return ""

sys.stdout = StringIO()
    `);

    py.runPython(code);

    let output = py.runPython("sys.stdout.getvalue()");

    return output || "✅ Code executed successfully!";
=======
export const runPython = async (code, input = []) => {
  try {
    const py = await loadPyodideInstance();

    const safeInput = input.join("\n");

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

    // ✅ THIS IS THE FIX
    try {
      py.runPython(code);
    } catch (err) {
      const cleanError = err.message.split("\n").slice(-1)[0];
      return "❌ Error: " + cleanError;
    }

    let output = py.runPython("sys.stdout.getvalue()");
    return output.trim();

  } catch (error) {
    return "❌ Error: " + error.message;
  }
};

// ==========================================
// 🌐 HTML Execution (Render in iframe)
// ==========================================
export const runHtml = (code) => {
  try {
    return code; // Return HTML code as-is
  } catch (error) {
    return "❌ Error: " + error.message;
  }
};

// ==========================================
// 🎨 CSS Execution (Return with HTML wrapper)
// ==========================================
export const runCss = (code) => {
  try {
    const htmlWithCss = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Preview</title>
  <style>
${code}
  </style>
</head>
<body>
  <div class="container">
    <h1>CSS Styles Applied</h1>
    <p>Your CSS styles are now visible. Edit the CSS to see changes in real-time.</p>
  </div>
</body>
</html>`;
    return htmlWithCss;
>>>>>>> Stashed changes
  } catch (error) {
    return "❌ Error: " + error.message;
  }
};