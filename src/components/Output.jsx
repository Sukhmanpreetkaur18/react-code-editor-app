<<<<<<< Updated upstream
import { Box, Button, Text } from "@chakra-ui/react";
import { runJavaScript, runPython } from "../api";
import { useState, useImperativeHandle, forwardRef } from "react";
=======
import {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import { Box, Text } from "@chakra-ui/react";
import { runJavaScript, runPython, runHtml, runCss } from "../api";
>>>>>>> Stashed changes

const Output = forwardRef(({ editorRef, language }, ref) => {
  const [isLoading, setIsLoading] = useState(false);

  // 🔥 TERMINAL STATES
  const [terminal, setTerminal] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [waitingForInput, setWaitingForInput] = useState(false);
<<<<<<< Updated upstream
  const [inputs, setInputs] = useState([]);

  // 🚀 RUN CODE
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
=======
  const [isRunning, setIsRunning] = useState(false);
  const [expectedInputs, setExpectedInputs] = useState(0);
  const [iframeHtml, setIframeHtml] = useState("");

  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const iframeRef = useRef(null);
>>>>>>> Stashed changes

    setTerminal([]);
    setInputs([]);
    setCurrentInput("");

<<<<<<< Updated upstream
    // 🔍 detect if input needed
    if (sourceCode.includes("prompt") || sourceCode.includes("input")) {
      setWaitingForInput(true);
      setTerminal(["> Program started..."]);
      return;
    }

    executeCode(sourceCode, []);
  };

  useImperativeHandle(ref, () => ({
    runCode,
=======
  // focus input
  useEffect(() => {
    if (waitingForInput) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [waitingForInput]);

  // Update iframe content when iframeHtml changes
  useEffect(() => {
    if (iframeRef.current && iframeHtml) {
      iframeRef.current.srcdoc = iframeHtml;
    }
  }, [iframeHtml]);

  const appendLine = (line) => {
    setTerminal((prev) => [...prev, line]);
  };

  // ✅ FIXED REGEX (IMPORTANT)
  const extractPrompts = (code) => {
    const regex =
      language === "javascript"
        ? /prompt\(["'`](.*?)["'`]\)/g
        : /input\((.*?)\)/g;

    let matches = [];
    let match;

    while ((match = regex.exec(code)) !== null) {
      const text = match[1]?.replace(/["'`]/g, "").trim();
      matches.push(text || "Input:");
    }

    return matches;
  };

  const executeCode = async (userInputs) => {
    const code = editorRef.current.getValue();
    const start = performance.now();

    try {
      let result;

      if (language === "javascript") {
        result = runJavaScript(code, userInputs);
      } else if (language === "python") {
        result = await runPython(code, userInputs);
      } else if (language === "html") {
        result = runHtml(code);
      } else if (language === "css") {
        result = runCss(code);
      }

      const end = performance.now();

      // For HTML and CSS, render in iframe
      if (language === "html" || language === "css") {
        setIframeHtml(result);
      } else {
        // For JavaScript and Python, show terminal output
        appendLine("");
        appendLine(result || "> (no output)");

        // ✅ FIXED INPUT COUNT
        appendLine(
          `⚡ Time: ${(end - start).toFixed(2)} ms | Inputs: ${userInputs.length}`
        );
      }
    } catch (err) {
      appendLine("❌ Error: " + err.message);
    }

    setIsRunning(false);
  };

  useImperativeHandle(ref, () => ({
    runCode: async () => {
      if (isRunning) return;

      setTerminal([]);
      setInputs([]);
      setCurrentInput("");
      setIframeHtml("");

      // For HTML and CSS, don't wait for input
      if (language === "html" || language === "css") {
        setIsRunning(true);
        await executeCode([]);
        return;
      }

      const code = editorRef.current.getValue();
      const prompts = extractPrompts(code);

      setExpectedInputs(prompts.length);

      if (prompts.length > 0) {
        setWaitingForInput(true);
        appendLine("> Provide input:");
        return;
      }

      setIsRunning(true);
      await executeCode([]);
    },

    // explain feature
    appendExternalOutput: (text) => {
      setTerminal((prev) => {
        // remove old explanation
        const filtered = prev.filter(
          (line) => !line.includes("🧠 Code Explanation")
        );

        return [...filtered, "", text];
      });
    },
>>>>>>> Stashed changes
  }));

  // ⚙️ EXECUTE CODE
  const executeCode = async (code, inputsArr) => {
    try {
      setIsLoading(true);

      let result;

      if (language === "javascript") {
        result = runJavaScript(code, inputsArr.join("\n"));
      } else if (language === "python") {
        result = await runPython(code, inputsArr.join("\n"));
      }

      // 🔥 API already formats prompts → just print
      setTerminal((prev) => [...prev, ...result.split("\n")]);
    } catch (error) {
      setTerminal((prev) => [...prev, "❌ " + error.message]);
    } finally {
      setIsLoading(false);
      setWaitingForInput(false);
    }
  };

<<<<<<< Updated upstream
  // ⌨️ HANDLE INPUT
  const handleTerminalInput = (e) => {
    if (e.key === "Enter") {
      const value = currentInput;
      const code = editorRef.current.getValue();

      const expectedInputs =
        (code.match(/prompt/g) || []).length +
        (code.match(/input/g) || []).length;

      const updatedInputs = [...inputs, value];

      setCurrentInput("");
      setInputs(updatedInputs);

      if (updatedInputs.length < expectedInputs) return;

      executeCode(code, updatedInputs);
    }
  };

  // 💾 DOWNLOAD CODE
  const downloadCode = () => {
    const code = editorRef.current.getValue();

    if (!code) return;

    let extension = "txt";
    if (language === "javascript") extension = "js";
    else if (language === "python") extension = "py";

    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${extension}`;
    a.click();

    URL.revokeObjectURL(url);
  };

=======
  // Render iframe for HTML/CSS, terminal for JavaScript/Python
  if (language === "html" || language === "css") {
    return (
      <Box flex="1" display="flex" flexDirection="column" p={3}>
        <Box display="flex" justifyContent="space-between">
          <Text color="#00ffcc">📱 Preview</Text>
          <Text
            color="red"
            cursor="pointer"
            onClick={() => setIframeHtml("")}
          >
            Clear
          </Text>
        </Box>

        <Box
          flex="1"
          bg="white"
          border="1px solid #00ffcc"
          borderRadius="md"
          overflow="hidden"
          mt={2}
        >
          <iframe
            ref={iframeRef}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              background: "white",
            }}
            title="html-preview"
            sandbox="allow-scripts"
          />
        </Box>
      </Box>
    );
  }

  // Terminal for JavaScript and Python
  return (
    <Box flex="1" display="flex" flexDirection="column" p={3}>
      <Box display="flex" justifyContent="space-between">
        <Text color="#00ffcc">🖥 Terminal</Text>
        <Text color="red" cursor="pointer" onClick={() => setTerminal([])}>
          Clear
        </Text>
      </Box>

      <Box
        ref={terminalRef}
        flex="1"
        bg="black"
        color="#00ffcc"
        p={2}
        fontFamily="monospace"
        overflowY="auto"
      >
        {terminal.map((line, i) => (
          <Text key={i} whiteSpace="pre-line">
            {line}
          </Text>
        ))}

        {waitingForInput && (
          <Box display="flex">
            <Text>{"> "}</Text>
            <input
              ref={inputRef}
              autoFocus
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleInputSubmit();
              }}
              style={{
                background: "black",
                color: "#00ffcc",
                border: "none",
                outline: "none",
                flex: 1,
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
});

export default Output;
      setInputs([]);
      return;
    }

    // ✅ CASE 3: loop case (n + values)
    if (!isNaN(n) && newInputs.length === n + 1) {
      setWaitingForInput(false);
      setIsRunning(true);
      await executeCode(newInputs);
      setInputs([]);
      return;
    }
  };

>>>>>>> Stashed changes
  return (
    <Box flex="1" display="flex" flexDirection="column" p={2} gap={2}>
      {/* TITLE */}
      <Text fontSize="lg">Output</Text>

      {/* BUTTONS */}
      <Box display="flex" gap={2}>
        <Button
          variant="outline"
          colorScheme="red"
          onClick={() => {
            setTerminal([]);
            setCurrentInput("");
            setInputs([]);
          }}
        >
          Clear
        </Button>

        <Button variant="outline" colorScheme="blue" onClick={downloadCode}>
          Download
        </Button>
      </Box>

      {/* TERMINAL */}
      <Box
        flex="1"
        minH="300px"
        p={3}
        bg="black"
        color="green.400"
        fontFamily="monospace"
        fontSize="14px"
        border="1px solid #00ffcc"
        borderRadius="6px"
        boxShadow="0 0 10px #00ffcc"
        overflowY="auto"
      >
        {/* EMPTY */}
        {terminal.length === 0 && "> Click Run to start"}

        {/* OUTPUT */}
        {terminal.map((line, i) => (
          <div key={i}>{line}</div>
        ))}

        {/* INPUT */}
        {waitingForInput && (
          <input
            style={{
              background: "black",
              color: "#00ffcc",
              border: "none",
              outline: "none",
              width: "100%",
              fontFamily: "monospace",
            }}
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleTerminalInput}
            autoFocus
          />
        )}

        {/* LOADING */}
        {isLoading && <div>⏳ Running...</div>}
      </Box>
    </Box>
  );
});

export default Output;